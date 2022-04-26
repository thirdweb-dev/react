import { useActiveChainId, useSDK } from "../../Provider";
import { cacheKeys, createCacheKeyWithNetwork } from "../../utils/cache-keys";
import { useQueryWithNetwork } from "../query-utils/useQueryWithNetwork";
import { CustomContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { QueryClient, useQueryClient } from "react-query";

async function fetchContractType(contractAddress?: string, sdk?: ThirdwebSDK) {
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
  contractAddress?: string,
  sdk?: ThirdwebSDK,
) {
  if (!contractAddress || !sdk) {
    return;
  }
  try {
    return await sdk.publisher.fetchContractMetadataFromAddress(
      contractAddress,
    );
  } catch (err) {
    console.info("failed to load contract publish metadata", err);
    return null;
  }
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
    createCacheKeyWithNetwork(
      cacheKeys.contract.type(contractAddress),
      (sdk as any)._chainId,
    ),
    () => fetchContractType(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  if (contractType !== "custom") {
    return {
      contractType,
      pubishMetadata: null,
    };
  }
  const pubishMetadata = await queryClient.fetchQuery(
    createCacheKeyWithNetwork(
      cacheKeys.contract.publishMetadata(contractAddress),
      (sdk as any)._chainId,
    ),
    () => fetchContractPublishMetadata(contractAddress, sdk),
    // is immutable, so infinite stale time
    { staleTime: Infinity },
  );
  return {
    contractType,
    pubishMetadata,
  };
}
function getContractFromCombinedTypeAndPublishMetadata(
  contractAddress?: string,
  input?: Awaited<ReturnType<typeof fetchContractTypeAndPublishMetadata>>,
  sdk?: ThirdwebSDK,
) {
  if (!input || !sdk || !contractAddress || !input.contractType) {
    return null;
  }

  if (input.contractType !== "custom") {
    return sdk.getContract(contractAddress, input.contractType);
  }
  if (input.contractType === "custom" && input.pubishMetadata) {
    return sdk.getCustomContractFromAbi(
      contractAddress,
      input.pubishMetadata.abi,
    );
  }
  return null;
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
export function useContractType(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.type(contractAddress),
    () => fetchContractType(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
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
export function useContractPublishMetadata(contractAddress?: string) {
  const sdk = useSDK();
  return useQueryWithNetwork(
    cacheKeys.contract.publishMetadata(contractAddress),
    () => fetchContractPublishMetadata(contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // never stale, a contract's publish metadata is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * @internal
 */
function useContractTypeAndPublishMetadata(contractAddress?: string) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  return useQueryWithNetwork(
    cacheKeys.contract.typeAndPublishMetadata(contractAddress),
    () =>
      fetchContractTypeAndPublishMetadata(queryClient, contractAddress, sdk),
    {
      enabled: !!sdk && !!contractAddress,
      // combination of type and publish metadata is immutable
      staleTime: Infinity,
    },
  );
}

/**
 * Use this resolve a contract address to a thirdweb (built-in / custom) contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useCustomContract("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract once it is resolved
 * @beta
 */
export function useCustomContract(contractAddress?: string) {
  const sdk = useSDK();

  const contractTypeAndPublishMetadata =
    useContractTypeAndPublishMetadata(contractAddress);

  if (
    !contractAddress ||
    !sdk ||
    !contractTypeAndPublishMetadata.data?.contractType
  ) {
    return null;
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
export function useContractMetadata(contractAddress?: string) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  const activeChainId = useActiveChainId();
  return useQueryWithNetwork(
    cacheKeys.contract.metadata(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        createCacheKeyWithNetwork(
          cacheKeys.contract.typeAndPublishMetadata(contractAddress),
          activeChainId,
        ),
        () =>
          fetchContractTypeAndPublishMetadata(
            queryClient,
            contractAddress,
            sdk,
          ),
        // is immutable, so infinite stale time
        { staleTime: Infinity },
      );
      return getContractFromCombinedTypeAndPublishMetadata(
        contractAddress,
        typeAndPublishMetadata,
        sdk,
      )?.metadata.get();
    },
    {
      enabled: !!contractAddress || !!sdk,
    },
  );
}

/**
 @internal
 */
export function useContractFunctions(contractAddress?: string) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  const activeChainId = useActiveChainId();
  return useQueryWithNetwork(
    cacheKeys.contract.extractFunctions(contractAddress),
    async () => {
      const typeAndPublishMetadata = await queryClient.fetchQuery(
        createCacheKeyWithNetwork(
          cacheKeys.contract.typeAndPublishMetadata(contractAddress),
          activeChainId,
        ),
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
      if (contract instanceof CustomContract) {
        return contract.publishedMetadata.extractFunctions();
      }
      return null;
    },
    {
      enabled: !!contractAddress || !!sdk,
      // functions are based on publish metadata (abi), so this is immutable
      staleTime: Infinity,
    },
  );
}
