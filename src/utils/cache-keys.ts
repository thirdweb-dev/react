import { AddressZero } from "@ethersproject/constants";
import {
  MarketplaceFilter,
  QueryAllParams,
  SUPPORTED_CHAIN_ID,
} from "@thirdweb-dev/sdk";
import { QueryKey } from "react-query";

const TW_CACHE_KEY_PREFIX = "tw-cache";

function createCachekey(input: QueryKey): QueryKey {
  if (input[0] === TW_CACHE_KEY_PREFIX) {
    return input;
  }
  return [TW_CACHE_KEY_PREFIX, ...input];
}

function createContractCacheKey(
  contractAddress: string = AddressZero,
  input: QueryKey,
): QueryKey {
  return createCachekey(["contract", contractAddress, ...input]);
}

/**
 @internal
 */
export function createCacheKeyWithNetwork(
  input: QueryKey,
  chainId?: SUPPORTED_CHAIN_ID,
): QueryKey {
  return cacheKeys.network.active(chainId).concat(input);
}

/**
 @internal
 */
export const cacheKeys = {
  network: {
    active: (chainId?: SUPPORTED_CHAIN_ID) =>
      createCachekey(["chainId", chainId]),
  },
  contract: {
    type: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["contract-type"]),
    publishMetadata: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["publish-metadata"]),
    typeAndPublishMetadata: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["contract-type-and-metadata"]),
    metadata: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["metadata"]),
    extractFunctions: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["extractFunctions"]),

    // specific contract types
    nft: {
      query: {
        all: (contractAddress?: string, params?: QueryAllParams) =>
          createContractCacheKey(
            contractAddress,
            params ? ["query", "all", params] : ["query", "all"],
          ),
        totalSupply: (contractAddress?: string) =>
          createContractCacheKey(contractAddress, ["query", "totalSupply"]),
      },
    },
    edition: {
      query: {
        all: (contractAddress?: string, params?: QueryAllParams) =>
          createContractCacheKey(
            contractAddress,
            params ? ["query", "all", params] : ["query", "all"],
          ),
        getTotalCount: (contractAddress: string | undefined) =>
          createContractCacheKey(contractAddress, ["query", "getTotalCount"]),
      },
    },
    token: {
      totalSupply: (contractAddress?: string) =>
        createContractCacheKey(contractAddress, ["totalSupply"]),
      balanceOf: (
        contractAddress: string | undefined,
        walletAddress: string | undefined,
      ) =>
        createContractCacheKey(contractAddress, ["balanceOf", walletAddress]),
    },
    marketplace: {
      getAllListings: (contractAddress?: string, params?: MarketplaceFilter) =>
        createContractCacheKey(
          contractAddress,
          params ? ["getAllListings", params] : ["getAllListings"],
        ),
      getActiveListings: (
        contractAddress?: string,
        params?: MarketplaceFilter,
      ) =>
        createContractCacheKey(
          contractAddress,
          params ? ["getActiveListings", params] : ["getActiveListings"],
        ),
    },
  },
} as const;
