import type {
  Amount,
  EditionDrop,
  Erc721,
  Erc721Mintable,
  Erc1155,
  Erc1155Mintable,
  ListingType,
  NFTDrop,
  NFTMetadata,
  Price,
} from "@thirdweb-dev/sdk/dist/browser";
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
 * @example
 * ```javascript
 * const nftDrop = useNFTDrop(<ContractAddress>);
 * ```
 * @example
 * ```javascript
 * const editionDrop = useEditionDrop(<ContractAddress>);
 * ```
 * @example
 * ```javascript
 * const nftCollection = useNFTCollection(<ContractAddress>);
 * ```
 * @example
 * ```javascript
 * const edition = useEdition(<ContractAddress>);
 * ```
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const nftContract = contract?.nft;
 * ```
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
 * The params to pass to `useTotalCirculatingSupply`.
 * @beta
 */
export type useTotalCirculatingSupplyParams<TContract> =
  TContract extends Erc1155
    ? [contract: RequiredParam<TContract>, tokenId: BigNumberish]
    : [contract: RequiredParam<TContract>];

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
    : { metadata: NFTMetadataOrUri; to: WalletAddress };

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

// DROPS //

/**
 * The possible DROP contract types.
 * @beta
 */
export type DropContract = NFTDrop | EditionDrop;

/**
 * The params for the {@link useClaimNFT} hook mutation.
 *
 * @beta
 */
export type ClaimNFTParams<TContract extends DropContract> =
  TContract extends Erc1155
    ? {
        to: WalletAddress;
        tokenId: BigNumberish;
        quantity: BigNumberish;
        checkERC20Allowance?: boolean;
      }
    : {
        to: WalletAddress;
        quantity: BigNumberish;
        checkERC20Allowance?: boolean;
      };

/**
 * The return type of the {@link useClaimNFT} hook.
 *
 * @beta
 */
export type ClaimNFTReturnType<TContract extends DropContract> =
  TContract extends Erc721
    ? Awaited<ReturnType<TContract["claimTo"]>>
    : TContract extends Erc1155
    ? Awaited<ReturnType<TContract["claimTo"]>>
    : never;

// MARKETPLACE //

export type MakeBidParams = { listingId: BigNumberish; bid: Price };

export type BuyNowParams<TListingType = ListingType> =
  TListingType extends ListingType.Direct
    ? {
        id: BigNumberish;
        type: ListingType.Direct;
        buyAmount: BigNumberish;
        buyForWallet?: WalletAddress;
      }
    : {
        id: BigNumberish;
        type: ListingType.Auction;
      };

// TOKEN DROP //

export type ClaimTokenParams = {
  to: WalletAddress;
  amount: Amount;
  checkERC20Allowance?: boolean;
};
