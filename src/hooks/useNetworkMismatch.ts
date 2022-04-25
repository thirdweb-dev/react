import { useDesiredChainId } from "../Provider";
import { useChainId } from "./useChainId";

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
 * @public
 */
export function useNetworkMismatch() {
  const desiredChainId = useDesiredChainId();
  const activeChainId = useChainId();

  if (desiredChainId === -1) {
    console.warn(
      "useNetworkMismatch: desiredChainId is -1, this is not a valid chainId, please provide a valid chainId to the <ThirdwebProvider />",
    );
    return false;
  }
  if (!activeChainId) {
    console.debug(
      "useNetworkMismatch: activeChainId is undefined, this means there is no wallet connected yet",
    );
    return false;
  }
  // check if the chainIds are different
  return desiredChainId !== activeChainId;
}
