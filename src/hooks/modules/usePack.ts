import { Pack } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function usePack(moduleAddress?: string): Pack | undefined {
  return useContract("pack", moduleAddress);
}
