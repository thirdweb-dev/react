import { useSDK } from "../../providers/thirdweb-sdk";
import {
  cacheKeys,
  createCacheKeyWithNetwork,
  invalidateContractAndBalances,
} from "../../query-cache/cache-keys";
import {
  ContractAddress,
  ExposedQueryOptions,
  RequiredParam,
} from "../../types/types";
import { useQueryWithNetwork } from "../utils/useQueryWithNetwork";
import {
  CONTRACTS_MAP,
  ChainIdOrName,
  ContractEvent,
  EventQueryFilter,
  SmartContract,
  ThirdwebSDK,
} from "@thirdweb-dev/sdk";
import type {
  CustomContractMetadata,
  PublishedMetadata,
} from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { CallOverrides } from "ethers";
import { useEffect, useMemo } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import invariant from "tiny-invariant";

async function fetchContractType(
  contractAddress: RequiredParam<string>,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!contractAddress || !sdk) {
    return;
  }
  try {
    return await sdk.resolveContractType(contractAddress);
  } catch (err) {
    // expected error, return custom type instead
    return "custom" as const;
  }
}

async function fetchContractPublishMetadata(
  contractAddress: RequiredParam<string>,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!contractAddress || !sdk) {
    return;
  }

  return await sdk
    .getPublisher()
    .fetchContractMetadataFromAddress(contractAddress);
}
async function fetchContractTypeAndPublishMetadata(
  queryClient: QueryClient,
  contractAddress?: string,
  sdk?: ThirdwebSDK,
) {
  if (!contractAddress || !sdk) {
    return;
  }
  const contractType = await queryClient.fetchQuery(
    cacheKeys.contract.type(contractAddress),
    () => fetchContractType(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  if (contractType !== "custom") {
    return {
      contractType,
      publishMetadata: null,
    };
  }
  const publishMetadata = await queryClient.fetchQuery(
    cacheKeys.contract.publishMetadata(contractAddress),

    () => fetchContractPublishMetadata(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  return {
    contractType,
    publishMetadata,
  };
}

function getContractAbi(
  input: RequiredParam<
    Awaited<ReturnType<typeof fetchContractTypeAndPublishMetadata>>
  >,
) {
  if (!input || !input.contractType) {
    return null;
  }
  let contractAbi: PublishedMetadata["abi"] | null = null;
  if (input.contractType !== "custom") {
    contractAbi = CONTRACTS_MAP[input.contractType].contractAbi;
  }
  if (input.contractType === "custom" && input.publishMetadata) {
    contractAbi = input.publishMetadata?.abi;
  }

  return contractAbi;
}

function getContractFromCombinedTypeAndPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
  input: RequiredParam<
    Awaited<ReturnType<typeof fetchContractTypeAndPublishMetadata>>
  >,
  sdk: RequiredParam<ThirdwebSDK>,
) {
  if (!input || !sdk || !contractAddress || !input.contractType) {
    return undefined;
  }

  const contractAbi = getContractAbi(input);

  invariant(
    contractAbi,
    `could not resolve any ABI for contract${contractAddress}`,
  );
  return sdk.getContractFromAbi(contractAddress, contractAbi);
}

/**
 *
 * @internal
 *
 * @param contractAddress - contract address
 * @returns the contract abi
 */
export function useContractAbi(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();

  const contractTypeAndPublishMetadata = useContractTypeAndPublishMetadata(
    contractAddress,
    chain,
    queryOptions,
  );

  if (
    !contractAddress ||
    !sdk ||
    !contractTypeAndPublishMetadata.data?.contractType
  ) {
    return {
      ...contractTypeAndPublishMetadata,
      abi: undefined,
    };
  }

  const abi = getContractAbi(contractTypeAndPublishMetadata.data);
  return { ...contractTypeAndPublishMetadata, abi };
}

/**
 * Use this to get the contract type for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractType, isLoading, error } = useContractType("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract type of the contract
 * @beta
 */
export function useContractType(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.type(contractAddress),
    chain,
    () => fetchContractType(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
      ...queryOptions,
    },
  );
}

/**
 * Use this to get the publish metadata for a deployed contract.
 *
 * @example
 * ```javascript
 * const { data: publishMetadata, isLoading, error } = useContractPublishMetadata("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the published metadata (name, abi, bytecode) of the contract
 * @beta
 */
export function useContractPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.publishMetadata(contractAddress),
    chain,
    () => fetchContractPublishMetadata(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
      ...queryOptions,
    },
  );
}

/**
 * @internal
 */
