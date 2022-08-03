import { useActiveChainId } from "../../Provider";
import {
  ClaimTokenParams,
  RequiredParam,
  TokenMintParams,
  TokenParams,
  WalletAddress,
} from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Erc20, TokenDrop } from "@thirdweb-dev/sdk/dist/browser";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a the total supply of your {@link Erc20} contract.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useTokenSupply(<YourTokenContractInstance>);
 * ```
 *
 * @param contract - an instance of a Token contract.
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
 * Use this to get the balance of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { data: balance, isLoading, error } = useTokenBalance(<YourTokenContractInstance>);
 * ```
 *
 * @param contract - an instance of a Token contract.
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
 * Use this to mint new tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintTokens,
 *     isLoading,
 *     error,
 *   } = useMintToken(">>YourERC20ContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to mint tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC20 spec (token, token drop, custom contract that follows the ERC20 spec)
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
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
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
 *       onClick={() => claimTokens({ to: "0x...", amount: 100 })}
 *     >
 *       Claim Tokens!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenDrop}
 * @returns a mutation object that can be used to tokens to the wallet specificed in the params
 * @beta
 */
export function useClaimToken<TContract extends TokenDrop>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
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
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * Use this to transfer tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: transferTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(">>YourERC20ContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to transfer tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferTokens({ toAddress: "0x...", amount: 1000 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC20 spec (token, token drop, custom contract that follows the ERC20 spec)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useTransferToken(contract: RequiredParam<Erc20>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    (data: TokenParams) => {
      const { toAddress, amount } = data;
      invariant(contract?.transfer, "contract does not support transfer");
      return contract.transfer(toAddress, amount);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}

/**
 * Use this to transfer batch tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: transferBatchTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(">>YourERC20ContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to transfer batch tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferBatchTokens([{ toAddress: "0x...", amount: 1000 }, { toAddress: "0x...", amount: 2000 }])}
 *     >
 *       Transfer Batch
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC20 spec (token, token drop, custom contract that follows the ERC20 spec)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useTransferBatchToken(contract: RequiredParam<Erc20>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    (data: TokenParams[]) => {
      invariant(
        contract?.transferBatch,
        "contract does not support transferBatch",
      );
      return contract.transferBatch(data);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}
