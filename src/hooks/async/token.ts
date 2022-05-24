import { useActiveChainId } from "../../Provider";
import { RequiredParam, TokenMintParams, WalletAddress } from "../../types";
import {
  cacheKeys,
  createCacheKeyWithNetwork,
  createContractCacheKey,
} from "../../utils/cache-keys";
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
export function useTokenSupply(contract: RequiredParam<Erc20>) {
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
export function useTokenBalance(
  contract: RequiredParam<Erc20>,
  walletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.token.balanceOf(contractAddress, walletAddress),
    async () => {
      invariant(contract, "No Contract instance provided");
      invariant(walletAddress, "No address provided");
      return await contract.balanceOf(walletAddress);
    },
    {
      enabled: !!walletAddress && !!contract,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your ERC20 contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintToken(">>YourERC20ContractInstance<<");
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
 * @param contract - an instace of a contract that extends the ERC20 spec (token, token drop, custom contract that follows the ERC20 spec)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useMintToken(contract: RequiredParam<Erc20>) {
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
      onSuccess: () =>
        queryClient.invalidateQueries(
          createCacheKeyWithNetwork(
            createContractCacheKey(contractAddress),
            activeChainId,
          ),
        ),
    },
  );
}