function useContractTypeAndPublishMetadata(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();

  return useQueryWithNetwork(
    cacheKeys.contract.typeAndPublishMetadata(contractAddress),
    chain,
    () =>
      fetchContractTypeAndPublishMetadata(queryClient, contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // combination of type and publish metadata is immutable
      staleTime: Infinity,
      ...queryOptions,
    },
  );
}

/**
 * Use this resolve a contract address to a thirdweb (built-in / custom) contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useContract("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract once it is resolved
 * @beta
 */
export function useContract(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();

  const contractTypeAndPublishMetadata = useContractTypeAndPublishMetadata(
    contractAddress,
    chain,
    queryOptions,
  );

  if (
    !contractAddress ||
    !sdk ||
    !contractTypeAndPublishMetadata.data?.contractType
  ) {
    return {
      ...contractTypeAndPublishMetadata,
      contract: undefined,
    };
  }

  const contract = getContractFromCombinedTypeAndPublishMetadata(
    contractAddress,
    contractTypeAndPublishMetadata.data,
    sdk,
  );
  return { ...contractTypeAndPublishMetadata, contract };
}

/**
 * Use this to get the contract metadata for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractMetadata, isLoading, error } = useContractMetadata("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract metadata of the deployed contract
 * @beta
 */
export function useContractMetadata(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();

  return useQueryWithNetwork(
    cacheKeys.contract.metadata(contractAddress),
    chain,
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        cacheKeys.contract.typeAndPublishMetadata(contractAddress),

        () =>
          fetchContractTypeAndPublishMetadata(
            queryClient,
            contractAddress,
            sdk,
          ),
        // is immutable, so infinite stale time
        { staleTime: Infinity },
      );
      const contract = getContractFromCombinedTypeAndPublishMetadata(
        contractAddress,
        typeAndPublishMetadata,
        sdk,
      );
      invariant(contract?.metadata?.get, "contract metadata is not available");
      return (await contract.metadata.get()) as CustomContractMetadata;
    },
    {
      enabled: !!contractAddress || !!sdk,
      ...queryOptions,
    },
  );
}

/**
 @internal
 */
export function useContractFunctions(
  contractAddress: RequiredParam<ContractAddress>,
  chain?: ChainIdOrName,
  queryOptions: ExposedQueryOptions = {},
) {
  const sdk = useSDK();
  const queryClient = useQueryClient();

  return useQueryWithNetwork(
    cacheKeys.contract.extractFunctions(contractAddress),
    chain,
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        cacheKeys.contract.typeAndPublishMetadata(contractAddress),

        () =>
          fetchContractTypeAndPublishMetadata(
            queryClient,
            contractAddress,
            sdk,
          ),
        // is immutable, so infinite stale time
        { staleTime: Infinity },
      );
      const contract = getContractFromCombinedTypeAndPublishMetadata(
        contractAddress,
        typeAndPublishMetadata,
        sdk,
      );
      if (contract instanceof SmartContract) {
        return contract.publishedMetadata.extractFunctions();
      }
      return undefined;
    },
    {
      enabled: !!contractAddress || !!sdk,
      // functions are based on publish metadata (abi), so this is immutable
      staleTime: Infinity,
      ...queryOptions,
    },
  );
}

/**
 * Use this to get data from a contract read-function call.
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { data, isLoading, error } = useContractData(contract, "functionName", ...args);
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @param args - The arguments to pass to the function (if any), with optional call arguments as the last parameter
 * @returns a response object that includes the data returned by the function call
 *
 * @beta
 */
export function useContractData(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  functionName: RequiredParam<string>,
  functionArguments: unknown[] | [...unknown[], CallOverrides],
  queryOptions: ExposedQueryOptions = {},
) {
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    cacheKeys.contract.call(contractAddress, functionName, functionArguments),
    contract?.getChainId(),
    () => {
      invariant(contract, "contract must be defined");
      invariant(functionName, "function name must be provided");
      return contract.call(functionName, ...functionArguments);
    },
    {
      enabled: !!contract && !!functionName,
      ...queryOptions,
    },
  );
}

/**
 * Use this to get a function to make a write call to your contract
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { mutate: myFunction, isLoading, error } = useContractCall(contract, "myFunction");
 *
 * // the function can be called as follows:
 * // myFunction(...args)
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @returns a response object that includes the write function to call
 *
 * @beta
 */
export function useContractCall(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  functionName: RequiredParam<string>,
) {
  const queryClient = useQueryClient();

  return useMutation(
    async (...args: unknown[] | [...unknown[], CallOverrides]) => {
      invariant(contract, "contract must be defined");
      invariant(functionName, "function name must be provided");
      return contract.call(functionName, ...args);
    },
    {
      onSettled: () =>
        invalidateContractAndBalances(
          queryClient,
          contract?.getAddress(),
          contract?.getChainId(),
        ),
    },
  );
}

