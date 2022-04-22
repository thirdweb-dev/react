import { useActiveChainId } from "../../Provider";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { BigNumber } from "@ethersproject/bignumber";
import {
  CustomContract,
  Erc721,
  QueryAllParams,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { NFTMetadataOrUri } from "@thirdweb-dev/sdk/dist/schema";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/**
 @internal
 */
export function detectErc721Instance(
  contract?: ValidContractInstance | CustomContract | null,
) {
  if (!contract) {
    return undefined;
  }
  if (contract instanceof Erc721) {
    return contract;
  }
  if ("nft" in contract && contract.nft instanceof Erc721) {
    return contract.nft;
  }
  return undefined;
}

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a list of NFT tokens of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: nfts, isLoading, error } = useNFTList(<YourERC721ContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useNFTList(
  contract?: Erc721<any>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.queryAll(contractAddress, queryParams),
    async () => {
      if (contract && contract.query?.all) {
        return await contract.query.all(queryParams);
      }
      return [];
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useNFTSupply(<YourERC721ContractInstance>);
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useNFTSupply(contract?: Erc721<any>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.totalSupply(contractAddress),
    async () => {
      if (!contract?.query?.totalSupply) {
        return BigNumber.from(0);
      }
      return await contract.query.totalSupply();
    },
    {
      enabled: !!contract,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your ERC721 contract. (To the connected wallet.)
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useNFTMintToSelfMutation(">>YourERC721ContractInstance<<");
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
export function useNFTMintToSelfMutation(contract?: Erc721<any>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  return useMutation(
    async (data: NFTMetadataOrUri) => {
      invariant(
        contract?.mint?.toSelf,
        "contract does not support mint.toSelf",
      );
      return await contract.mint.toSelf(data);
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.queryAll(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.totalSupply(contractAddress),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
