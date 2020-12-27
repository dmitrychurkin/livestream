export default abstract class AbstractRecorderFactory<T, K, V> {
    public abstract createRecorder(stream: T, options?: K): V;
}