import { Edition } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useEdition(moduleAddress: string) {
  return useContract("edition", moduleAddress) as Edition;
}
