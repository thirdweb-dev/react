import {
  GnosisConnectorArguments,
  GnosisSafeConnector,
} from "../../connectors/gnosis-safe";
import { useConnect } from "../useConnect";
import { Signer } from "ethers";
import invariant from "tiny-invariant";

/**
 * Hook for connecting to a Gnosis Safe. This enables multisig wallets to connect to your application and sing transactions.
 *
 * ```javascript
 * import { useGnosis } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
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

  return (personalSigner: Signer, config: GnosisConnectorArguments) => {
    (connector as GnosisSafeConnector).setConfiguration(personalSigner, config);
    return connect(connector);
  };
}
