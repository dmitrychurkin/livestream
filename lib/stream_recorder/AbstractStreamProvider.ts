export default abstract class AbstractStreamProvider<T, K> {
  public abstract disposeStream(stream: T): boolean;
  public abstract getStream(streamConstraints: K): Promise<T>;
}
