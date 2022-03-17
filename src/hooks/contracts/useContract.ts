import { useSDK } from "../../Provider";
import { ContractForContractType, ContractType } from "@thirdweb-dev/sdk";

/**
 * @internal
 * @param contractType - the module type
 * @param contractAddress - the module address
 * @returns the instance of the module for the given type and address
 */
export function useContract<TContractType extends ContractType>(
  contractType: TContractType,
  contractAddress?: string,
): ContractForContractType<TContractType> | undefined {
  const sdk = useSDK();
  if (!sdk || !contractAddress) {
    return undefined;
  }
  return sdk.getContract(contractAddress, contractType);
}
