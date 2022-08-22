import { useActiveChainId } from "../../Provider";
import { RequiredParam } from "../../types";
import {
  createCacheKeyWithNetwork,
  createContractCacheKey,
  invalidateContractAndBalances,
} from "../../utils/cache-keys";
import { useContract as useOldContract } from "../async/contracts";
import {
  useQueryClient,
  useMutation as useReactQueryMutation,
  useQuery as useReactQueryQuery,
} from "@tanstack/react-query";

type PossibleContract = ReturnType<typeof useOldContract>["contract"];

function createCacheKey(
  chainId: RequiredParam<number>,
  contract: PossibleContract,
  fnName: string,
) {
  return createCacheKeyWithNetwork(
    createContractCacheKey(contract?.getAddress(), [fnName]),
    chainId,
  );
}

const createQueryHook = (contract: PossibleContract) => {
  return <TFn extends () => any | Promise<any>>(fn?: TFn) => {
    const activeChainId = useActiveChainId();
    // stable ID to use for the query if the function name is not available

    return useReactQueryQuery<Awaited<ReturnType<TFn>>>(
      // build the query key
      createCacheKey(
        activeChainId,
        contract,
        fn?.toString() || "__unknown_function__",
      ),
      // call the function with the params
      async () => {
        if (fn) {
          try {
            const res = await fn.bind(fn)();
            console.log("*** res", res);
            return res;
          } catch (err) {
            console.error("*** err", err);
          }
        }
        return "n_fn";
      },
    );
  };
};

const createMutationHook = (contract: PossibleContract) => {
  return <TFn extends (...args: any) => any | Promise<any>>(fn?: TFn) => {
    const queryClient = useQueryClient();
    const activeChainId = useActiveChainId();
    return useReactQueryMutation<
      Awaited<ReturnType<TFn>>,
      unknown,
      Parameters<TFn>
    >(
      // call the function with  the params
      async (params) => (fn ? await fn.call(contract, ...params) : undefined),
      {
        onSettled: () => {
          invalidateContractAndBalances(
            queryClient,
            contract?.getAddress(),
            activeChainId,
          );
        },
      },
    );
  };
};

/**
 *
 * @param address - The address of the contract to use
 * @returns
 * @beta
 */
export function experimental_useContract(address: string) {
  const contract = useOldContract(address).contract;

  return {
    contract,
    useQuery: createQueryHook(contract),
    useMutation: createMutationHook(contract),
  };
}
