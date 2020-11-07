import React, { createContext, FC, memo, ReactNode } from "react";

import StreamRecorder from "lib/stream_recorder";

const streamRecorder = new StreamRecorder();
export const RecorderContext = createContext<StreamRecorder>(streamRecorder);

type Props = {
    readonly children: ReactNode;
};

const RecorderProvider: FC<Props> = ({ children }) => (
    <RecorderContext.Provider value={streamRecorder}>
        {children}
    </RecorderContext.Provider>
);

export default memo(RecorderProvider, () => true);