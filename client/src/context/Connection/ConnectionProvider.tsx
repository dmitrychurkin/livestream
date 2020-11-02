import React, { createContext, FC, memo, ReactNode } from "react";
import Connector from "lib/connector";
import Socket from "lib/socket";
import Peer from "lib/peer";

export const ConnectionContext = createContext<Connector | null>(null);

type Props = {
  readonly children: ReactNode;
};

const ConnectionProvider: FC<Props> = ({ children }) => {
  const connection = new Connector(
    new Socket(),
    new Peer()
  );

  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};

export default memo(ConnectionProvider, () => true);
