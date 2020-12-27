export interface IStreamRecorderListeners {
    ondataavailable?: EventListener;
    onstart?: EventListener;
    onresume?: EventListener;
    onpause?: EventListener;
    onerror?: EventListener;
    onstop?: EventListener;
}