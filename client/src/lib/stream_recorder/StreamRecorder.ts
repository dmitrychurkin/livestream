import { IMediaRecorderCallbacks, IStreamRecorder } from "./IStreamRecorder";

export default class StreamRecorder implements IStreamRecorder {

    private mediaStream?: MediaStream;
    private mediaRecorder?: MediaRecorder;

    private get defaultMediaStreamConstraints() {
        return {
            audio: true,
            video: true
        };
    }

    getMediaStream(mediaStreamConstraints?: MediaStreamConstraints): Promise<MediaStream> {
        return this.revokeMediaStream(mediaStreamConstraints);
    }

    getRecordingState(): RecordingState | undefined {
        return this.mediaRecorder?.state;
    }

    pauseRecording(): void {
        return this.mediaRecorder?.pause();
    }

    async startRecording(mediaRecorderCallbacks?: IMediaRecorderCallbacks, mediaRecorderOptions?: MediaRecorderOptions): Promise<Blob> {
        let stream = this.mediaStream;
        if (!stream) {
            try {
                stream = await this.getMediaStream();
            } catch (err) {
                throw err;
            }
        }

        const mediaRecorder = this.revokeMediaRecorder(stream, mediaRecorderOptions);
        mediaRecorder.start();

        if (typeof mediaRecorderCallbacks === 'object') {
            const {
                onStart = null,
                onStop = null,
                onResume = null,
                onPause = null
            } = mediaRecorderCallbacks;
            mediaRecorder.onstart = onStart;
            mediaRecorder.onstop = onStop;
            mediaRecorder.onpause = onPause;
            mediaRecorder.onresume = onResume;
        }

        return new Promise((resolve, reject) => {
            mediaRecorder.ondataavailable = (e: BlobEvent) => resolve(e.data);
            mediaRecorder.onerror = reject;
        });
    }

    stopRecording(): void {
        return this.mediaRecorder?.stop();
    }

    // Sigleton methods
    private async revokeMediaStream(mediaStreamConstraints?: MediaStreamConstraints): Promise<MediaStream> {
        if (!this.mediaStream) {
            this.mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints ?? this.defaultMediaStreamConstraints);
        }
        return this.mediaStream;
    }

    private revokeMediaRecorder(mediaStream: MediaStream, mediaRecorderOptions?: MediaRecorderOptions): MediaRecorder {
        if (!this.mediaRecorder) {
            this.mediaRecorder = new MediaRecorder(mediaStream, mediaRecorderOptions);
        }
        return this.mediaRecorder;
    }
}
