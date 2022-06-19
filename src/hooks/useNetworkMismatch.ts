import { useSDK } from "../providers/thirdweb-sdk";
import { useMemo } from "react";
import { useNetwork } from "wagmi";

/**
 * Hook for checking whether the connected wallet is on the correct network specified by the `desiredChainId` passed to the `<ThirdwebProvider />`.
 *
 * ```javascript
 * import { useNetworkMistmatch } from "@thirdweb-dev/react"
 * ```
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 *
 * @example
 * You can check if a users wallet is connected to the correct chain ID as follows:
 * ```javascript
 * import { useNetworkMismatch } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const isMismatched = useNetworkMismatch()
 *
 *   return <div>{isMismatched}</div>
 * }
 * ```
 *
 * From here, you can prompt users to switch their network using the `useNetwork` hook.
 *
 * @public
 */
export function useNetworkMismatch() {
  const sdkChainId = useSDK()?.getConnectionInfo().chainId;
  const networkQuery = useNetwork();

  console.log("*** networkQuery", networkQuery);

  return useMemo(() => {
    if (!sdkChainId) {
      // if there is no SDK or the sdk chainId is not set we don't care about the network mismatch
      return false;
    }
    if (!networkQuery.activeChain) {
      // means no wallet is connected yet or at least there is no activeChain yet, so we don't care about the network mismatch
      return false;
    }
    if (typeof sdkChainId !== "number") {
      // we cannot compare the chainIds if the sdk chainId is not a number
      return false;
    }
    // check if the chainIds are different
    return sdkChainId !== networkQuery.activeChain.id;
  }, [networkQuery, sdkChainId]);
}
