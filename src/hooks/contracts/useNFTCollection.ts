import { useContract } from "./useContract";
import { NFTCollection } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of an `NFTCollection` contract. This contract is meant to interface with ERC721 compliant NFTs.
 * @param contractAddress - the address of the NFT Collection contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useNFTCollection } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const nftCollection = useNFTCollection("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the nftCollection contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useNFTCollection(
  contractAddress?: string,
): NFTCollection | undefined {
  return useContract("nft-collection", contractAddress);
}
