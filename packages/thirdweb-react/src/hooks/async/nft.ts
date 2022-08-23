import { useActiveChainId } from "../../Provider";
import {
  NFTContractInput,
  getNftContract,
} from "../../contract-utils/nft-contracts";
import {
  AirdropNFTParams,
  BurnNFTParams,
  MintNFTParams,
  MintNFTReturnType,
  MintNFTSupplyParams,
  NFT,
  NFTContract,
  RequiredParam,
  TransferNFTParams,
  WalletAddress,
  useNFTBalanceParams,
  useTotalCirculatingSupplyParams,
} from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Erc721,
  Erc1155,
  QueryAllParams,
} from "@thirdweb-dev/sdk/dist/browser";
import { BigNumber, BigNumberish } from "ethers";
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
  contract?: NFTContract,
  metadata?: Awaited<ReturnType<typeof contract["get"]>>[],
): NFT<typeof contract>[] {
  return metadata?.map((m) => convertResponseToNFTType(contract, m)) || [];
}
/** **********************/
/**     READ  HOOKS     **/
/** **********************/

/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(nftDrop, <tokenId>);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(contract?.nft, <tokenId>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 */
export function useNFT<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.get(contractAddress, tokenId),
    async () => {
      invariant(nftContract, "No Contract instance provided");
      invariant(nftContract.get, "Contract instance does not support get");

      return convertResponseToNFTType(
        nftContract,
        await nftContract.get(BigNumber.from(tokenId || 0)),
      );
    },
    {
      enabled: !!nftContract && tokenId !== undefined,
    },
  );
}

/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(nftDrop, { start: 0, count: 100 });
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(contract?.nft, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useNFTs<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
  queryParams?: QueryAllParams,
) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.all(contractAddress, queryParams),
    async () => {
      invariant(nftContract, "No Contract instance provided");
      invariant(
        nftContract.query?.all,
        "Contract instance does not support query.all",
      );

      return convertResponseToNFTTypeArray(
        nftContract,
        await nftContract.query.all(queryParams),
      );
    },
    {
      enabled: !!nftContract || !contractAddress,
      keepPreviousData: true,
    },
  );
}

/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 *  * @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: totalSupply, isLoading, error } = useNFTSupply(nftDrop);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalSupply, isLoading, error } = useNFTSupply(contract?.nft);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useTotalCirculatingSupply<TContract extends NFTContractInput>(
  ...[contract, tokenId]: useTotalCirculatingSupplyParams<TContract>
) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress),
    () => {
      invariant(nftContract, "No Contract instance provided");
      if (nftContract instanceof Erc721) {
        invariant(
          nftContract?.query?.totalCirculatingSupply,
          "Contract instance does not support query.totalCirculatingSupply",
        );
        return nftContract.query.totalCirculatingSupply();
      }
      invariant(
        nftContract.query?.totalCirculatingSupply,
        "Contract instance does not support query.getTotalCount",
      );
      invariant(tokenId, "No tokenId provided");
      return nftContract.query.totalCirculatingSupply(tokenId);
    },
    {
      enabled: !!nftContract,
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
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: totalCount, isLoading, error } = useTotalCount(nftDrop);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalCount, isLoading, error } = useTotalCount(contract?.nft);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total number of tokens in the contract
 * @beta
 */
export function useTotalCount(contract: RequiredParam<NFTContractInput>) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.totalCount(contractAddress),
    () => {
      invariant(nftContract, "No Contract instance provided");
      if (nftContract instanceof Erc721) {
        invariant(
          nftContract?.query?.totalCirculatingSupply,
          "Contract instance does not support query.totalCirculatingSupply",
        );
        return nftContract.query.totalCirculatingSupply();
      }
      invariant(
        nftContract.query?.totalCount,
        "Contract instance does not support query.totalCount",
      );
      return nftContract.query.totalCount();
    },
    {
      enabled: !!nftContract,
    },
  );
}

/**
 * Use this to get a the owned NFTs for a specific {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(nftDrop, <OwnerWalletAddress>);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract?.nft, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 */
export function useOwnedNFTs<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress),
    async () => {
      invariant(nftContract, "No Contract instance provided");
      if (nftContract instanceof Erc721) {
        invariant(
          nftContract.query?.owned?.all,
          "Contract instance does not support query.owned.all",
        );
        return convertResponseToNFTTypeArray(
          nftContract,
          await nftContract.query.owned.all(ownerWalletAddress),
        );
      }
      invariant(
        nftContract.query?.owned,
        "Contract instance does not support query.owned",
      );
      return convertResponseToNFTTypeArray(
        nftContract,
        await nftContract.query.owned(ownerWalletAddress),
      );
    },
    {
      enabled: !!nftContract && !!ownerWalletAddress,
    },
  );
}

