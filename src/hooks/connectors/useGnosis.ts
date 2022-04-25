import { useConnect } from "../useConnect";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a gnosis safe
 *
 * ```javascript
 * import { useGnosis } from "@thirdweb-dev/react"
 * ```
 *
 *
 * ## Usage
 * ```javascript
 * import { useGnosis } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithGnosis = useGnosis()
 *
 *   return (
 *     <button onClick={connectWithGnosis}>
 *       Connect Gnosis Safe
 *     </button>
 *   )
 * }
 * ```
 *
 * ## Types
 * @public
 */
export function useGnosis() {
  const [connectors, connect] = useConnect();
  if (connectors.loading) {
    return () => Promise.reject("Gnosis connector not ready to be used, yet");
  }
  const connector = connectors.data.connectors.find((c) => c.id === "gnosis");
  invariant(
    connector,
    "Gnosis connector not found, please make sure it is provided to your <ThirdwebProvider />",
  );

  return () => connect(connector);
}
