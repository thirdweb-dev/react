import { useNetwork as useWagmiNetwork } from "wagmi";

/**
 * Hook for getting metadata about the network the current wallet is connected to and switching networks
 *
 * @example
 * ```javascript
 * import { useNetwork } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   const [
 *     {
 *       data: { chain, chains },
 *       loading,
 *       error,
 *     },
 *     switchNetwork,
 *   ] = useNetwork();
 *
 *   return (
 *     <>
 *       {loading ? (
 *         <div>Connecting...</div>
 *       ) : chain ? (
 *         <div>Connected to {chain.name}</div>
 *       ) : (
 *         ""
 *       )}
 *
 *       {chains.map((ch) => (
 *         <button
 *           disabled={!switchNetwork || ch.id === chain?.id}
 *           key={ch.id}
 *           onClick={() => {
 *             if (switchNetwork) {
 *               switchNetwork(ch.id);
 *             }
 *           }}
 *         >
 *           {ch.name}
 *         </button>
 *       ))}
 *
 *       {error && <div>{error.message}</div>}
 *     </>
 *   );
 * };
```
 *
 * It's important to note that some wallet apps do not support programmatic network switching and switchNetwork will be undefined.
 * For those situations, you can typically switch networks in the wallet app this hook will still work.
 *
 * @public
 */

export function useNetwork() {
  return useWagmiNetwork();
}
