import { useActiveChainId } from "../../Provider";
import { RequiredParam } from "../../types";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { BigNumberish } from "@ethersproject/bignumber";
import type {
  EditionMetadataOrUri,
  Erc1155,
  QueryAllParams,
} from "@thirdweb-dev/sdk";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

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
  contract: RequiredParam<Erc1155<any>>,
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
  contract: RequiredParam<Erc1155<any>>,
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
 * @param to - an address to mint the Edition to
 * @returns a mutation object that can be used to mint a new Edition token to the connected wallet
 * @beta
 */
export function useMintEdition(
  contract: RequiredParam<Erc1155<any>>,
  to: string,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: EditionMetadataOrUri) => {
      invariant(contract?.mint?.to, "contract does not support mint.to");
      return await contract.mint.to(to, data);
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
