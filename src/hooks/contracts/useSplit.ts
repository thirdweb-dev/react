import { useContract } from "./useContract";
import { Split } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of a `Split` contract. This contract supports fund distribution to multiple parties.
 * @param contractAddress - the address of the Split contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useSplit } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const split = useSplit("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the split contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function useSplit(contractAddress?: string): Split | undefined {
  return useContract("split", contractAddress);
}
