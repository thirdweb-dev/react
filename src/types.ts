import {
  EditionMetadataOrUri,
  NFTMetadataOrUri,
} from "@thirdweb-dev/sdk/dist/src/schema";

/**
 * Makes a parameter required to be passed, but still allowes it to be undefined.
 *
 * @beta
 */
export type RequiredParam<T> = T | undefined;

/**
 * A wallet address.
 * @beta
 */
export type WalletAddress = string;

/**
 * The parameters to pass to the nft mint function.
 *
 * @beta
 */
export type NFTMintParams = {
  to: WalletAddress;
  metadata: NFTMetadataOrUri;
};

/**
 * The parameters to pass to the edition mint function.
 *
 * @beta
 */
export type EditionMintParams = {
  to: WalletAddress;
} & EditionMetadataOrUri;

/**
 * The parameters to pass to the nft mint function.
 *
 * @beta
 */
export type TokenMintParams = {
  to: WalletAddress;
  amount: string | number;
};
