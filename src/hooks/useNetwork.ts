import { useNetwork as useWagmiNetwork } from "wagmi";

/**
 * Hook for getting metadata about the network the current wallet is connected to and switching networks
 *
 * ```javascript
 * import { useNetwork } from "@thirdweb-dev/react"
 * ```
 *
 * @example
 * You can use this hook as follows:
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const {
 *     activeChain,
 *     chains,
 *     error,
 *     isLoading,
 *     pendingChainId,
 *     switchNetwork,
 *   } = useNetwork()
 *
 *   return (
 *     <>
 *       {activeChain && <div>Connected to {activeChain.name}</div>}
 *
 *       {chains.map((x) => (
 *         <button
 *           disabled={!switchNetwork || x.id === activeChain?.id}
 *           key={x.id}
 *           onClick={() => network.switchNetwork?.(x.id)}
 *         >
 *           {x.name}
 *           {isLoading && pendingChainId === x.id && ' (switching)'}
 *         </button>
 *       ))}
 *
 *       <div>{error && error.message}</div>
 *     </>
 *   )
 * }
 * ```
 *
 * This will let users switch their network to any of the available chains on clicking one of the buttons.
 *
 * It's important to note that some wallet apps do not support programmatic network switching and switchNetwork will be undefined.
 * For those situations, you can typically switch networks in the wallet app this hook will still work.
 *
 * @public
 */

export function useNetwork() {
  return useWagmiNetwork();
}
