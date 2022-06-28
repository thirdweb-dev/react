import {
  ConnectionInfo,
  MagicConnector,
  MagicConnectorOptions,
} from "./connector";
import { useCallback } from "react";
import { useConnect } from "wagmi";

export function useMagicLink({ options }: { options: MagicConnectorOptions }) {
  const {
    connect: _connect,
    error,
    isSuccess: isConnected,
    isLoading: isConnecting,
  } = useConnect();

  const connect = useCallback(
    async (connectionInfo: ConnectionInfo) => {
      const connectorInstance = new MagicConnector({ options });
      connectorInstance.setConnectionInfo(connectionInfo);

      return _connect({
        connector: connectorInstance,
      });
    },
    [_connect, options],
  );

  return { error, isConnected, isConnecting, connect };
}
