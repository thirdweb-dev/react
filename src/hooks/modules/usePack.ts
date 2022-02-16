import { Pack } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function usePackModule(moduleAddress: string) {
  return useContract("pack", moduleAddress) as Pack;
}
