import { useActiveChainId } from "../../Provider";
import {
  ClaimNFTParams,
  ClaimNFTReturnType,
  DropContract,
  RequiredParam,
} from "../../types";
import {
  cacheKeys,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { useNFTs } from "./nft";
import { Erc1155, NFTDrop, QueryAllParams } from "@thirdweb-dev/sdk";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

/** **********************/
/**       READ HOOKS    **/
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
 * @param contract - an instace of a {@link DropContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are claimed
 * @beta
 */
export function useClaimedNFTs(
  contract: RequiredParam<DropContract>,
  queryParams?: QueryAllParams,
) {
  return useNFTs(contract, queryParams);
}
/**
 *
 * @param contract - an instace of a {@link NFTDrop}
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
 * @param contract - an instace of a {@link DropContract}
 * @returns a response object that includes the number of NFTs that are claimed
 */
export function useClaimedNFTSupply(contract: RequiredParam<DropContract>) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.nft.drop.totalClaimedSupply(contractAddress),
    () => {
      invariant(contract, "No Contract instance provided");
      if (contract instanceof Erc1155) {
        return contract.getTotalCount();
      }
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
 * Use this to mint a new NFT on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: claimNft,
 *     isLoading,
 *     error,
 *   } = useClaimNFT(DropContract);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimNft({to: "0x...", quantity: 1})}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instace of a {@link DropContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 */
export function useClaimNFT<TContract extends DropContract>(
  contract: RequiredParam<TContract>,
) {
  const activeChainId = useActiveChainId();
  const contractAddress = contract?.getAddress();
  const queryClient = useQueryClient();

  return useMutation(
    async (data: ClaimNFTParams<TContract>) => {
      invariant(data.to, 'No "to" address provided');
      invariant(contract?.claimTo, "contract does not support claimTo");
      if (contract instanceof Erc1155) {
        invariant("tokenId" in data, "tokenId not provided");
        const { to, tokenId, quantity, proofs } = data;
        return (await contract.claimTo(
          to,
          tokenId,
          quantity,
          proofs,
        )) as ClaimNFTReturnType<TContract>;
      }
      return (await contract.claimTo(
        data.to,
        data.quantity,
        data.proofs,
      )) as ClaimNFTReturnType<TContract>;
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
