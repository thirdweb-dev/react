import { useDesiredChainId } from "../Provider";
import { useChainId } from "./useChainId";

/**
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 * @returns `false` if the chainId of the wallet is the same as the desired chainId passed into <ThirdwebProvider />
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
