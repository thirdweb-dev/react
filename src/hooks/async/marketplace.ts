import { useActiveChainId } from "../../Provider";
import { MakeBidParams, RequiredParam } from "../../types";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useAddress } from "../useAddress";
import type {
  Marketplace,
  MarketplaceFilter,
  NewAuctionListing,
  NewDirectListing,
} from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get a specific listing from the marketplace.
 *
 * @example
 * ```javascript
 * const { data: listing, isLoading, error } = useListing(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes an array of listings
 * @beta
 */
export function useListing(
  contract: RequiredParam<Marketplace>,
  listingId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.getListing(contractAddress, listingId),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.getListing(BigNumber.from(listingId || 0));
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a list all listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
export function useListings(
  contract: RequiredParam<Marketplace>,
  filter?: MarketplaceFilter,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.getAllListings(contractAddress, filter),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.getAllListings(filter);
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
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
export function useActiveListings(
  contract: RequiredParam<Marketplace>,
  filter?: MarketplaceFilter,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.getActiveListings(contractAddress, filter),
    () => {
      invariant(contract, "No Contract instance provided");

      return contract.getActiveListings(filter);
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the winning bid for an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: winningBid, isLoading, error } = useWiningBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the {@link Offer} that is winning the auction
 * @beta
 */
export function useWiningBid(
  contract: RequiredParam<Marketplace>,
  listingId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.auction.getWinningBid(
      contractAddress,
      listingId,
    ),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.auction.getWinningBid(BigNumber.from(listingId || 0));
    },
    {
      enabled: !!contract && listingId !== undefined,
    },
  );
}

/**
 * Use this to get the winner of an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useAuctionWinner(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instace of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes an array of listings
 * @throws an error if the auction is not finished
 * @beta
 */
export function useAuctionWinner(
  contract: RequiredParam<Marketplace>,
  listingId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.auction.getWinner(
      contractAddress,
      listingId,
    ),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.auction.getWinner(BigNumber.from(listingId || 0));
    },
    {
      enabled: !!contract && listingId !== undefined,
    },
  );
}

/**
 * Use this to get the buffer in basis points between offers from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useAuctionWinner(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instace of a marketplace contract

 * @returns a response object that includes an array of listings
 * @beta
 */
export function useBidBuffer(contract: RequiredParam<Marketplace>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.marketplace.getBidBufferBps(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      return contract.getBidBufferBps();
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
 * Use this to create a new Direct Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createDirectListing,
 *     isLoading,
 *     error,
 *   } = useCreateDirectListing(">>YourMarketplaceContractInstance<<");
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
 * @param contract - an instace of a Marketplace contract
 * @returns a mutation object that can be used to create a new direct listing
 * @beta
 */
export function useCreateDirectListing(contract: RequiredParam<Marketplace>) {
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
              cacheKeys.contract.marketplace.getAllListings(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.getActiveListings(contractAddress),
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
 *   } = useCreateAuctionListing(">>YourMarketplaceContractInstance<<");
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
 * @param contract - an instace of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */
export function useCreateAuctionListing(contract: RequiredParam<Marketplace>) {
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
              cacheKeys.contract.marketplace.getAllListings(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.getActiveListings(contractAddress),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}

/**
 * Use this to place a bid on an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeBid,
 *     isLoading,
 *     error,
 *   } = useMakeBid(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeBid({ listingId: 1, amount: 2 })}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */
export function useMakeBid(contract: RequiredParam<Marketplace>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  return useMutation(
    async (data: MakeBidParams) => {
      invariant(walletAddress, "no wallet connected, cannot make bid");
      invariant(
        contract?.auction?.makeBid,
        "contract does not support auction.makeBid",
      );
      return await contract.auction.makeBid(
        data.listingId,
        BigNumber.from(data.bid).toString(),
      );
    },
    {
      onSuccess: (_d, variables) => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.getListing(
                contractAddress,
                variables.listingId,
              ),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.auction.getWinningBid(
                contractAddress,
                variables.listingId,
              ),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.auction.getWinner(
                contractAddress,
                variables.listingId,
              ),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}

/**
 * Use this to buy out an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeBid,
 *     isLoading,
 *     error,
 *   } = useBuyoutListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeBid({ listingId: 1, amount: 2 })}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a Marketplace contract
 * @returns a mutation object that can be used to buy out an auction listing
 * @beta
 */
export function useBuyoutListing(contract: RequiredParam<Marketplace>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  return useMutation(
    async (listingId: BigNumberish) => {
      invariant(walletAddress, "no wallet connected, cannot make bid");
      invariant(
        contract?.auction?.makeBid,
        "contract does not support auction.makeBid",
      );
      return await contract.auction.buyoutListing(listingId);
    },
    {
      onSuccess: (_d, listingId) => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.getListing(
                contractAddress,
                listingId,
              ),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.auction.getWinningBid(
                contractAddress,
                listingId,
              ),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.marketplace.auction.getWinner(
                contractAddress,
                listingId,
              ),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
