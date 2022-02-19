import { ContractForContractType, ContractType } from "@thirdweb-dev/sdk";
import { useSDK } from "../../Provider";

/**
 * @internal
 * @param contractType - the module type
 * @param contractAddress - the module address
 * @returns the instance of the module for the given type and address
 */
export function useContract<TContractType extends ContractType>(
  contractType: TContractType,
  contractAddress?: string,
): ContractForContractType<TContractType> {
  const sdk = useSDK();
  if (!sdk || !contractAddress) {
    return undefined;
  }
  return sdk.getContract(contractAddress, contractType);
}
