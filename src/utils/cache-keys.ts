import { AddressZero } from "@ethersproject/constants";
import {
  MarketplaceFilter,
  QueryAllParams,
  SUPPORTED_CHAIN_ID,
} from "@thirdweb-dev/sdk";
import { BigNumberish } from "ethers";
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
    queryAll: (contractAddress?: string, queryParams?: QueryAllParams) =>
      createContractCacheKey(
        contractAddress,
        queryParams ? ["queryAll", queryParams] : ["queryAll"],
      ),
    totalSupply: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["totalSupply"]),
    queryAllEdition: (contractAddress?: string, queryParams?: QueryAllParams) =>
      createContractCacheKey(
        contractAddress,
        queryParams ? ["queryAllEdition", queryParams] : ["queryAllEdition"],
      ),
    totalSupplyEdition: (
      contractAddress: string | undefined,
      tokenId: BigNumberish,
    ) =>
      createContractCacheKey(contractAddress, ["totalSupplyEdition", tokenId]),
    queryAllEditionDrop: (
      contractAddress?: string,
      queryParams?: QueryAllParams,
    ) =>
      createContractCacheKey(
        contractAddress,
        queryParams
          ? ["queryAllEditionDrop", queryParams]
          : ["queryAllEditionDrop"],
      ),
    totalSupplyEditionDrop: (
      contractAddress: string | undefined,
      tokenId: BigNumberish,
    ) =>
      createContractCacheKey(contractAddress, [
        "totalSupplyEditionDrop",
        tokenId,
      ]),
    getAllListings: (
      contractAddress?: string,
      queryParams?: MarketplaceFilter,
    ) =>
      createContractCacheKey(
        contractAddress,
        queryParams ? ["getAllListings", queryParams] : ["getAllListings"],
      ),
    getActiveListings: (
      contractAddress?: string,
      queryParams?: MarketplaceFilter,
    ) =>
      createContractCacheKey(
        contractAddress,
        queryParams
          ? ["getActiveListings", queryParams]
          : ["getActiveListings"],
      ),
    tokenSupply: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["tokenSupply"]),
    tokenBalance: (
      contractAddress: string | undefined,
      walletAddress: string | undefined,
    ) =>
      createContractCacheKey(contractAddress, ["tokenBalance", walletAddress]),
    extractFunctions: (contractAddress?: string) =>
      createContractCacheKey(contractAddress, ["extractFunctions"]),
  },
};
