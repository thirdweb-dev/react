import { useSDK } from "../../providers/thirdweb-sdk";
import { createCacheKeyWithNetwork } from "../../query-cache/cache-keys";
import { RequiredParam } from "../../types/types";
import { ChainIdOrName, toChainId } from "@thirdweb-dev/sdk/dist/browser";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";

/** @internal */
export function useQueryWithNetwork<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  chain: RequiredParam<ChainIdOrName>,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> {
  const sdk = useSDK();

  const activeChainId = chain
    ? toChainId(chain)
    : sdk?.getConnectionInfo().chainId;

  const mergedOptions: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  > = {
    ...options,
    enabled: !!(activeChainId && options?.enabled),
  };

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    createCacheKeyWithNetwork(queryKey, activeChainId) as TQueryKey,
    queryFn,
    mergedOptions,
  );
}
