import { useActiveChainId } from "../../Provider";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useAddress } from "../useAddress";
import { BigNumber } from "@ethersproject/bignumber";
import {
  Erc721,
  QueryAllParams,
  SmartContract,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { NFTMetadataOrUri } from "@thirdweb-dev/sdk/dist/src/schema";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/**
 @internal
 */
export function detectErc721Instance(
  contract: ValidContractInstance | SmartContract | null | undefined,
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
  contract: Erc721<any> | undefined,
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
export function useNFTSupply(contract: Erc721<any> | undefined) {
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
 * Use this to mint a new NFT on your ERC721 contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useNFTMint(">>YourERC721ContractInstance<<");
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
 * @param to - an address to mint the NFT to (defaults to the connected wallet)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useNFTMint(contract: Erc721<any> | undefined, to?: string) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  return useMutation(
    async (data: NFTMetadataOrUri) => {
      invariant(walletAddress, "no wallet connected, cannot mint.toAddress");
      invariant(contract?.mint?.to, "contract does not support mint.toAddress");
      return await contract.mint.to(to || walletAddress, data);
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
