import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a Metamask wallet.
 *
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithMetamask = useMetamask()
 *
 *   return (
 *     <button onClick={connectWithMetamask}>
 *       Connect Metamask
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */
export function useMetamask() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Metamask connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find((c) => c.id === "injected");
  invariant(
    connector,
    "Metamask connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}
