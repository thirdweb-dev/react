import { SmartContract } from "@thirdweb-dev/sdk";

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

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : ObjectType[Key] extends (...args: any) => any
    ? `${Key}`
    : never;
}[keyof ObjectType & string];

export function getValue<
  TData,
  TPath extends NestedKeyOf<TData>,
  TDefault = GetFieldType<TData, TPath>,
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault,
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<GetFieldType<TData, TPath>>(
      (val, key) => (val as any)?.[key],
      data as any,
    );

  return value !== undefined ? value : (defaultValue as TDefault);
}

function useQuery<
  TContract extends SmartContract,
  TPath extends NestedKeyOf<TContract>,
>(contract: TContract, path: TPath) {
  const fn = getValue(contract, path);
  if (typeof fn === "function") {
    const res = fn();
    return res;
  }
  return undefined as never;
  // return fn;
  // return undefined;
}

const contract = null as unknown as SmartContract;

const query = useQuery(contract, "metadata.get");
