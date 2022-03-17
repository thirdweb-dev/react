import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Convienience hook for connecting to a wallet via WalletConnect
 * @returns a function that will prompt the user to connect their wallet via WalletConnect
 * @public
 */
export function useWalletConnect() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () =>
      Promise.reject("WalletConnect connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find(
    (c) => c.id === "walletConnect",
  );
  invariant(
    connector,
    "WalletConnect connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}
