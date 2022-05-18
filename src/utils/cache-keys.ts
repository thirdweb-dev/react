import { ContractAddress, RequiredParam, WalletAddress } from "../types";
import {
  MarketplaceFilter,
  QueryAllParams,
  SUPPORTED_CHAIN_ID,
} from "@thirdweb-dev/sdk";
import { BigNumberish, constants } from "ethers";
import { QueryKey } from "react-query";

const TW_CACHE_KEY_PREFIX = "tw-cache";

function createCachekey(input: QueryKey): QueryKey {
  if (input[0] === TW_CACHE_KEY_PREFIX) {
    return input;
  }
  return [TW_CACHE_KEY_PREFIX, ...input];
}

function createContractCacheKey(
  contractAddress: string = constants.AddressZero,
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
      ) => createContractCacheKey(contractAddress, ["nft", "get", tokenId]),
      balanceOf: (
        contractAddress: RequiredParam<ContractAddress>,
        owner: RequiredParam<WalletAddress>,
      ) => createContractCacheKey(contractAddress, ["nft", "balanceOf", owner]),
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
    edition: {
      get: (
        contractAddress: RequiredParam<ContractAddress>,
        tokenId: RequiredParam<BigNumberish>,
      ) => createContractCacheKey(contractAddress, ["edition", "get", tokenId]),
      balanceOf: (
        contractAddress: RequiredParam<ContractAddress>,
        tokenId: RequiredParam<BigNumberish>,
        owner: RequiredParam<WalletAddress>,
      ) =>
        createContractCacheKey(contractAddress, [
          "edition",
          "balanceOf",
          { tokenId, owner },
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
        getTotalCount: (contractAddress: RequiredParam<ContractAddress>) =>
          createContractCacheKey(contractAddress, ["query", "getTotalCount"]),
      },
    },
    token: {
      totalSupply: (contractAddress: RequiredParam<ContractAddress>) =>
        createContractCacheKey(contractAddress, ["totalSupply"]),
      balanceOf: (
        contractAddress: RequiredParam<ContractAddress>,
        walletAddress: RequiredParam<ContractAddress>,
      ) =>
        createContractCacheKey(contractAddress, ["balanceOf", walletAddress]),
    },
    marketplace: {
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
            ? ["claimConditions", "getActive", contractAddress, tokenId]
            : ["claimConditions", "getActive", contractAddress],
        ),
      getClaimIneligibilityReasons: (
        contractAddress: RequiredParam<ContractAddress>,
        params: { walletAddress?: WalletAddress; quantity: string | number },
        tokenId?: BigNumberish,
      ) =>
        createContractCacheKey(
          contractAddress,
          tokenId
            ? ["claimConditions", "getActive", contractAddress, tokenId, params]
            : ["claimConditions", "getActive", contractAddress, params],
        ),
    },
  },
} as const;
