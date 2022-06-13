import { MediaRenderer, SharedMediaProps } from "./MediaRenderer";
import { NFTMetadata } from "@thirdweb-dev/sdk/dist/browser";
import React from "react";

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
