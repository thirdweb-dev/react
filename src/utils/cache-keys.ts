import { SupportedChainId } from "../constants/chain";
import { ContractAddress, RequiredParam, WalletAddress } from "../types";
import type {
  MarketplaceFilter,
  QueryAllParams,
  SUPPORTED_CHAIN_ID,
} from "@thirdweb-dev/sdk";
import { BigNumberish, constants } from "ethers";
import { QueryClient, QueryKey } from "react-query";

const TW_CACHE_KEY_PREFIX = "tw-cache";

function createCachekey(input: QueryKey): QueryKey {
  if (input[0] === TW_CACHE_KEY_PREFIX) {
    return input;
  }
  return [TW_CACHE_KEY_PREFIX, ...input];
}

/**
 * @internal
 */
export function createContractCacheKey(
  contractAddress: string = constants.AddressZero,
  input: QueryKey = [],
): QueryKey {
  return createCachekey(["contract", contractAddress, ...input]);
}

/**
 @internal
 */
export function createCacheKeyWithNetwork(
  input: QueryKey,
  chainId: RequiredParam<SUPPORTED_CHAIN_ID>,
): QueryKey {
  return cacheKeys.network.active(chainId).concat(input);
}

/**
 * @internal
 */
export function invalidateContractAndBalances(
  queryClient: QueryClient,
  contractAddress: RequiredParam<ContractAddress>,
  chainId: RequiredParam<SUPPORTED_CHAIN_ID>,
): Promise<unknown> {
  return Promise.all([
    queryClient.invalidateQueries(
      createCacheKeyWithNetwork(
        createContractCacheKey(contractAddress),
        chainId,
      ),
    ),
    queryClient.invalidateQueries(
      createCacheKeyWithNetwork(createCachekey(["balance"]), chainId),
    ),
  ]);
}

/**
 @internal
 */
