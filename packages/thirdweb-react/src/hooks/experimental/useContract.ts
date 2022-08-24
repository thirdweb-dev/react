import { useActiveChainId } from "../../Provider";
import { ContractAddress, RequiredParam } from "../../types";
import {
  createCacheKeyWithNetwork,
  createContractCacheKey,
} from "../../utils/cache-keys";
import { useContract } from "../async/contracts";
import { useQuery } from "@tanstack/react-query";
import { SmartContract } from "@thirdweb-dev/sdk";
import invariant from "tiny-invariant";

function createReadHook<TContract extends SmartContract | null>(
  contract: TContract,
) {
  return function <TCallback extends (contract: TContract) => any>(
    callback: TCallback,
  ) {
    const activeChainId = useActiveChainId();

    console.dir(callback.toString());

    return useQuery<Awaited<ReturnType<TCallback>>>(
      createCacheKeyWithNetwork(
        createContractCacheKey(contract?.getAddress(), [callback.toString()]),
        activeChainId,
      ),
      () => {
        invariant(contract, "Contract is not defined");
        return callback(contract);
      },
    );
  };
}

export function experimental_useContract(
  contractAddress: RequiredParam<ContractAddress>,
) {
  const { contract } = useContract(contractAddress);

  return {
    contract,
    useRead: createReadHook(contract),
  };
}
