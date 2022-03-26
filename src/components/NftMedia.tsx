import { useDesiredChainId } from "../Provider";
import { useUnstableCustomContract } from "../hooks/contracts/useCustomContract";
import { MediaRenderer, SharedMediaProps } from "./MediaRenderer";
import { BigNumberish } from "@ethersproject/bignumber";
import { NFTMetadata, NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React from "react";
import useSWRImmutable from "swr/immutable";

export interface NftMediaProps extends SharedMediaProps {
  contractAddress: string;
  tokenId: BigNumberish;
}

/**
 * @internal
 */
export const Unstable_NftMedia = React.forwardRef<
  HTMLMediaElement,
  NftMediaProps
>(({ children, contractAddress, tokenId, ...restProps }, ref) => {
  const tokenMetadata = useNftTokenMetadata(contractAddress, tokenId);
  return (
    <MediaRenderer
      src={
        tokenMetadata.data?.metadata.animation_url ||
        tokenMetadata.data?.metadata?.image
      }
      poster={tokenMetadata.data?.metadata.image}
      alt={tokenMetadata.data?.metadata?.name}
      ref={ref}
      {...restProps}
    />
  );
});

/**
 *
 * @param contractAddress - the contract address of the NFT contract
 * @param tokenId - the tokenId of the nft
 * @returns the metadata of the nft
 * @internal
 */
export function useNftTokenMetadata(
  contractAddress: string,
  tokenId: BigNumberish,
) {
  const desiredChainId = useDesiredChainId();

  const contract = useUnstableCustomContract(contractAddress, desiredChainId);

  return useSWRImmutable(
    contract.data
      ? `token-metadata.${desiredChainId}.${contractAddress}.${tokenId}`
      : "token-medata.loading",
    () =>
      contract.data && "get" in contract.data
        ? (contract.data.get(tokenId) as unknown as NFTMetadataOwner)
        : undefined,
    {
      isPaused: () => !contract.data || !("get" in contract.data),
    },
  );
}

/**
 * The props for the {@link ThirdwebNftMedia} component.
 */
export interface ThirdwebNftMediaProps extends SharedMediaProps {
  /**
   * The NFT metadata of the NFT returned by the thirdweb sdk.
   */
  metadata: NFTMetadata;
}

/**
 * Render a nft based on the common metadata returned by the thirdweb sdk.
 */
export const ThirdwebNftMedia = React.forwardRef<
  HTMLMediaElement,
  ThirdwebNftMediaProps
>(({ metadata, ...props }, ref) => {
  return (
    <MediaRenderer
      src={metadata.animation_url || metadata.image}
      poster={metadata.image}
      alt={metadata.name}
      ref={ref}
      {...props}
    />
  );
});
