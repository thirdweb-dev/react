import type {
  Erc721,
  Erc721Mintable,
  Erc1155,
  Erc1155Mintable,
  NFTMetadata,
} from "@thirdweb-dev/sdk";
import type { NFTMetadataOrUri } from "@thirdweb-dev/sdk/dist/src/schema";
import type { BigNumberish } from "ethers";

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
 * A contract address.
 * @beta
 */
export type ContractAddress = string;

/**
 * The parameters to pass to the nft mint function.
 *
 * @beta
 */
export type TokenMintParams = {
  to: WalletAddress;
  amount: string | number;
};

// NFTS //

/**
 * The possible NFT contract types.
 * @beta
 */
export type NFTContract = Erc721 | Erc1155;

/**
 * A single NFT token
 * @beta
 */
export type NFT<TContract extends NFTContract> = {
  /**
   * The actual metadata of the NFT (name, image, etc)
   */
  metadata: NFTMetadata;
  /**
   * The owner of the nft (this will be an empty string for ERC1155 tokens)
   */
  owner: string;
  /**
   * The type of the NFT (ERC721 or ERC1155)
   */
  type: TContract extends Erc721 ? "ERC721" : "ERC1155";
  /**
   * The total supply of the NFT (this will *always* be 1 for ERC721 tokens)
   */
  supply: TContract extends Erc721 ? 1 : number;

  [key: string]: unknown;
};

/**
 * The params to pass to `useNftBalance`.
 * @beta
 */
export type useNFTBalanceParams<TContract> = TContract extends Erc1155
  ? [
      contract: RequiredParam<TContract>,
      ownerWalletAddress: RequiredParam<WalletAddress>,
      tokenId: RequiredParam<BigNumberish>,
    ]
  : [
      contract: RequiredParam<TContract>,
      ownerWalletAddress: RequiredParam<WalletAddress>,
    ];

/**
 * The params for the {@link useMintNFT} hook mutation.
 *
 * @beta
 */
export type MintNFTParams<TContract extends NFTContract> =
  TContract extends Erc1155
    ? { metadata: NFTMetadataOrUri; supply: BigNumberish; to: WalletAddress }
    : { metadata: NFTMetadataOrUri; supply: BigNumberish; to: WalletAddress };

/**
 * The return type of the {@link useMintNFT} hook.
 *
 * @beta
 */
export type MintNFTReturnType<TContract> = TContract extends Erc721
  ? Awaited<ReturnType<Erc721Mintable["to"]>>
  : TContract extends Erc1155
  ? Awaited<ReturnType<Erc1155Mintable["to"]>>
  : never;
