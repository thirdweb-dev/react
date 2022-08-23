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

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? "0" extends keyof T // tuples have string keys, return undefined if K is not in tuple
    ? undefined
    : number extends keyof T
    ? T[number]
    : undefined
  : undefined;

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<
          | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
          | Extract<T[FieldKey], undefined>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ?
        | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
        | Extract<T[FieldKey], undefined>
    : undefined
  : undefined;

type FnType = (...args: any) => {};
type NestedKeyOf<ObjectType extends object> = ObjectType extends null
  ? undefined
  : {
      [Key in keyof ObjectType & string]: ObjectType[Key] extends FnType
        ? `${Key}`
        : ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : never;
    }[keyof ObjectType & string];

function createReadHook<TContract extends SmartContract | null>(
  contract: TContract,
) {
  return function <
    TFnName extends NestedKeyOf<TContract extends null ? {} : TContract>,
    TParams extends FnType = TContract extends null
      ? never
      : TFnName extends undefined
      ? never
      : GetFieldType<TContract, TFnName> extends undefined
      ? never
      : GetFieldType<TContract, TFnName>,
  >(fn: TFnName, ...params: Parameters<TParams>) {
    const activeChainId = useActiveChainId();

    return useQuery(
      createCacheKeyWithNetwork(
        createContractCacheKey(contract?.getAddress(), [fn, params]),
        activeChainId,
      ),
      async () => {
        invariant(contract, "Contract is not defined");
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

const { contract, useRead } = experimental_useContract("foo");

const d = useRead("getAddress");

type T = SmartContract["estimator"] extends FnType ? true : false;
