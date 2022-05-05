import { cacheKeys } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { Token } from "@thirdweb-dev/sdk";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a the total supply of your Token contract.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useTokenSupply(<YourTokenContractInstance>);
 * ```
 *
 * @param contract - an instace of a Token contract.
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useTokenSupply(contract: Token | undefined) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.tokenSupply(contractAddress),
    async () => {
      if (contract) {
        return await contract?.totalSupply();
      }
      return undefined;
    },
    {
      enabled: !!contract || !contractAddress,
    },
  );
}

/**
 * Use this to get the balance of your Token contract for a given address.
 *
 * @example
 * ```javascript
 * const { data: balance, isLoading, error } = useTokenBalance(<YourTokenContractInstance>);
 * ```
 *
 * @param contract - an instace of a Token contract.
 * @returns a response object that includes the balance of the address
 * @beta
 */
export function useTokenBalace(
  contract: Token | undefined,
  address: string | undefined,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.tokenBalance(contractAddress, address),
    async () => {
      if (contract && address) {
        return await contract.balanceOf(address);
      }
      return undefined;
    },
    {
      enabled: !!address && (!!contract || !contractAddress),
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
