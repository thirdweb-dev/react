import { RequiredParam, UseContractReturnType } from "../types";
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";

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

export type NFTContractInput = NFTContract | UseContractReturnType;

export function getErc721<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
) {
  if (contract instanceof Erc721) {
    return contract;
  }
  if (contract && "nft" in contract && contract.nft instanceof Erc721) {
    return contract.nft;
  }
  return undefined;
}

export function getErc1155<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
) {
  if (contract instanceof Erc1155) {
    return contract;
  }
  if (
    contract &&
    "edition" in contract &&
    contract.edition instanceof Erc1155
  ) {
    return contract.edition;
  }
  return undefined;
}

export function getNftContract<TContract extends NFTContractInput>(
  contract: RequiredParam<TContract>,
) {
  return getErc1155(contract) || getErc721(contract);
}
