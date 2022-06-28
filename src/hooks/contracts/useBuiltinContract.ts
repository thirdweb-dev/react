import { useSDK } from "../../providers/thirdweb-sdk";
import { RequiredParam } from "../../types/types";
import { useQueryWithNetwork } from "../utils/useQueryWithNetwork";
import { ChainIdOrName, ContractType } from "@thirdweb-dev/sdk/dist/browser";

/**
 * @internal
 * @param contractType - the contract type
 * @param contractAddress - the contract address
 * @returns a promise with the the instance of the contract for the given type and address
 */
export function useBuiltinContract<TContractType extends ContractType>(
  contractType: RequiredParam<TContractType>,
  contractAddress: RequiredParam<string>,
  chain?: ChainIdOrName,
) {
  const sdk = useSDK();

  return useQueryWithNetwork(
    ["contract", contractAddress],
    chain,
    async () => {
      if (!sdk || !contractAddress || !contractType) {
        return undefined;
      }
      return await sdk.getBuiltInContract(contractAddress, contractType, chain);
    },
    {
      enabled: !!sdk,
      cacheTime: 0,
    },
  );
}
