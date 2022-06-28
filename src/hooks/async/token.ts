import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../query-cache/cache-keys";
import {
  ClaimTokenParams,
  RequiredParam,
  TokenMintParams,
  WalletAddress,
} from "../../types/types";
import { useQueryWithNetwork } from "../utils/useQueryWithNetwork";
import type { Erc20, TokenDrop } from "@thirdweb-dev/sdk";
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
    contract?.getChainId(),
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
    contract?.getChainId(),
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
  const queryClient = useQueryClient();

  return useMutation(
    (data: TokenMintParams) => {
      const { to, amount } = data;
      invariant(contract?.mint?.to, "contract does not support mint.to");
      return contract.mint.to(to, amount);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contract?.getAddress(),
          contract?.getChainId(),
        ),
    },
  );
}

/**
 * Use this to claim tokens on your {@link TokenDrop}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: claimTokens,
 *     isLoading,
 *     error,
 *   } = useClaimToken(TokenDropContract);
 *
 *   if (error) {
 *     console.error("failed to claim tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimTokens({to: "0x...", amount: 100})}
 *     >
 *       Claim Tokens!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a {@link TokenDrop}
 * @returns a mutation object that can be used to tokens to the wallet specificed in the params
 * @beta
 */
export function useClaimToken<TContract extends TokenDrop>(
  contract: RequiredParam<TContract>,
) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: ClaimTokenParams) => {
      invariant(data.to, 'No "to" address provided');
      invariant(contract?.claimTo, "contract does not support claimTo");
      return await contract.claimTo(
        data.to,
        data.amount,
        data.checkERC20Allowance,
      );
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contract?.getAddress(),
          contract?.getChainId(),
        ),
    },
  );
}
