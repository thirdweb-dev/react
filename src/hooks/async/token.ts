import { useActiveChainId } from "../../Provider";
import { RequiredParam, TokenMintParams } from "../../types";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { Erc20 } from "@thirdweb-dev/sdk";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

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
export function useTokenSupply(contract: RequiredParam<Erc20<any>>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.token.totalSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.totalSupply();
    },
    {
      enabled: !!contract || !!contractAddress,
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
  contract: RequiredParam<Erc20<any>>,
  address: RequiredParam<string>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.token.balanceOf(contractAddress, address),
    async () => {
      invariant(contract, "No Contract instance provided");
      invariant(address, "No address provided");
      return await contract.balanceOf(address);
    },
    {
      enabled: !!address && !!contract,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your ERC721 contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(">>YourERC721ContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!" })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useMintTokens(contract: RequiredParam<Erc20<any>>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    (data: TokenMintParams) => {
      const { to, amount } = data;
      invariant(contract?.mint?.to, "contract does not support mint.to");
      return contract.mint.to(to, amount);
    },
    {
      onSuccess: (_txResult, variables) => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.token.totalSupply(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.token.balanceOf(contractAddress, variables.to),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
