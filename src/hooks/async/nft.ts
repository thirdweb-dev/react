import { useActiveChainId } from "../../Provider";
import {
  MintNFTParams,
  MintNFTReturnType,
  NFT,
  NFTContract,
  RequiredParam,
  WalletAddress,
  useNFTBalanceParams,
  useTotalCirculatingSupplyParams,
} from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import type { QueryAllParams } from "@thirdweb-dev/sdk";
// eslint-disable-next-line no-duplicate-imports
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/**
 * @internal
 */
function convertResponseToNFTType(
  contract: NFTContract,
  metadata: Awaited<ReturnType<typeof contract["get"]>>,
): NFT<typeof contract> {
  if (contract instanceof Erc721) {
    return {
      type: "ERC721",
      supply: 1,
      owner: "",
      ...metadata,
    } as NFT<Erc721>;
  }
  return {
    type: "ERC1155",
    supply: 0,
    owner: "",
    ...metadata,
  } as NFT<Erc1155>;
}

/**
 * @internal
 */
function convertResponseToNFTTypeArray(
  contract: NFTContract,
  metadata: Awaited<ReturnType<typeof contract["get"]>>[],
): NFT<typeof contract>[] {
  return metadata.map((m) => convertResponseToNFTType(contract, m));
}
/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { data: nft, isLoading, error } = useNFT(NFTContract, <tokenId>);
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 */
export function useNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork<NFT<TContract>>(
    cacheKeys.contract.nft.get(contractAddress, tokenId),
    async () => {
      invariant(contract, "No Contract instance provided");
      invariant(contract.get, "Contract instance does not support get");

      return convertResponseToNFTType(
        contract,
        await contract.get(BigNumber.from(tokenId || 0)),
      );
    },
    {
      enabled: !!contract && tokenId !== undefined,
    },
  );
}

/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { data: nfts, isLoading, error } = useNFTs(NFTContract, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useNFTs<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork<NFT<TContract>[]>(
    cacheKeys.contract.nft.query.all(contractAddress, queryParams),
    async () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.all,
        "Contract instance does not support query.all",
      );

      return convertResponseToNFTTypeArray(
        contract,
        await contract.query.all(queryParams),
      );
    },
    {
      enabled: !!contract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useNFTSupply(NFTContract);
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useTotalCirculatingSupply<TContract extends NFTContract>(
  ...[contract, tokenId]: useTotalCirculatingSupplyParams<TContract>
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      if (contract instanceof Erc721) {
        invariant(
          contract?.query?.totalCirculatingSupply,
          "Contract instance does not support query.totalCirculatingSupply",
        );
        return contract.query.totalCirculatingSupply();
      }
      invariant(
        contract.query?.totalCirculatingSupply,
        "Contract instance does not support query.getTotalCount",
      );
      invariant(tokenId, "No tokenId provided");
      return contract.query.totalCirculatingSupply(tokenId);
    },
    {
      enabled: !!contract,
    },
  );
}

/**
 * Use this to get a the number of tokens in your {@link NFTContract}.
 *
 * @remarks The `total count` and `total supply` are the same for {@link ERC721} based contracts.
 * For {@link ERC1155} the `total count` is the number of NFTs that exist on the contract, **not** the sum of all supply of each token. (Since ERC1155 can have multiple owners per token.)
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useTotalCount(NFTContract);
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @returns a response object that incudes the total number of tokens in the contract
 * @beta
 */
export function useTotalCount(contract: RequiredParam<NFTContract>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.totalCount(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      if (contract instanceof Erc721) {
        invariant(
          contract?.query?.totalCirculatingSupply,
          "Contract instance does not support query.totalCirculatingSupply",
        );
        return contract.query.totalCirculatingSupply();
      }
      invariant(
        contract.query?.totalCount,
        "Contract instance does not support query.totalCount",
      );
      return contract.query.totalCount();
    },
    {
      enabled: !!contract,
    },
  );
}

/**
 * Use this to get a the owned NFTs for a specific {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(NFTContract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 */
export function useOwnedNFTs<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork<NFT<TContract>[]>(
    cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress),
    async () => {
      invariant(contract, "No Contract instance provided");
      if (contract instanceof Erc721) {
        invariant(
          contract.query?.owned?.all,
          "Contract instance does not support query.owned.all",
        );
        return convertResponseToNFTTypeArray(
          contract,
          await contract.query.owned.all(ownerWalletAddress),
        );
      }
      invariant(
        contract.query?.owned,
        "Contract instance does not support query.owned",
      );
      return convertResponseToNFTTypeArray(
        contract,
        await contract.query.owned(ownerWalletAddress),
      );
    },
    {
      enabled: !!contract && !!ownerWalletAddress,
    },
  );
}

/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 *
 * @example
 * ```javascript
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(NFTContract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instace of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @beta
 */
export function useNFTBalance<TContract extends NFTContract>(
  ...[contract, ownerWalletAddress, tokenId]: useNFTBalanceParams<TContract>
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.balanceOf(
      contractAddress,
      ownerWalletAddress,
      tokenId,
    ),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.balanceOf,
        "Contract instance does not support balanceOf",
      );
      invariant(ownerWalletAddress, "No owner wallet address provided");
      if (contract instanceof Erc1155) {
        invariant(tokenId, "No tokenId provided");
        return contract.balanceOf(ownerWalletAddress, tokenId);
      }
      return contract.balanceOf(ownerWalletAddress);
    },
    {
      enabled: !!contract && !!ownerWalletAddress,
    },
  );
}

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to mint a new NFT on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(NFTContract);
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
 * @param contract - an instace of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useMintNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: MintNFTParams<TContract>) => {
      invariant(data.to, 'No "to" address provided');
      invariant(contract?.mint?.to, "contract does not support mint.to");
      if (contract instanceof Erc1155) {
        invariant("supply" in data, "supply not provided");
        const { to, metadata, supply } = data;
        return (await contract.mint.to(to, {
          metadata,
          supply: BigNumber.from(supply || 1),
        })) as MintNFTReturnType<TContract>;
      }
      return (await contract.mint.to(
        data.to,
        data.metadata,
      )) as MintNFTReturnType<TContract>;
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contractAddress,
          activeChainId,
        ),
    },
  );
}
