import { useContract } from "./useContract";
import { EditionDrop } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of an `EditionDrop` contract. This conract is used to interface with ERC1155 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the Edition Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useEditionDrop } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const edition = useEditionDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the edition drop contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useEditionDrop(
  contractAddress?: string,
): EditionDrop | undefined {
  return useContract("edition-drop", contractAddress);
}
