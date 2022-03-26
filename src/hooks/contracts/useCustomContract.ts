import { useSDK } from "../../Provider";
import { ChainId } from "@thirdweb-dev/sdk";
import useSWRImmutable from "swr/immutable";

/**
 * @internal
 * @param contractAddress - the contract address
 * @param abi - the contract abi
 * @returns the instance of the module for the given type and address
 */
export function useUnstableCustomContract(
  contractAddress?: string,
  chainId?: ChainId,
  abi: any = undefined,
) {
  const sdk = useSDK();
  return useSWRImmutable(
    `contract.${chainId}.${contractAddress}`,
    () =>
      sdk && "unstable_getCustomContract" in sdk && contractAddress
        ? sdk.unstable_getCustomContract(contractAddress, abi)
        : undefined,
    { isPaused: () => !sdk || !contractAddress },
  );
}
