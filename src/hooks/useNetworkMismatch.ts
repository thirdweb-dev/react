import { useDesiredChainId } from "../Provider";
import { useChainId } from "./useChainId";

/**
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 * @returns `false` if the chainId of the wallet is the same as the desired chainId passed into <ThirdwebProvider />
 * @public
 */
export function useNetworkMismatch() {
  const desiredChainId = useDesiredChainId();
  const activeChainId = useChainId();

  if (desiredChainId === -1) {
    // means no desiredChainId is set in the <ThirdwebProvider />, so we don't care about the network mismatch
    return false;
  }
  if (!activeChainId) {
    // means no wallet is connected yet, so we don't care about the network mismatch
    return false;
  }
  // check if the chainIds are different
  return desiredChainId !== activeChainId;
}
