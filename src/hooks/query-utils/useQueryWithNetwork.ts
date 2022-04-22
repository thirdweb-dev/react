import { useActiveChainId } from "../../Provider";
import { createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useCallback } from "react";
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

/** @internal */
export function useQueryWithNetwork<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<TData, TError> {
  const activeChainId = useActiveChainId();

  const mergedOptions: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  > = {
    ...options,
    enabled: !!(activeChainId && options?.enabled),
  };

  return useQuery(
    createCacheKeyWithNetwork(queryKey, activeChainId) as TQueryKey,
    queryFn,
    mergedOptions,
  );
}

/** @internal */
export function useMutationWithInvalidate<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "onSuccess"
  > & {
    onSuccess?: (
      data: TData,
      variables: TVariables,
      context: TContext | undefined,
      wrapCacheKeys: (cacheKeysToInvalidate: TQueryKey[]) => Promise<void[]>,
    ) => Promise<unknown> | void;
  },
) {
  const activeChainId = useActiveChainId();
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    (cacheKeysToInvalidate: TQueryKey[]) => {
      return Promise.all(
        cacheKeysToInvalidate.map((cacheKey) => {
          return queryClient.invalidateQueries(
            createCacheKeyWithNetwork(cacheKey, activeChainId) as TQueryKey,
          );
        }),
      );
    },
    [queryClient, activeChainId],
  );

  return useMutation(mutationFn, {
    ...options,
    onSuccess: (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args, invalidate);
      }
    },
  });
}
