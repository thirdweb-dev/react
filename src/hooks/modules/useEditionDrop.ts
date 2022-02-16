import { EditionDrop } from "@thirdweb-dev/sdk";
import { useContract } from "./useContract";

export function useEditionDrop(moduleAddress: string) {
  return useContract("edition-drop", moduleAddress) as EditionDrop;
}
