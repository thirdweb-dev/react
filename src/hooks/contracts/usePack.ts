import { useContract } from "./useContract";
import { Pack } from "@thirdweb-dev/sdk";

/**
 * Hook for getting an instance of a `Pack` contract. This contract supports the creation of on-chain luck-based lootboxes.
 * @param contractAddress - the address of the Pack contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { usePack } from '@thirdweb/react-hooks'
 *
 * const App = () => {
 *   const pack = usePack("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the pack contract in the rest of the component
 *
 *   ...
 * }
 * ```
 * @public
 */
export function usePack(contractAddress?: string): Pack | undefined {
  return useContract("pack", contractAddress);
}
