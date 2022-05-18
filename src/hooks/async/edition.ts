import { useActiveChainId } from "../../Provider";
import { EditionMintParams, RequiredParam, WalletAddress } from "../../types";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { Erc1155, QueryAllParams } from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get an individual NFT token of your ERC1155 contract.
 *
 * @example
 * ```javascript
 * const { data: edition, isLoading, error } = usEdition(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC1155 spec (edition, edition drop, custom contract that follows the ERC1155 spec)
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 */
export function usEdition(
  contract: RequiredParam<Erc1155>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.edition.get(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(contract.get, "Contract instance does not support get");
      return contract.get(BigNumber.from(tokenId || 0));
    },
    {
      enabled: !!contract && tokenId !== undefined,
    },
  );
}

/**
 * Use this to get a list of NFT tokens of your ERC1155 contract.
 *
 * @example
 * ```javascript
 * const { data: editions, isLoading, error } = useEditions(<YourERC1155Instance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC1155 spec (edition, edition drop, custom contract that follows the ERC1155 spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useEditions(
  contract: RequiredParam<Erc1155>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.edition.query.all(contractAddress, queryParams),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.all,
        "Contract instance does not support query.all",
      );

      return contract.query.all(queryParams);
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your ERC1155 contract.
 *
 * @example
 * ```javascript
 * const { data: totalCount, isLoading, error } = useEditionTotalCount(<YourERC1155Instance>);
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC1155 spec (edition, edition drop, custom contract that follows the ERC1155 spec)
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useEditionTotalCount(
  contract: RequiredParam<Erc1155>,
  tokenId: BigNumberish,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.edition.query.getTotalCount(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.getTotalCount,
        "Contract instance does not support query.getTotalCount",
      );

      return contract.query?.getTotalCount();
    },
    {
      enabled: !!contract || !tokenId,
    },
  );
}

/**
 * Use this to get a the total balance of a specific ERC1155 contract and wallet address.
 *
 *
 * @example
 * ```javascript
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(<YourERC1155ContractInstance>, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the ERC1155 spec)
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @beta
 */
export function useEditionBalance(
  contract: RequiredParam<Erc1155>,
  tokenId: RequiredParam<BigNumberish>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.edition.balanceOf(
      contractAddress,
      tokenId,
      ownerWalletAddress,
    ),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.balanceOf,
        "Contract instance does not support balanceOf",
      );
      invariant(ownerWalletAddress, "No owner wallet address provided");
      return contract.balanceOf(
        ownerWalletAddress,
        BigNumber.from(tokenId || 0),
      );
    },
    {
      enabled: !!contract && !!ownerWalletAddress && tokenId !== undefined,
    },
  );
}

/** **********************/
/**  READ HOOKS (drop)  **/
/** **********************/

// TODO

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your ERC1155 contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintEdition,
 *     isLoading,
 *     error,
 *   } = useMintEdition(">>YourERC1155ContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintEdition({ name: "My awesome NFT!" })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC1155 spec (nft collection, nft drop, custom contract that follows the ERC1155 spec)
 * @returns a mutation object that can be used to mint a new Edition token to the connected wallet
 * @beta
 */
export function useMintEdition(contract: RequiredParam<Erc1155>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: EditionMintParams) => {
      const { to, ...metadata } = data;
      invariant(to, 'No "to" address provided');
      invariant(contract?.mint?.to, "contract does not support mint.to");
      return await contract.mint.to(to, metadata);
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.edition.query.all(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.edition.query.getTotalCount(contractAddress),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
