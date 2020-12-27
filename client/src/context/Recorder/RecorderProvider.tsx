import React, { createContext, FC, memo, ReactNode } from "react";

import StreamRecorder, { StreamProvider, MediaRecorderFactory, IStreamRecorder } from "lib/stream_recorder";

const streamRecorder = new StreamRecorder(
    new StreamProvider(),
    new MediaRecorderFactory()
);

export const RecorderContext = createContext<IStreamRecorder>(streamRecorder);

type Props = {
    readonly children: ReactNode;
};

const RecorderProvider: FC<Props> = ({ children }) => (
    <RecorderContext.Provider value={streamRecorder}>
        {children}
    </RecorderContext.Provider>
);

export default memo(RecorderProvider, () => true);