/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 *  @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(nftDrop, <OwnerWalletAddress>);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(contract?.nft, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @beta
 */
export function useNFTBalance<TContract extends NFTContract>(
  ...[contract, ownerWalletAddress, tokenId]: useNFTBalanceParams<TContract>
) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.balanceOf(
      contractAddress,
      ownerWalletAddress,
      tokenId,
    ),
    () => {
      invariant(nftContract, "No Contract instance provided");
      invariant(
        nftContract.balanceOf,
        "Contract instance does not support balanceOf",
      );
      invariant(ownerWalletAddress, "No owner wallet address provided");
      if (nftContract instanceof Erc1155) {
        invariant(tokenId, "No tokenId provided");
        return nftContract.balanceOf(ownerWalletAddress, tokenId);
      }
      return nftContract.balanceOf(ownerWalletAddress);
    },
    {
      enabled: !!nftContract && !!ownerWalletAddress,
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
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useMintNFT(contract: RequiredParam<NFTContractInput>) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  const activeChainId = useActiveChainId();

  const queryClient = useQueryClient();

  return useMutation(
    async (data: MintNFTParams<typeof nftContract>) => {
      invariant(data.to, 'No "to" address provided');
      invariant(nftContract?.mint?.to, "contract does not support mint.to");
      if (nftContract instanceof Erc1155) {
        invariant("supply" in data, "supply not provided");
        const { to, metadata, supply } = data;
        return (await nftContract.mint.to(to, {
          metadata,
          supply: BigNumber.from(supply || 1),
        })) as MintNFTReturnType<typeof nftContract>;
      }
      return (await nftContract.mint.to(
        data.to,
        data.metadata,
      )) as MintNFTReturnType<typeof nftContract>;
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

/**
 * Use this to mint a new NFT on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to mint a more supply of a token id to the provided wallet
 * @beta
 */
export function useMintNFTSupply(contract: Erc1155) {
  const nftContract = getNftContract(contract);
  const contractAddress = nftContract?.getAddress();

  const activeChainId = useActiveChainId();

  const queryClient = useQueryClient();

  return useMutation(
    async (data: MintNFTSupplyParams) => {
      invariant(data.to, 'No "to" address provided');
      invariant(
        contract?.mint?.additionalSupplyTo,
        "contract does not support mint.additionalSupplyTo",
      );

      invariant("tokenId" in data, "tokenId not provided");
      invariant("additionalSupply" in data, "additionalSupply not provided");
      const { to, tokenId, additionalSupply } = data;
      return await contract.mint.additionalSupplyTo(
        to,
        tokenId,
        additionalSupply,
      );
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

/**
 * Use this to transfer tokens on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer NFT!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to transfer NFTs
 * @beta
 */
export function useTransferNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    (data: TransferNFTParams<TContract>) => {
      invariant(contract?.transfer, "contract does not support transfer");
      if (contract instanceof Erc1155) {
        invariant("amount" in data, "amount not provided");
        return contract.transfer(data.to, data.tokenId, data.amount);
      }

      return contract.transfer(data.to, data.tokenId);
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

/**
 * Use this to transfer tokens on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const editionDrop = useEditionDrop(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(editionDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to transfer batch NFTs
 * @beta
 */
export function useAirdropNFT(contract: Erc1155) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    ({ tokenId, addresses }: AirdropNFTParams) => {
      invariant(contract?.airdrop, "contract does not support airdrop");

      return contract.airdrop(tokenId, addresses);
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

/** **********************/
/**     WRITE HOOKS     **/
/** **********************/

/**
 * Use this to burn an NFT on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(contract?.nft);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to burn an NFT token from the connected wallet
 * @beta
 */
export function useBurnNFT<TContract extends NFTContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: BurnNFTParams<TContract>) => {
      invariant(data.tokenId, "No tokenId provided");
      invariant(contract?.burn, "contract does not support burn");
      if (contract instanceof Erc1155) {
        invariant("amount" in data, "amount not provided");
        const { tokenId, amount } = data;
        return await contract.burn.tokens(tokenId, amount);
      }
      const { tokenId } = data;
      return await contract.burn.token(tokenId);
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