/**
 * Use this to query (and subscribe) to all events on a contract.
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param options - options incldues the filters ({@link QueryAllEvents}) for the query as well as if you want to subscribe to real-time updates (default: true)
 * @returns a response object that includes the contract events
 * @beta
 */
export function useAllContractEvents(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  options: { queryFilter?: EventQueryFilter; subscribe?: boolean } = {
    subscribe: true,
  },
) {
  const queryEnabled = !!contract;
  const queryClient = useQueryClient();

  const cacheKey = useMemo(
    () =>
      createCacheKeyWithNetwork(
        cacheKeys.contract.events.getAllEvents(contract?.getAddress()),
        contract?.getChainId(),
      ),
    [contract],
  );

  useEffect(() => {
    // if we're not subscribing or query is not enabled yet we can early exit
    if (!options.subscribe || !queryEnabled || !contract) {
      return;
    }

    const cleanupListener = contract.events.listenToAllEvents(
      (contractEvent) => {
        // insert new event to the front of the array (no duplicates, though)
        queryClient.setQueryData(
          cacheKey,
          (oldData: ContractEvent[] | undefined) => {
            if (!oldData) {
              return [contractEvent];
            }
            const eventIsNotAlreadyInEventsList =
              oldData.findIndex(
                (e) =>
                  e.transaction.transactionHash ===
                    contractEvent.transaction.transactionHash &&
                  e.transaction.logIndex === contractEvent.transaction.logIndex,
              ) === -1;
            if (eventIsNotAlreadyInEventsList) {
              return [contractEvent, ...oldData];
            }
            return oldData;
          },
        );
      },
    );
    // cleanup listener on unmount
    return cleanupListener;
  }, [queryEnabled, options.subscribe, cacheKey]);

  // **not** queryWithNetwork, cacheKey already includes network
  return useQuery(
    cacheKey,
    () => {
      invariant(contract, "contract must be defined");
      return contract.events.getAllEvents(options.queryFilter);
    },
    {
      enabled: queryEnabled,
      // we do not need to re-fetch if we're subscribing
      refetchOnWindowFocus: !options.subscribe,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );
}

/**
 * Use this to query (and subscribe) to a specific event on a contract.
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param options - options incldues the filters ({@link QueryAllEvents}) for the query as well as if you want to subscribe to real-time updates (default: true)
 * @returns a response object that includes the contract events
 * @beta
 */
export function useContractEvents(
  contract: RequiredParam<ReturnType<typeof useContract>["contract"]>,
  eventName: string,
  options: { queryFilter?: EventQueryFilter; subscribe?: boolean } = {
    subscribe: true,
  },
) {
  const queryEnabled = !!contract && !!eventName;
  const queryClient = useQueryClient();

  const cacheKey = useMemo(
    () =>
      createCacheKeyWithNetwork(
        cacheKeys.contract.events.getAllEvents(contract?.getAddress()),
        contract?.getChainId(),
      ),
    [contract],
  );

  useEffect(() => {
    // if we're not subscribing or query is not enabled yet we can early exit
    if (!options.subscribe || !queryEnabled || !contract || !eventName) {
      return;
    }

    const cleanupListener = contract.events.listenToAllEvents(
      (contractEvent) => {
        // insert new event to the front of the array (no duplicates, though)
        queryClient.setQueryData(
          cacheKey,
          (oldData: ContractEvent[] | undefined) => {
            if (!oldData) {
              return [contractEvent];
            }
            const eventIsNotAlreadyInEventsList =
              oldData.findIndex(
                (e) =>
                  e.transaction.transactionHash ===
                    contractEvent.transaction.transactionHash &&
                  e.transaction.logIndex === contractEvent.transaction.logIndex,
              ) === -1;
            if (eventIsNotAlreadyInEventsList) {
              return [contractEvent, ...oldData];
            }
            return oldData;
          },
        );
      },
    );
    // cleanup listener on unmount
    return cleanupListener;
  }, [queryEnabled, options.subscribe, cacheKey, eventName]);

  // **not** queryWithNetwork, cacheKey already includes network
  return useQuery(
    cacheKey,
    () => {
      invariant(contract, "contract must be defined");
      return contract.events.getEvents(eventName, options.queryFilter);
    },
    {
      enabled: queryEnabled,
      // we do not need to re-fetch if we're subscribing
      refetchOnWindowFocus: !options.subscribe,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  );
}
