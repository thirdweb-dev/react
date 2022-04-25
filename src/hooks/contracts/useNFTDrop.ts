import { useContract } from "./useContract";
import { NFTDrop } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of an `NFTDrop` contract. This contract is meant to interface with ERC721 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useNFTDrop } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const nftDrop = useNFTDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the nft drop contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useNFTDrop(contractAddress?: string): NFTDrop | undefined {
  return useContract("nft-drop", contractAddress);
}
