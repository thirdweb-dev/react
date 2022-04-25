import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a mobile wallet with Wallet Connect
 *
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithWalletConnect = useWalletConnect()
 *
 *   return (
 *     <button onClick={connectWithWalletConnect}>
 *       Connect WalletConnect
 *     </button>
 *   )
 * }
 * ```
 *
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
