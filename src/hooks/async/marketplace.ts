import { useActiveChainId } from "../../Provider";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useAddress } from "../useAddress";
import {
  Marketplace,
  MarketplaceFilter,
  NewAuctionListing,
  NewDirectListing,
} from "@thirdweb-dev/sdk";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a list all listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useMarketplaceListings(<YourMarketplaceContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of listings
 * @beta
 */
export function useMarketplaceListings(
  contract: Marketplace | undefined,
  filter?: MarketplaceFilter,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.getAllListings(contractAddress, filter),
    async () => {
      if (contract) {
        return contract.getAllListings(filter);
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
 * Use this to get a list active listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useMarketplaceListings(<YourMarketplaceContractInstance>, { seller: "0x...", tokenContract: "0x...", tokenId: 1, start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of listings
 * @beta
 */
export function useMarketplaceActiveListings(
  contract: Marketplace | undefined,
  filter?: MarketplaceFilter,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.getActiveListings(contractAddress, filter),
    async () => {
      if (contract) {
        return contract.getActiveListings(filter);
      }
      return [];
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to create a new Direct Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createDirectListing,
 *     isLoading,
 *     error,
 *   } = useMarketplaceListDirect(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create direct listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createDirectListing(directListingdata)}
 *     >
 *       Create Direct Listing!
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
export function useMarketplaceListDirect(contract: Marketplace | undefined) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  return useMutation(
    async (data: NewDirectListing) => {
      invariant(walletAddress, "no wallet connected, cannot create listing");
      invariant(
        contract?.direct?.createListing,
        "contract does not support direct.createListing",
      );
      return await contract.direct.createListing(data);
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.getAllListings(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.getActiveListings(contractAddress),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}

/**
 * Use this to create a new Auction Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createAuctionListing,
 *     isLoading,
 *     error,
 *   } = useMarketplaceListAuction(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createAuctionListing(auctionListingData)}
 *     >
 *       Create Auction Listing!
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
export function useMarketplaceListAuction(contract: Marketplace | undefined) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  return useMutation(
    async (data: NewAuctionListing) => {
      invariant(walletAddress, "no wallet connected, cannot create listing");
      invariant(
        contract?.direct?.createListing,
        "contract does not support auction.createListing",
      );
      return await contract.auction.createListing(data);
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.getAllListings(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.getActiveListings(contractAddress),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