export const cacheKeys = {
  network: {
    active: (chainId: RequiredParam<SUPPORTED_CHAIN_ID>) =>
      createCachekey(["chainId", chainId]),
  },
  wallet: {
    balance: (chainId: SupportedChainId, tokenAddress?: ContractAddress) =>
      createCacheKeyWithNetwork(
        createCachekey(["balance", { tokenAddress }]),
        chainId,
      ),
  },
  contract: {
    type: (contractAddress: RequiredParam<ContractAddress>) =>
      createContractCacheKey(contractAddress, ["contract-type"]),
    publishMetadata: (contractAddress: RequiredParam<ContractAddress>) =>
      createContractCacheKey(contractAddress, ["publish-metadata"]),
    typeAndPublishMetadata: (contractAddress: RequiredParam<ContractAddress>) =>
      createContractCacheKey(contractAddress, ["contract-type-and-metadata"]),
    metadata: (contractAddress: RequiredParam<ContractAddress>) =>
      createContractCacheKey(contractAddress, ["metadata"]),
    extractFunctions: (contractAddress: RequiredParam<ContractAddress>) =>
      createContractCacheKey(contractAddress, ["extractFunctions"]),

    // specific contract types
    nft: {
      get: (
        contractAddress: RequiredParam<ContractAddress>,
        tokenId: RequiredParam<BigNumberish>,
      ) => createContractCacheKey(contractAddress, ["get", { tokenId }]),
      balanceOf: (
        contractAddress: RequiredParam<ContractAddress>,
        owner: RequiredParam<WalletAddress>,
        tokenId: RequiredParam<BigNumberish>,
      ) =>
        createContractCacheKey(contractAddress, [
          "balanceOf",
          { owner, tokenId },
        ]),
      query: {
        all: (
          contractAddress: RequiredParam<ContractAddress>,
          params?: QueryAllParams,
        ) =>
          createContractCacheKey(
            contractAddress,
            params ? ["query", "all", params] : ["query", "all"],
          ),
        totalCirculatingSupply: (
          contractAddress: RequiredParam<ContractAddress>,
        ) =>
          createContractCacheKey(contractAddress, [
            "query",
            "totalCirculatingSupply",
          ]),
        owned: {
          all: (
            contractAddress: RequiredParam<ContractAddress>,
            owner: RequiredParam<WalletAddress>,
          ) =>
            createContractCacheKey(contractAddress, [
              "query",
              "owned",
              "all",
              owner,
            ]),
        },
      },
      drop: {
        getAllUnclaimed: (
          contractAddress: RequiredParam<ContractAddress>,
          params?: QueryAllParams,
        ) =>
          createContractCacheKey(
            contractAddress,
            params ? ["getAllUnclaimed", params] : ["getAllUnclaimed"],
          ),
        totalUnclaimedSupply: (
          contractAddress: RequiredParam<ContractAddress>,
        ) => createContractCacheKey(contractAddress, ["totalUnclaimedSupply"]),
        totalClaimedSupply: (contractAddress: RequiredParam<ContractAddress>) =>
          createContractCacheKey(contractAddress, ["totalClaimedSupply"]),
      },
    },

    token: {
      totalSupply: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["totalSupply"]),
      balanceOf: (
        contractAddress: RequiredParam<ContractAddress>,
        walletAddress: RequiredParam<ContractAddress>,
      ) =>
        createContractCacheKey(contractAddress, [
          "balanceOf",
          { walletAddress },
        ]),
    },
    marketplace: {
      getListing: (
        contractAddress: RequiredParam<ContractAddress>,
        listingId: RequiredParam<BigNumberish>,
      ) =>
        createContractCacheKey(contractAddress, ["getListing", { listingId }]),
      getAllListings: (
        contractAddress: RequiredParam<ContractAddress>,
        params?: MarketplaceFilter,
      ) =>
        createContractCacheKey(
          contractAddress,
          params ? ["getAllListings", params] : ["getAllListings"],
        ),
      getActiveListings: (
        contractAddress: RequiredParam<ContractAddress>,
        params?: MarketplaceFilter,
      ) =>
        createContractCacheKey(
          contractAddress,
          params ? ["getActiveListings", params] : ["getActiveListings"],
        ),
      getBidBufferBps: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["getBidBufferBps"]),

      auction: {
        getWinningBid: (
          contractAddress: RequiredParam<ContractAddress>,
          listingId: RequiredParam<BigNumberish>,
        ) =>
          createContractCacheKey(contractAddress, [
            "auction",
            "getWinningBid",
            { listingId },
          ]),
        getWinner: (
          contractAddress: RequiredParam<ContractAddress>,
          listingId: RequiredParam<BigNumberish>,
        ) =>
          createContractCacheKey(contractAddress, [
            "auction",
            "getWinner",
            { listingId },
          ]),
      },
    },
  },
  // extensions
  extensions: {
    claimConditions: {
      getActive: (
        contractAddress: RequiredParam<ContractAddress>,
        tokenId?: BigNumberish,
      ) =>
        createContractCacheKey(
          contractAddress,
          tokenId
            ? ["claimConditions", "getActive", { tokenId }]
            : ["claimConditions", "getActive"],
        ),
      getAll: (
        contractAddress: RequiredParam<ContractAddress>,
        tokenId?: BigNumberish,
      ) =>
        createContractCacheKey(
          contractAddress,
          tokenId
            ? ["claimConditions", "getActive", { tokenId }]
            : ["claimConditions", "getActive"],
        ),
      getClaimIneligibilityReasons: (
        contractAddress: RequiredParam<ContractAddress>,
        params: { walletAddress?: WalletAddress; quantity: string | number },
        tokenId?: BigNumberish,
      ) =>
        createContractCacheKey(
          contractAddress,
          tokenId
            ? ["claimConditions", "getActive", { tokenId }, params]
            : ["claimConditions", "getActive", params],
        ),
    },

    // primary sale contracts
    sales: {
      getRecipient: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["sales"]),
    },
    // royalties
    royalties: {
      getDefaultRoyaltyInfo: (
        contractAddress: RequiredParam<ContractAddress>,
      ) => createContractCacheKey(contractAddress, ["royalties"]),
    },
    // platform fees
    platformFees: {
      get: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["platformFees"]),
    },
    // contract metadata
    metadata: {
      get: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["metadata"]),
    },
  },
} as const;
