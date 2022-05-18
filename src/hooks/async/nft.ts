import { useActiveChainId } from "../../Provider";
import { NFTMintParams, RequiredParam, WalletAddress } from "../../types";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import {
  Erc721,
  NFTDrop,
  QueryAllParams,
  SmartContract,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/**
 @internal
 */
export function detectErc721Instance(
  contract: RequiredParam<ValidContractInstance | SmartContract>,
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
 * Use this to get an individual NFT token of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: nft, isLoading, error } = useNFT(<YourERC721ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 */
export function useNFT(
  contract: RequiredParam<Erc721>,
  tokenId: RequiredParam<BigNumberish>,
) {
  const contractAddress = contract?.getAddress();

  return useQueryWithNetwork(
    cacheKeys.contract.nft.get(contractAddress, tokenId),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(contract.get, "Contract instance does not support get");
      return contract.get(BigNumber.from(tokenId || 0));
    },
    {
      enabled: !!contract && tokenId !== undefined,
    },
  );
}

/**
 * Use this to get a list of NFT tokens of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: nfts, isLoading, error } = useNFTs(<YourERC721ContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export function useNFTs(
  contract: RequiredParam<Erc721>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.all(contractAddress, queryParams),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.all,
        "Contract instance does not support query.all",
      );

      return contract.query.all(queryParams);
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
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export function useNFTSupply(contract: RequiredParam<Erc721>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.totalCirculatingSupply,
        "Contract instance does not support query.totalSupply",
      );

      return contract.query.totalCirculatingSupply();
    },
    {
      enabled: !!contract,
    },
  );
}

/**
 * Use this to get a the owned NFTs for a specific ERC721 contract and wallet address.
 *
 * @example
 * ```javascript
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(<YourERC721ContractInstance>, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 */
export function useOwnedNFTs(
  contract: RequiredParam<Erc721>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.query?.owned?.all,
        "Contract instance does not support query.owned.all",
      );
      return contract.query.owned.all(ownerWalletAddress);
    },
    {
      enabled: !!contract && !!ownerWalletAddress,
    },
  );
}

/**
 * Use this to get a the total balance of a specific ERC721 contract and wallet address.
 *
 *
 * @example
 * ```javascript
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(<YourERC721ContractInstance>, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @beta
 */
export function useNFTBalance(
  contract: RequiredParam<Erc721>,
  ownerWalletAddress: RequiredParam<WalletAddress>,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.balanceOf(contractAddress, ownerWalletAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.balanceOf,
        "Contract instance does not support balanceOf",
      );
      invariant(ownerWalletAddress, "No owner wallet address provided");
      return contract.balanceOf(ownerWalletAddress);
    },
    {
      enabled: !!contract && !!ownerWalletAddress,
    },
  );
}

/** **********************/
/**  READ HOOKS (drop)  **/
/** **********************/

/**
 * Use this to get a list of *unclaimed* NFT tokens of your ERC721 Drop contract.
 *
 * @example
 * ```javascript
 * const { data: unclaimedNfts, isLoading, error } = useUnclaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft drop, custom contract that follows the Erc721 & drop spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are unclaimed
 * @beta
 */
export function useUnclaimedNFTs(
  contract: RequiredParam<NFTDrop>,
  queryParams?: QueryAllParams,
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.drop.getAllUnclaimed(contractAddress, queryParams),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.getAllUnclaimed,
        "Contract instance does not support getAllUnclaimed",
      );
      return contract.getAllUnclaimed(queryParams);
    },
    { enabled: !!contract },
  );
}

/**
 * Use this to get a list of *claimed* (minted) NFT tokens of your ERC721 Drop contract.
 *
 * @remarks Equivalent to using {@link useNFTs}.
 *
 * @example
 * ```javascript
 * const { data: claimedNFTs, isLoading, error } = useClaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft drop, custom contract that follows the ERC721 & drop spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are claimed
 * @beta
 */
export function useClaimedNFTs(
  contract: RequiredParam<NFTDrop>,
  queryParams?: QueryAllParams,
) {
  return useNFTs(contract, queryParams);
}
/**
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft drop, custom contract that follows the ERC721 & drop spec)
 * @returns a response object that includes the number of NFTs that are unclaimed
 */
export function useUnclaimedNFTSupply(contract: RequiredParam<NFTDrop>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.drop.totalUnclaimedSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.totalUnclaimedSupply,
        "Contract instance does not support totalUnclaimedSupply",
      );
      return contract.totalUnclaimedSupply();
    },
    { enabled: !!contract },
  );
}

/**
 *
 * @param contract - an instace of a contract that extends the ERC721 spec (nft drop, custom contract that follows the ERC721 & drop spec)
 * @returns a response object that includes the number of NFTs that are claimed
 */
export function useClaimedNFTSupply(contract: RequiredParam<NFTDrop>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.drop.totalClaimedSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      invariant(
        contract.totalClaimedSupply,
        "Contract instance does not support totalClaimedSupply",
      );
      return contract.totalClaimedSupply();
    },
    { enabled: !!contract },
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
 *   } = useMintNFT(">>YourERC721ContractInstance<<");
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
 * @param contract - an instace of a contract that extends the ERC721 spec (nft collection, nft drop, custom contract that follows the ERC721 spec)
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useMintNFT(contract: RequiredParam<Erc721>) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: NFTMintParams) => {
      const { to, metadata } = data;
      invariant(to, 'No "to" address provided');
      invariant(contract?.mint?.to, "contract does not support mint.to");
      return await contract.mint.to(to, metadata);
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.nft.query.all(contractAddress),
              activeChainId,
            ),
          ),
          queryClient.invalidateQueries(
            createCacheKeyWithNetwork(
              cacheKeys.contract.nft.query.totalCirculatingSupply(
                contractAddress,
              ),
              activeChainId,
            ),
          ),
        ]);
      },
    },
  );
}
