import { useContract } from "./useContract";
import { Edition } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of an `Edition` contract. This contract is used to interface with ERC1155 compliant NFTs.
 * @param contractAddress - the address of the Edition contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useEdition } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const edition = useEdition("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the edition contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useEdition(contractAddress?: string): Edition | undefined {
  return useContract("edition", contractAddress);
}
