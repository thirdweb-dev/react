import { useDesiredChainId, useSDK } from "../../Provider";
import useSWRImmutable from "swr/immutable";

/**
 * @internal
 * @param contractAddress - the contract address
 * @param abi - the contract abi
 * @returns the instance of the module for the given type and address
 */
export function useUnstableCustomContract(contractAddress?: string, abi?: any) {
  const sdk = useSDK();
  const desiredChainId = useDesiredChainId();
  return useSWRImmutable(
    `contract.${desiredChainId}.${contractAddress}`,
    () =>
      sdk && "unstable_getCustomContract" in sdk && contractAddress
        ? sdk.unstable_getCustomContract(contractAddress, abi)
        : undefined,
    { isPaused: () => !sdk || !contractAddress },
  );
}
