import { Pack } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function usePackModule(moduleAddress?: string): Pack | undefined {
  return useContract("pack", moduleAddress);
}
