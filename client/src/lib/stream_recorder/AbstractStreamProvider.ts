export default abstract class AbstractStreamProvider<T, K> {
    public abstract getStream(mediaStreamConstraints: K): T;
}
