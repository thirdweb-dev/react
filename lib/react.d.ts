/// <reference types="node" />

import { allChains } from './constants';
import { Balance } from './types';
import { balanceAction } from './actions';
import { BalanceActionArgs } from './actions';
import { BalanceActionResult } from './actions';
import { BaseContract } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber as BigNumber_2 } from 'ethers';
import { BigNumberish as BigNumberish_2 } from 'ethers';
import { BytesLike as BytesLike_2 } from 'ethers';
import { CallOverrides } from 'ethers';
import { chain } from './constants';
import { Chain as Chain_2 } from './types';
import { ChainId } from '@thirdweb-dev/sdk';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Connector } from './connectors';
import { ConnectorData } from './connectors';
import { ConnectorEvents } from './connectors';
import { ContractForContractType } from '@thirdweb-dev/sdk';
import { ContractTransaction } from 'ethers';
import { ContractType } from '@thirdweb-dev/sdk';
import { CustomContract } from '@thirdweb-dev/sdk';
import { defaultChains } from './constants';
import { defaultL2Chains } from './constants';
import { developmentChains } from './constants';
import { Edition } from '@thirdweb-dev/sdk';
import { EditionDrop } from '@thirdweb-dev/sdk';
import { erc1155ABI } from './constants';
import { erc20ABI } from './constants';
import { Erc721 } from '@thirdweb-dev/sdk';
import { erc721ABI } from './constants';
import { Event as Event_2 } from 'ethers';
import { EventFilter as EventFilter_2 } from 'ethers';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { InjectedConnector as InjectedConnector_2 } from './connectors';
import { IpfsStorage } from '@thirdweb-dev/sdk';
import { IStorage } from '@thirdweb-dev/sdk';
import { Marketplace } from '@thirdweb-dev/sdk';
import { NFTCollection } from '@thirdweb-dev/sdk';
import { NFTDrop } from '@thirdweb-dev/sdk';
import { NFTMetadata } from '@thirdweb-dev/sdk';
import { normalizeChainId } from './utils';
import { Overrides } from 'ethers';
import { Pack } from '@thirdweb-dev/sdk';
import { PayableOverrides } from 'ethers';
import { PopulatedTransaction } from 'ethers';
import { QueryAllParams } from '@thirdweb-dev/sdk';
import { QueryClient } from 'react-query';
import { default as React_2 } from 'react';
import * as React_3 from 'react';
import * as react_query from 'react-query';
import { SDKOptions } from '@thirdweb-dev/sdk';
import { Signer } from 'ethers';
import { Split } from '@thirdweb-dev/sdk';
import { SUPPORTED_CHAIN_ID } from '@thirdweb-dev/sdk';
import * as _thirdweb_dev_sdk from '@thirdweb-dev/sdk';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Token } from '@thirdweb-dev/sdk';
import { Unit } from './types';
import { units } from './constants';
import { useAccount } from './hooks';
import { useBalance } from './hooks';
import { useBlockNumber } from './hooks';
import { useConnect as useConnect_2 } from './hooks';
import { useContract as useContract_2 } from './hooks';
import { useContractEvent } from './hooks';
import { useContractRead } from './hooks';
import { useContractWrite } from './hooks';
import { useEnsAvatar } from './hooks';
import { useEnsLookup } from './hooks';
import { useEnsResolveName } from './hooks';
import { useEnsResolver } from './hooks';
import { useFeeData } from './hooks';
import { useNetwork } from './hooks';
import { useProvider } from './hooks';
import { useSigner as useSigner_2 } from './hooks';
import { useSignMessage } from './hooks';
import { useSignTypedData } from './hooks';
import { useToken as useToken_2 } from './hooks';
import { useTransaction } from './hooks';
import { useWaitForTransaction } from './hooks';
import { useWebSocketProvider } from './hooks';
import { utils } from 'ethers';
import { ValidContractInstance } from '@thirdweb-dev/sdk';
import { Vote } from '@thirdweb-dev/sdk';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Web3Provider } from '@ethersproject/providers';
import { WebSocketProvider } from '@ethersproject/providers';

declare type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never;

declare type AbiFunction = {
    name: string;
    inputs: TypeOf<typeof AbiTypeSchema>[];
    outputs: TypeOf<typeof AbiTypeSchema>[];
    signature: string;
};

declare const AbiSchema: ZodArray<ZodObject<{
    type: ZodString;
    name: ZodDefault<ZodString>;
    inputs: ZodDefault<ZodArray<ZodObject<{
        type: ZodString;
        name: ZodString;
    }, "strip", ZodLazy<ZodType<Json, ZodTypeDef, Json>>, {
        [x: string]: Json;
        type: string;
        name: string;
    }, {
        [x: string]: Json;
        type: string;
        name: string;
    }>, "many">>;
    outputs: ZodDefault<ZodArray<ZodObject<{
        type: ZodString;
        name: ZodString;
    }, "strip", ZodLazy<ZodType<Json, ZodTypeDef, Json>>, {
        [x: string]: Json;
        type: string;
        name: string;
    }, {
        [x: string]: Json;
        type: string;
        name: string;
    }>, "many">>;
}, "strip", ZodLazy<ZodType<Json, ZodTypeDef, Json>>, {
    [x: string]: Json;
    type: string;
    name: string;
    inputs: {
        [x: string]: Json;
        type: string;
        name: string;
    }[];
    outputs: {
        [x: string]: Json;
        type: string;
        name: string;
    }[];
}, {
    [x: string]: Json;
    name?: string | undefined;
    inputs?: {
        [x: string]: Json;
        type: string;
        name: string;
    }[] | undefined;
    outputs?: {
        [x: string]: Json;
        type: string;
        name: string;
    }[] | undefined;
    type: string;
}>, "many">;

declare const AbiTypeSchema: ZodObject<{
    type: ZodString;
    name: ZodString;
}, "strip", ZodLazy<ZodType<Json, ZodTypeDef, Json>>, {
    [x: string]: Json;
    type: string;
    name: string;
}, {
    [x: string]: Json;
    type: string;
    name: string;
}>;

declare type AccessList = Array<{
    address: string;
    storageKeys: Array<string>;
}>;

declare type AccessListish = AccessList | Array<[string, Array<string>]> | Record<string, Array<string>>;

declare class AddChainError extends Error {
    name: string;
    message: string;
}

declare type AnyZodObject = ZodObject<any, any, any>;

declare type ApprovalEvent = TypedEvent<[
string,
string,
BigNumber_2
], {
    _owner: string;
    _approved: string;
    _tokenId: BigNumber_2;
}>;

declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

declare type ApprovalForAllEvent = TypedEvent<[
string,
string,
boolean
], {
    _owner: string;
    _operator: string;
    _approved: boolean;
}>;

declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

declare type ArrayCardinality = "many" | "atleastone";

declare type arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];

declare type AssertArray<T> = T extends any[] ? T : never;

declare type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;

declare type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.flatten<objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_input"];
}>>;

declare type baseObjectOutputType<Shape extends ZodRawShape> = objectUtil.flatten<objectUtil.addQuestionMarks<{
    [k in keyof Shape]: Shape[k]["_output"];
}>>;

declare class BigNumber implements Hexable {
    readonly _hex: string;
    readonly _isBigNumber: boolean;
    constructor(constructorGuard: any, hex: string);
    fromTwos(value: number): BigNumber;
    toTwos(value: number): BigNumber;
    abs(): BigNumber;
    add(other: BigNumberish): BigNumber;
    sub(other: BigNumberish): BigNumber;
    div(other: BigNumberish): BigNumber;
    mul(other: BigNumberish): BigNumber;
    mod(other: BigNumberish): BigNumber;
    pow(other: BigNumberish): BigNumber;
    and(other: BigNumberish): BigNumber;
    or(other: BigNumberish): BigNumber;
    xor(other: BigNumberish): BigNumber;
    mask(value: number): BigNumber;
    shl(value: number): BigNumber;
    shr(value: number): BigNumber;
    eq(other: BigNumberish): boolean;
    lt(other: BigNumberish): boolean;
    lte(other: BigNumberish): boolean;
    gt(other: BigNumberish): boolean;
    gte(other: BigNumberish): boolean;
    isNegative(): boolean;
    isZero(): boolean;
    toNumber(): number;
    toBigInt(): bigint;
    toString(): string;
    toHexString(): string;
    toJSON(key?: string): any;
    static from(value: any): BigNumber;
    static isBigNumber(value: any): value is BigNumber;
}

declare type BigNumberish = BigNumber | Bytes | bigint | string | number;

declare interface Block extends _Block {
    transactions: Array<string>;
}

declare interface _Block {
    hash: string;
    parentHash: string;
    number: number;
    timestamp: number;
    nonce: string;
    difficulty: number;
    _difficulty: BigNumber;
    gasLimit: BigNumber;
    gasUsed: BigNumber;
    miner: string;
    extraData: string;
    baseFeePerGas?: null | BigNumber;
}

declare type BlockTag = string | number;

declare interface BlockWithTransactions extends _Block {
    transactions: Array<TransactionResponse>;
}

declare type BufferOrStringWithName = {
    data: Buffer | string;
    name?: string;
};

declare type Bytes = ArrayLike<number>;

declare type BytesLike = Bytes | string;

declare type Chain = Chain_2;

export { ChainId }

declare class ChainNotConfiguredError extends Error {
    name: string;
    message: string;
}

/**
 * @internal
 */
export declare type ChainRpc<TSupportedChain extends SupportedChain> = Record<TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain, string>;

declare class ConnectorAlreadyConnectedError extends Error {
    name: string;
    message: string;
}

declare class ConnectorNotFoundError extends Error {
    name: string;
    message: string;
}

declare class ConstructorFragment extends Fragment {
    stateMutability: string;
    payable: boolean;
    gas?: BigNumber;
    format(format?: string): string;
    static from(value: ConstructorFragment | JsonFragment | string): ConstructorFragment;
    static fromObject(value: ConstructorFragment | JsonFragment): ConstructorFragment;
    static fromString(value: string): ConstructorFragment;
    static isConstructorFragment(value: any): value is ConstructorFragment;
}

declare const Context: React_3.Context<ContextValue | null>;

declare type ContextValue = {
    state: {
        /** Flag for triggering refetch */
        cacheBuster: State['cacheBuster'];
        /** Flag for when connection is in progress */
        connecting?: State['connecting'];
        /** Active connector */
        connector?: State['connector'];
        /** Connectors used for linking accounts */
        connectors: Connector[];
        /** Active data */
        data?: State['data'];
        /** Interface for connecting to network */
        provider: BaseProvider;
        /** Interface for connecting to network */
        webSocketProvider?: WebSocketProvider;
    };
    setState: React_3.Dispatch<React_3.SetStateAction<State>>;
    setLastUsedConnector: (newValue: string | null) => void;
};

declare type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;

/**
 * the metadata to pass to wallet connection dialog (may show up during the wallet-connection process)
 * @remarks this is only used for wallet connect and wallet link, metamask does not support it
 * @public
 */
export declare interface DAppMetaData {
    /**
     * the name of your app
     */
    name: string;
    /**
     * optional - a description of your app
     */
    description?: string;
    /**
     * optional - a url that points to a logo (or favicon) of your app
     */
    logoUrl?: string;
    /**
     * optional - the url where your app is hosted
     */
    url?: string;
    /**
     * optional - whether to show the connect dialog in darkmode or not
     */
    isDarkMode?: boolean;
}

export { defaultChains }

declare const defaultErrorMap: (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
    message: string;
};

export { defaultL2Chains }

declare const defaultSupportedChains: ({
    readonly id: ChainId.Mainnet;
    readonly name: "Mainnet";
    readonly nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"];
    readonly blockExplorers: readonly [{
        readonly name: "Etherscan";
        readonly url: "https://etherscan.io";
    }];
} | {
    readonly id: ChainId.Rinkeby;
    readonly name: "Rinkeby";
    readonly nativeCurrency: {
        readonly name: "Rinkeby Ether";
        readonly symbol: "rETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"];
    readonly blockExplorers: readonly [{
        readonly name: "Etherscan";
        readonly url: "https://rinkeby.etherscan.io";
    }];
    readonly testnet: true;
} | {
    readonly id: ChainId.Goerli;
    readonly name: "Goerli";
    readonly nativeCurrency: {
        readonly name: "Goerli Ether";
        readonly symbol: "gETH";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"];
    readonly blockExplorers: readonly [{
        readonly name: "Etherscan";
        readonly url: "https://goerli.etherscan.io";
    }];
    readonly testnet: true;
} | {
    readonly id: ChainId.Polygon;
    readonly name: "Polygon Mainnet";
    readonly nativeCurrency: {
        readonly name: "Matic";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://polygon-rpc.com", "https://rpc-mainnet.matic.network", "https://matic-mainnet.chainstacklabs.com", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet-full-rpc.bwarelabs.com"];
    readonly blockExplorers: readonly [{
        readonly name: "Polygonscan";
        readonly url: "https://polygonscan.com";
    }];
} | {
    readonly id: ChainId.Mumbai;
    readonly name: "Polygon Testnet Mumbai";
    readonly nativeCurrency: {
        readonly name: "Matic";
        readonly symbol: "MATIC";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://matic-mumbai.chainstacklabs.com", "https://rpc-mumbai.maticvigil.com", "https://matic-testnet-archive-rpc.bwarelabs.com"];
    readonly blockExplorers: readonly [{
        readonly name: "Polygonscan";
        readonly url: "https://mumbai.polygonscan.com";
    }];
    readonly testnet: true;
} | {
    readonly id: ChainId.Avalanche;
    readonly name: "Avalanche";
    readonly nativeCurrency: {
        readonly name: "AVAX";
        readonly symbol: "AVAX";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://api.avax.network/ext/bc/C/rpc", "https://rpc.ankr.com/avalanche"];
    readonly blockExplorers: readonly [{
        readonly name: "SnowTrace";
        readonly url: "https://snowtrace.io/";
    }];
    readonly testnet: false;
} | {
    readonly id: ChainId.Fantom;
    readonly name: "Fantom Opera";
    readonly nativeCurrency: {
        readonly name: "Fantom";
        readonly symbol: "FTM";
        readonly decimals: 18;
    };
    readonly rpcUrls: readonly ["https://rpc.ftm.tools"];
    readonly blockExplorerUrls: readonly [{
        readonly name: "FTMScan";
        readonly url: "https://ftmscan.com/";
    }];
    readonly testnet: false;
})[];

declare type Deferrable<T> = {
    [K in keyof T]: T[K] | Promise<T[K]>;
};

declare type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U> ? deoptional<U> : T;

declare class Description<T = any> {
    constructor(info: {
        [K in keyof T]: T[K];
    });
}

/**
 @internal
 */
export declare function detectErc721Instance(contract?: ValidContractInstance | CustomContract | null): Erc721<ERC721 & ERC721Metadata> | undefined;

declare type DIRTY<T> = {
    status: "dirty";
    value: T;
};

declare const DIRTY: <T>(value: T) => DIRTY<T>;

declare type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;

declare interface ERC721 extends BaseContract {
    contractName: string | "ERC721";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC721Interface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        approve(_approved: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(_owner: string, overrides?: CallOverrides): Promise<[BigNumber_2]>;
        getApproved(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<[string]>;
        isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<[boolean]>;
        ownerOf(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<[string]>;
        "safeTransferFrom(address,address,uint256)"(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(_from: string, _to: string, _tokenId: BigNumberish_2, data: BytesLike_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(_operator: string, _approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferFrom(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    approve(_approved: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber_2>;
    getApproved(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
    isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<boolean>;
    ownerOf(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
    "safeTransferFrom(address,address,uint256)"(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(_from: string, _to: string, _tokenId: BigNumberish_2, data: BytesLike_2, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(_operator: string, _approved: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferFrom(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        approve(_approved: string, _tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<void>;
        balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber_2>;
        getApproved(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
        isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<boolean>;
        ownerOf(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
        "safeTransferFrom(address,address,uint256)"(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(_from: string, _to: string, _tokenId: BigNumberish_2, data: BytesLike_2, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(_operator: string, _approved: boolean, overrides?: CallOverrides): Promise<void>;
        transferFrom(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(_owner?: string | null, _approved?: string | null, _tokenId?: BigNumberish_2 | null): ApprovalEventFilter;
        Approval(_owner?: string | null, _approved?: string | null, _tokenId?: BigNumberish_2 | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(_owner?: string | null, _operator?: string | null, _approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(_owner?: string | null, _operator?: string | null, _approved?: null): ApprovalForAllEventFilter;
        "Transfer(address,address,uint256)"(_from?: string | null, _to?: string | null, _tokenId?: BigNumberish_2 | null): TransferEventFilter;
        Transfer(_from?: string | null, _to?: string | null, _tokenId?: BigNumberish_2 | null): TransferEventFilter;
    };
    estimateGas: {
        approve(_approved: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
        balanceOf(_owner: string, overrides?: CallOverrides): Promise<BigNumber_2>;
        getApproved(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<BigNumber_2>;
        isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<BigNumber_2>;
        ownerOf(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<BigNumber_2>;
        "safeTransferFrom(address,address,uint256)"(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
        "safeTransferFrom(address,address,uint256,bytes)"(_from: string, _to: string, _tokenId: BigNumberish_2, data: BytesLike_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
        setApprovalForAll(_operator: string, _approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
        transferFrom(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
    };
    populateTransaction: {
        approve(_approved: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(_owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(_from: string, _to: string, _tokenId: BigNumberish_2, data: BytesLike_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(_operator: string, _approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferFrom(_from: string, _to: string, _tokenId: BigNumberish_2, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}

declare interface ERC721Interface extends utils.Interface {
    contractName: string | "ERC721";
    functions: {
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "approve", values: [string, BigNumberish_2]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish_2]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [string, string]): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish_2]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [string, string, BigNumberish_2]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [string, string, BigNumberish_2]): string;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike_2): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

declare interface ERC721Metadata extends BaseContract {
    contractName: string | "ERC721Metadata";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ERC721MetadataInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        name(overrides?: CallOverrides): Promise<[string]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<[string]>;
    };
    name(overrides?: CallOverrides): Promise<string>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        name(overrides?: CallOverrides): Promise<string>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        name(overrides?: CallOverrides): Promise<BigNumber_2>;
        symbol(overrides?: CallOverrides): Promise<BigNumber_2>;
        tokenURI(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<BigNumber_2>;
    };
    populateTransaction: {
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(_tokenId: BigNumberish_2, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}

declare interface ERC721MetadataInterface extends utils.Interface {
    contractName: string | "ERC721Metadata";
    functions: {
        "name()": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish_2]): string;
    decodeFunctionResult(functionFragment: "name", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike_2): Result;
    events: {};
}

declare type ErrorMapCtx = {
    defaultError: string;
    data: any;
};

declare namespace errorUtil {
    type ErrMessage = string | {
        message?: string;
    };
    const errToObj: (message?: ErrMessage | undefined) => {
        message?: string | undefined;
    };
    const toString: (message?: ErrMessage | undefined) => string | undefined;
}

declare interface EventFilter {
    address?: string;
    topics?: Array<string | Array<string> | null>;
}

declare class EventFragment extends Fragment {
    readonly anonymous: boolean;
    format(format?: string): string;
    static from(value: EventFragment | JsonFragment | string): EventFragment;
    static fromObject(value: JsonFragment | EventFragment): EventFragment;
    static fromString(value: string): EventFragment;
    static isEventFragment(value: any): value is EventFragment;
}

declare type EventType = string | Array<string | Array<string>> | EventFilter | ForkEvent;

declare type extendShape<A, B> = {
    [k in Exclude<keyof A, keyof B>]: A[k];
} & {
    [k in keyof B]: B[k];
};

declare interface FeeData {
    maxFeePerGas: null | BigNumber;
    maxPriorityFeePerGas: null | BigNumber;
    gasPrice: null | BigNumber;
}

declare type FileOrBuffer = File | Buffer | BufferOrStringWithName;

declare interface Filter extends EventFilter {
    fromBlock?: BlockTag;
    toBlock?: BlockTag;
}

declare abstract class ForkEvent extends Description {
    readonly expiry: number;
    readonly _isForkEvent?: boolean;
    static isForkEvent(value: any): value is ForkEvent;
}

declare abstract class Fragment {
    readonly type: string;
    readonly name: string;
    readonly inputs: Array<ParamType>;
    readonly _isFragment: boolean;
    constructor(constructorGuard: any, params: any);
    abstract format(format?: string): string;
    static from(value: Fragment | JsonFragment | string): Fragment;
    static fromObject(value: Fragment | JsonFragment): Fragment;
    static fromString(value: string): Fragment;
    static isFragment(value: any): value is Fragment;
}

declare class FunctionFragment extends ConstructorFragment {
    constant: boolean;
    outputs?: Array<ParamType>;
    format(format?: string): string;
    static from(value: FunctionFragment | JsonFragment | string): FunctionFragment;
    static fromObject(value: FunctionFragment | JsonFragment): FunctionFragment;
    static fromString(value: string): FunctionFragment;
    static isFunctionFragment(value: any): value is FunctionFragment;
}

declare interface Hexable {
    toHexString(): string;
}

/**
 * @internal
 */
export declare type InjectedConnectorType = "injected" | "metamask" | {
    name: "injected" | "metamask";
    options?: InjectedConnector["options"];
};

declare type input<T extends ZodType<any, any, any>> = T["_input"];

declare type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_input"] : never;
}>;

declare type InputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;

declare type INVALID = {
    status: "aborted";
};

declare const INVALID: INVALID;

export { IpfsStorage }

declare type IssueData = stripPath<ZodIssueOptionalMessage> & {
    path?: (string | number)[];
    fatal?: boolean;
};

declare type Json = JsonLiteralOrFileOrBuffer | JsonObject | Json[];

declare interface JsonFragment {
    readonly name?: string;
    readonly type?: string;
    readonly anonymous?: boolean;
    readonly payable?: boolean;
    readonly constant?: boolean;
    readonly stateMutability?: string;
    readonly inputs?: ReadonlyArray<JsonFragmentType>;
    readonly outputs?: ReadonlyArray<JsonFragmentType>;
    readonly gas?: string;
}

declare interface JsonFragmentType {
    readonly name?: string;
    readonly indexed?: boolean;
    readonly type?: string;
    readonly internalType?: any;
    readonly components?: ReadonlyArray<JsonFragmentType>;
}

declare type JsonLiteral = boolean | null | number | string;

declare type JsonLiteralOrFileOrBuffer = JsonLiteral | FileOrBuffer;

declare type JsonObject = {
    [key: string]: Json;
};

declare type Listener = (...args: Array<any>) => void;

declare interface Log {
    blockNumber: number;
    blockHash: string;
    transactionIndex: number;
    removed: boolean;
    address: string;
    data: string;
    topics: Array<string>;
    transactionHash: string;
    logIndex: number;
}

/**
 * A component that renders media based on the format of the media type.
 * Handles most media types including image, audio, video, and html files.
 * Falls back to a external link if the media type is not supported.
 *
 * props: {@link MediaRendererProps}
 *
 * @example
 * Render a video hosted on ipfs
 * ```jsx
 * const Component = () => {
 *   return <MediaRenderer
 *     src="ipfs://Qmb9ZV5yznE4C4YvyJe8DVFv1LSVkebdekY6HjLVaKmHZi"
 *     alt="A mp4 video"
 *   />
 * }
 * ```
 */
export declare const MediaRenderer: React_2.ForwardRefExoticComponent<MediaRendererProps & {
    children?: React_2.ReactNode;
} & React_2.RefAttributes<HTMLMediaElement>>;

/**
 *
 * The props for the {@link MediaRenderer} component.
 * @public
 */
export declare interface MediaRendererProps extends SharedMediaProps {
    /**
     * The media source uri.
     */
    src?: string;
    /**
     * The alt text for the media.
     */
    alt?: string;
    /**
     * The media poster image uri. (if applicable)
     */
    poster?: string;
}

export declare interface MediaType {
    url?: string;
    mimeType?: string;
}

declare type Network = {
    name: string;
    chainId: number;
    ensAddress?: string;
    _defaultProvider?: (providers: any, options?: any) => any;
};

declare type objectInputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny> = ZodTypeAny extends Catchall ? baseObjectInputType<Shape> : objectUtil.flatten<baseObjectInputType<Shape> & {
    [k: string]: Catchall["_input"];
}>;

declare type objectOutputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny> = ZodTypeAny extends Catchall ? baseObjectOutputType<Shape> : objectUtil.flatten<baseObjectOutputType<Shape> & {
    [k: string]: Catchall["_output"];
}>;

declare namespace objectUtil {
    type MergeShapes<U extends ZodRawShape, V extends ZodRawShape> = {
        [k in Exclude<keyof U, keyof V>]: U[k];
    } & V;
    type optionalKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? k : never;
    }[keyof T];
    type requiredKeys<T extends object> = {
        [k in keyof T]: undefined extends T[k] ? never : k;
    }[keyof T];
    type addQuestionMarks<T extends object> = {
        [k in optionalKeys<T>]?: T[k];
    } & {
        [k in requiredKeys<T>]: T[k];
    };
    type identity<T> = T;
    type flatten<T extends object> = identity<{
        [k in keyof T]: T[k];
    }>;
    type noNeverKeys<T extends ZodRawShape> = {
        [k in keyof T]: [T[k]] extends [never] ? never : k;
    }[keyof T];
    type noNever<T extends ZodRawShape> = identity<{
        [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never;
    }>;
    const mergeShapes: <U extends ZodRawShape, T extends ZodRawShape>(first: U, second: T) => T & U;
        {};
}

declare type OK<T> = {
    status: "valid";
    value: T;
};

declare const OK: <T>(value: T) => OK<T>;

declare interface OnceBlockable {
    once(eventName: "block", handler: () => void): void;
}

declare interface OnEvent<TRes> {
    <TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>, listener: TypedListener<TEvent>): TRes;
    (eventName: string, listener: Listener): TRes;
}

declare type output<T extends ZodType<any, any, any>> = T["_output"];

declare type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{
    [k in keyof T]: T[k] extends ZodType<any, any> ? T[k]["_output"] : never;
}>;

declare type OutputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;

declare class ParamType {
    readonly name: string;
    readonly type: string;
    readonly baseType: string;
    readonly indexed: boolean;
    readonly components: Array<ParamType>;
    readonly arrayLength: number;
    readonly arrayChildren: ParamType;
    readonly _isParamType: boolean;
    constructor(constructorGuard: any, params: any);
    format(format?: string): string;
    static from(value: string | JsonFragmentType | ParamType, allowIndexed?: boolean): ParamType;
    static fromObject(value: JsonFragmentType | ParamType): ParamType;
    static fromString(value: string, allowIndexed?: boolean): ParamType;
    static isParamType(value: any): value is ParamType;
}

declare interface ParseContext {
    readonly common: {
        readonly issues: ZodIssue[];
        readonly contextualErrorMap?: ZodErrorMap;
        readonly async: boolean;
    };
    readonly path: ParsePath;
    readonly schemaErrorMap?: ZodErrorMap;
    readonly parent: ParseContext | null;
    readonly data: any;
    readonly parsedType: ZodParsedType;
}

declare type ParseInput = {
    data: any;
    path: (string | number)[];
    parent: ParseContext;
};

declare type ParseParams = {
    path: (string | number)[];
    errorMap: ZodErrorMap;
    async: boolean;
};

declare type ParsePath = ParsePathComponent[];

declare type ParsePathComponent = string | number;

declare type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;

declare class ParseStatus {
    value: "aborted" | "dirty" | "valid";
    dirty(): void;
    abort(): void;
    static mergeArray(status: ParseStatus, results: SyncParseReturnType<any>[]): SyncParseReturnType;
    static mergeObjectAsync(status: ParseStatus, pairs: {
        key: ParseReturnType<any>;
        value: ParseReturnType<any>;
    }[]): Promise<SyncParseReturnType<any>>;
    static mergeObjectSync(status: ParseStatus, pairs: {
        key: SyncParseReturnType<any>;
        value: SyncParseReturnType<any>;
        alwaysSet?: boolean;
    }[]): SyncParseReturnType;
}

declare namespace partialUtil {
    type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<infer Shape, infer Params, infer Catchall> ? ZodObject<{
        [k in keyof Shape]: ZodOptional<DeepPartial<Shape[k]>>;
    }, Params, Catchall> : T extends ZodArray<infer Type, infer Card> ? ZodArray<DeepPartial<Type>, Card> : T extends ZodOptional<infer Type> ? ZodOptional<DeepPartial<Type>> : T extends ZodNullable<infer Type> ? ZodNullable<DeepPartial<Type>> : T extends ZodTuple<infer Items> ? {
        [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never;
    } extends infer PI ? PI extends ZodTupleItems ? ZodTuple<PI> : never : never : T;
}

declare type PreprocessEffect<T> = {
    type: "preprocess";
    transform: (arg: T) => any;
};

declare type Primitive = string | number | bigint | boolean | null | undefined;

declare type Props = {
    /** Enables reconnecting to last used connector on mount */
    autoConnect?: boolean;
    /**
     * Key for saving connector preference to browser
     * @default 'wagmi.wallet'
     */
    connectorStorageKey?: string;
    /**
     * Connectors used for linking accounts
     * @default [new InjectedConnector()]
     */
    connectors?: Connector[] | ((config: {
        chainId?: number;
    }) => Connector[]);
    /**
     * Interface for connecting to network
     * @default getDefaultProvider()
     */
    provider?: BaseProvider | ((config: {
        chainId?: number;
        connector?: Connector;
    }) => BaseProvider);
    /** WebSocket interface for connecting to network */
    webSocketProvider?: WebSocketProvider | ((config: {
        chainId?: number;
        connector?: Connector;
    }) => WebSocketProvider | undefined);
};

declare abstract class Provider implements OnceBlockable {
    abstract getNetwork(): Promise<Network>;
    abstract getBlockNumber(): Promise<number>;
    abstract getGasPrice(): Promise<BigNumber>;
    getFeeData(): Promise<FeeData>;
    abstract getBalance(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<BigNumber>;
    abstract getTransactionCount(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<number>;
    abstract getCode(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract getStorageAt(addressOrName: string | Promise<string>, position: BigNumberish | Promise<BigNumberish>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
    abstract call(transaction: Deferrable<TransactionRequest>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber>;
    abstract getBlock(blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>): Promise<Block>;
    abstract getBlockWithTransactions(blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>): Promise<BlockWithTransactions>;
    abstract getTransaction(transactionHash: string): Promise<TransactionResponse>;
    abstract getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
    abstract getLogs(filter: Filter): Promise<Array<Log>>;
    abstract resolveName(name: string | Promise<string>): Promise<null | string>;
    abstract lookupAddress(address: string | Promise<string>): Promise<null | string>;
    abstract on(eventName: EventType, listener: Listener): Provider;
    abstract once(eventName: EventType, listener: Listener): Provider;
    abstract emit(eventName: EventType, ...args: Array<any>): boolean;
    abstract listenerCount(eventName?: EventType): number;
    abstract listeners(eventName?: EventType): Array<Listener>;
    abstract off(eventName: EventType, listener?: Listener): Provider;
    abstract removeAllListeners(eventName?: EventType): Provider;
    addListener(eventName: EventType, listener: Listener): Provider;
    removeListener(eventName: EventType, listener: Listener): Provider;
    abstract waitForTransaction(transactionHash: string, confirmations?: number, timeout?: number): Promise<TransactionReceipt>;
    readonly _isProvider: boolean;
    constructor();
    static isProvider(value: any): value is Provider;
}

declare const Provider_2: ({ autoConnect, children, connectors: connectors_, connectorStorageKey, provider: provider_, webSocketProvider: webSocketProvider_, }: React_3.PropsWithChildren<Props>) => React_3.FunctionComponentElement<React_3.ProviderProps<ContextValue | null>>;

declare type PublishedMetadata = {
    name: string;
    abi: TypeOf<typeof AbiSchema>;
    bytecode: string;
};

declare type RawCreateParams = {
    errorMap?: ZodErrorMap;
    invalid_type_error?: string;
    required_error?: string;
    description?: string;
} | undefined;

declare type RefinementCtx = {
    addIssue: (arg: IssueData) => void;
    path: (string | number)[];
};

declare type RefinementEffect<T> = {
    type: "refinement";
    refinement: (arg: T, ctx: RefinementCtx) => any;
};

declare interface Result extends ReadonlyArray<any> {
    readonly [key: string]: any;
}

declare type SafeParseError<Input> = {
    success: false;
    error: ZodError<Input>;
};

declare type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;

declare type SafeParseSuccess<Output> = {
    success: true;
    data: Output;
};

export declare interface SharedMediaProps {
    className?: string;
    style?: React_2.CSSProperties;
    width?: HTMLIFrameElement["width"];
    height?: HTMLIFrameElement["height"];
    /**
     * Require user interaction to play the media. (default false)
     */
    requireInteraction?: boolean;
    /**
     * Show the media controls (where applicable) (default false)
     */
    controls?: HTMLVideoElement["controls"];
}

declare type State = {
    cacheBuster: number;
    connecting?: boolean;
    connector?: Connector;
    data?: ConnectorData<Web3Provider>;
    error?: Error;
};

declare type StringValidation = "email" | "url" | "uuid" | "regex" | "cuid";

declare type stripPath<T extends object> = T extends any ? util.OmitKeys<T, "path"> : never;

declare type SupportedChain = SupportedChainId | Chain;

declare type SupportedChainId = typeof defaultSupportedChains[number]["id"];

declare class SwitchChainError extends Error {
    name: string;
    message: string;
}

declare type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;

declare namespace ThirdwebContract {
    type ThirdwebInfoStruct = {
        publishMetadataUri: string;
        contractURI: string;
    };
    type ThirdwebInfoStructOutput = [string, string] & {
        publishMetadataUri: string;
        contractURI: string;
    };
}

declare interface ThirdwebContract extends BaseContract {
    contractName: string | "ThirdwebContract";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ThirdwebContractInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        contractURI(overrides?: CallOverrides): Promise<[string]>;
        getPublishMetadataUri(overrides?: CallOverrides): Promise<[string]>;
        setThirdwebInfo(_thirdwebInfo: ThirdwebContract.ThirdwebInfoStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    contractURI(overrides?: CallOverrides): Promise<string>;
    getPublishMetadataUri(overrides?: CallOverrides): Promise<string>;
    setThirdwebInfo(_thirdwebInfo: ThirdwebContract.ThirdwebInfoStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        contractURI(overrides?: CallOverrides): Promise<string>;
        getPublishMetadataUri(overrides?: CallOverrides): Promise<string>;
        setThirdwebInfo(_thirdwebInfo: ThirdwebContract.ThirdwebInfoStruct, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        contractURI(overrides?: CallOverrides): Promise<BigNumber_2>;
        getPublishMetadataUri(overrides?: CallOverrides): Promise<BigNumber_2>;
        setThirdwebInfo(_thirdwebInfo: ThirdwebContract.ThirdwebInfoStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber_2>;
    };
    populateTransaction: {
        contractURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPublishMetadataUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setThirdwebInfo(_thirdwebInfo: ThirdwebContract.ThirdwebInfoStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}

declare interface ThirdwebContractInterface extends utils.Interface {
    contractName: string | "ThirdwebContract";
    functions: {
        "contractURI()": FunctionFragment;
        "getPublishMetadataUri()": FunctionFragment;
        "setThirdwebInfo((string,string))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "contractURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPublishMetadataUri", values?: undefined): string;
    encodeFunctionData(functionFragment: "setThirdwebInfo", values: [ThirdwebContract.ThirdwebInfoStruct]): string;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "getPublishMetadataUri", data: BytesLike_2): Result;
    decodeFunctionResult(functionFragment: "setThirdwebInfo", data: BytesLike_2): Result;
    events: {};
}

/**
 * Render a nft based on the common metadata returned by the thirdweb sdk.
 */
export declare const ThirdwebNftMedia: React_2.ForwardRefExoticComponent<ThirdwebNftMediaProps & React_2.RefAttributes<HTMLMediaElement>>;

/**
 * The props for the {@link ThirdwebNftMedia} component.
 */
export declare interface ThirdwebNftMediaProps extends SharedMediaProps {
    /**
     * The NFT metadata of the NFT returned by the thirdweb sdk.
     */
    metadata: NFTMetadata;
}

/**
 *
 * The `<ThirdwebProvider />` component, you need to wrap your application with this provider to use the thirdweb react sdk.
 *
 *
 *
 * @example
 * Wrap your application with the Provider
 * ```jsx title="App.jsx"
 * import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   return (
 *     <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
 *       <YourApp />
 *     </ThirdwebProvider>
 *   );
 * };
 ```
 *
 * @public
 *
 */
export declare const ThirdwebProvider: <TSupportedChain extends SupportedChain = SupportedChain>({ sdkOptions, chainRpc, supportedChains, walletConnectors, dAppMeta, desiredChainId, storageInterface, queryClient, children, }: React_2.PropsWithChildren<ThirdwebProviderProps<TSupportedChain>>) => JSX.Element;

/**
 * The possible props for the ThirdwebProvider.
 */
export declare interface ThirdwebProviderProps<TSupportedChain extends SupportedChain = SupportedChain> {
    /**
     * The {@link SDKOptions | Thirdweb SDK Options} to pass to the thirdweb SDK
     * comes with sensible defaults
     */
    sdkOptions?: SDKOptions;
    /**
     * An array of chainIds or {@link Chain} objects that the dApp supports
     * If not provided, all chains supported by the SDK will be supported by default
     */
    supportedChains?: TSupportedChain[];
    /**
     * An array of connector types (strings) or wallet connector objects that the dApp supports
     * If not provided, will default to metamask (injected), wallet connect and walletlink (coinbase wallet) with sensible defaults
     */
    walletConnectors?: WalletConnector[];
    /**
     * A partial map of chainIds to rpc urls to use for certain chains
     * If not provided, will default to the rpcUrls of the chain objects for the supported chains
     */
    chainRpc?: Partial<ChainRpc<TSupportedChain>>;
    /**
     * Metadata to pass to wallet connect and walletlink wallet connect. (Used to show *which* dApp is being connected to in mobile wallets that support it)
     * Defaults to just the name being passed as `thirdweb powered dApp`.
     */
    dAppMeta?: DAppMetaData;
    /**
     * The chainId that your dApp is running on.
     * While this *can* be `undefined` it is required to be passed. Passing `undefined` will cause no SDK to be instantiated.
     * When passing a chainId, it **must** be part of the `supportedChains` array.
     */
    desiredChainId: TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain | undefined;
    /**
     * The storage interface to use with the sdk.
     */
    storageInterface?: IStorage;
    /**
     * The react-query client to use. (Defaults to a default client.)
     * @beta
     */
    queryClient?: QueryClient;
}

declare interface Transaction {
    hash?: string;
    to?: string;
    from?: string;
    nonce: number;
    gasLimit: BigNumber;
    gasPrice?: BigNumber;
    data: string;
    value: BigNumber;
    chainId: number;
    r?: string;
    s?: string;
    v?: number;
    type?: number | null;
    accessList?: AccessList;
    maxPriorityFeePerGas?: BigNumber;
    maxFeePerGas?: BigNumber;
}

declare interface TransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    root?: string;
    gasUsed: BigNumber;
    logsBloom: string;
    blockHash: string;
    transactionHash: string;
    logs: Array<Log>;
    blockNumber: number;
    confirmations: number;
    cumulativeGasUsed: BigNumber;
    effectiveGasPrice: BigNumber;
    byzantium: boolean;
    type: number;
    status?: number;
}

declare type TransactionRequest = {
    to?: string;
    from?: string;
    nonce?: BigNumberish;
    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;
    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;
    type?: number;
    accessList?: AccessListish;
    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    customData?: Record<string, any>;
    ccipReadEnabled?: boolean;
};

declare interface TransactionResponse extends Transaction {
    hash: string;
    blockNumber?: number;
    blockHash?: string;
    timestamp?: number;
    confirmations: number;
    from: string;
    raw?: string;
    wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

declare type TransferEvent = TypedEvent<[
string,
string,
BigNumber_2
], {
    _from: string;
    _to: string;
    _tokenId: BigNumber_2;
}>;

declare type TransferEventFilter = TypedEventFilter<TransferEvent>;

declare type TransformEffect<T> = {
    type: "transform";
    transform: (arg: T) => any;
};

declare interface TypedEvent<TArgsArray extends Array<any> = any, TArgsObject = any> extends Event_2 {
    args: TArgsArray & TArgsObject;
}

declare interface TypedEventFilter<_TEvent extends TypedEvent> extends EventFilter_2 {
}

declare interface TypedListener<TEvent extends TypedEvent> {
    (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void;
}

declare type TypeOf<T extends ZodType<any, any, any>> = T["_output"];

declare type UnknownKeysParam = "passthrough" | "strict" | "strip";

export { useAccount }

/**
 *
 * @internal
 */
export declare function useActiveChainId(): SUPPORTED_CHAIN_ID | undefined;

/**
 *
 * @returns the address of the connected wallet
 * @public
 */
export declare function useAddress(): string | undefined;

/**
 *
 * @returns the chainId of the connected network
 * @public
 */
export declare function useChainId(): number | undefined;

/**
 * Convienience hook for connecting to a wallet via Coinbase Wallet
 * @returns a function that will prompt the user to connect their wallet via Coinbase Wallet
 * @public
 */
export declare function useCoinbaseWallet(): () => Promise<{
    data?: wagmi_core.ConnectorData<any> | undefined;
    error?: Error | undefined;
}>;

/**
 * for now just re-exported
 * @internal
 */
export declare function useConnect(): readonly [{
    readonly data: {
        readonly connected: boolean;
        readonly connector: wagmi.Connector<any, any> | undefined;
        readonly connectors: wagmi.Connector<any, any>[];
    };
    readonly error: Error | undefined;
    readonly loading: boolean | undefined;
}, (connector: wagmi.Connector<any, any>) => Promise<{
    data?: wagmi.ConnectorData<any> | undefined;
    error?: Error | undefined;
}>];

declare const useContext: () => ContextValue;

/**
 * @internal
 * @param contractType - the contract type
 * @param contractAddress - the contract address
 * @returns the instance of the contract for the given type and address
 */
export declare function useContract<TContractType extends ContractType>(contractType?: TContractType, contractAddress?: string): ContractForContractType<TContractType> | undefined;

/**
 @internal
 */
export declare function useContractFunctionsQuery(contractAddress?: string): react_query.UseQueryResult<AbiFunction[] | null, unknown>;

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
export declare function useContractMetadata(contractAddress?: string): react_query.UseQueryResult<{
    [x: string]: _thirdweb_dev_sdk.Json;
    description?: string | undefined;
    image?: string | undefined;
    external_link?: string | undefined;
    name: string;
} | undefined, unknown>;

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
export declare function useContractPublishMetadata(contractAddress?: string): react_query.UseQueryResult<PublishedMetadata | null | undefined, unknown>;

/**
 *
 * @internal
 */
export declare function useDesiredChainId(): number;

/**
 *
 * @returns a function to call to disconnect the connected wallet
 * @public
 */
export declare function useDisconnect(): () => void;

/**
 * Returns a Edition contract instance
 * @param contractAddress - the address of the Edition contract, found in your thirdweb dashboard
 * @public
 */
export declare function useEdition(contractAddress?: string): Edition | undefined;

/**
 * Returns a Edition Drop contract instance
 * @param contractAddress - the address of the Edition Drop contract, found in your thirdweb dashboard
 * @public
 */
export declare function useEditionDrop(contractAddress?: string): EditionDrop | undefined;

/**
 * Returns a Marketplace contract instance
 * @param contractAddress - the address of the Marketplace contract, found in your thirdweb dashboard
 * @public
 */
export declare function useMarketplace(contractAddress?: string): Marketplace | undefined;

/**
 * Convienience hook for connecting to a metamask (or any injected) wallet
 * @returns a function that will prompt the user to connect their metamask wallet
 * @public
 */
export declare function useMetamask(): () => Promise<{
    data?: wagmi_core.ConnectorData<any> | undefined;
    error?: Error | undefined;
}>;

export { useNetwork }

/**
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 * @returns `false` if the chainId of the wallet is the same as the desired chainId passed into <ThirdwebProvider />
 * @public
 */
export declare function useNetworkMismatch(): boolean;

/**
 * Returns a NFT Collection contract instance
 * @param contractAddress - the address of the NFT Collection contract, found in your thirdweb dashboard
 * @public
 */
export declare function useNFTCollection(contractAddress?: string): NFTCollection | undefined;

/**
 * Returns a NFT Drop contract instance
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 * @public
 */
export declare function useNFTDrop(contractAddress?: string): NFTDrop | undefined;

/**
 * Use this to get a list of NFT tokens of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: nfts, isLoading, error } = useNFTList(<YourERC721ContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @beta
 */
export declare function useNFTList(contract?: Erc721<any>, queryParams?: QueryAllParams): react_query.UseQueryResult<_thirdweb_dev_sdk.NFTMetadataOwner[], unknown>;

/**
 * Use this to get a the total (minted) supply of your ERC721 contract.
 *
 * @example
 * ```javascript
 * const { data: totalSupply, isLoading, error } = useNFTSupply(<YourERC721ContractInstance>);
 * ```
 *
 * @param contract - an instace of a contract that extends the Erc721 spec (nft collection, nft drop, custom contract that follows the Erc721 spec)
 * @returns a response object that incudes the total minted supply
 * @beta
 */
export declare function useNFTSupply(contract?: Erc721<any>): react_query.UseQueryResult<BigNumber, unknown>;

/**
 * Returns a Pack contract instance
 * @param contractAddress - the address of the Pack contract, found in your thirdweb dashboard
 * @public
 */
export declare function usePack(contractAddress?: string): Pack | undefined;

/**
 * @internal
 */
export declare function useReadonlySDK(readonlyRpcUrl: string, sdkOptions: SDKOptions, storageInterface?: IStorage): ThirdwebSDK;

/**
 * Use this resolve a contract address to a thirdweb (built-in / custom) contract instance.
 *
 * @example
 * ```javascript
 * const { contract, isLoading, error } = useResolvedContract("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract once it is resolved
 * @beta
 */
export declare function useResolvedContract(contractAddress?: string): {
    contract: _thirdweb_dev_sdk.Split | _thirdweb_dev_sdk.NFTDrop | _thirdweb_dev_sdk.NFTCollection | _thirdweb_dev_sdk.EditionDrop | _thirdweb_dev_sdk.Edition | _thirdweb_dev_sdk.TokenDrop | _thirdweb_dev_sdk.Token | _thirdweb_dev_sdk.Vote | _thirdweb_dev_sdk.Marketplace | _thirdweb_dev_sdk.Pack | CustomContract<ThirdwebContract> | null;
    data: {
        contractType: "split" | "nft-drop" | "nft-collection" | "edition-drop" | "edition" | "token-drop" | "token" | "vote" | "marketplace" | "pack" | undefined;
        pubishMetadata: null;
    } | {
        contractType: "custom";
        pubishMetadata: PublishedMetadata | null | undefined;
    } | undefined;
    error: unknown;
    isError: true;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<{
        contractType: "split" | "nft-drop" | "nft-collection" | "edition-drop" | "edition" | "token-drop" | "token" | "vote" | "marketplace" | "pack" | undefined;
        pubishMetadata: null;
    } | {
        contractType: "custom";
        pubishMetadata: PublishedMetadata | null | undefined;
    } | undefined, unknown>>;
    remove: () => void;
    fetchStatus: react_query.FetchStatus;
} | {
    contract: _thirdweb_dev_sdk.Split | _thirdweb_dev_sdk.NFTDrop | _thirdweb_dev_sdk.NFTCollection | _thirdweb_dev_sdk.EditionDrop | _thirdweb_dev_sdk.Edition | _thirdweb_dev_sdk.TokenDrop | _thirdweb_dev_sdk.Token | _thirdweb_dev_sdk.Vote | _thirdweb_dev_sdk.Marketplace | _thirdweb_dev_sdk.Pack | CustomContract<ThirdwebContract> | null;
    data: {
        contractType: "split" | "nft-drop" | "nft-collection" | "edition-drop" | "edition" | "token-drop" | "token" | "vote" | "marketplace" | "pack" | undefined;
        pubishMetadata: null;
    } | {
        contractType: "custom";
        pubishMetadata: PublishedMetadata | null | undefined;
    } | undefined;
    error: null;
    isError: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    status: "success";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (react_query.RefetchOptions & react_query.RefetchQueryFilters<TPageData>) | undefined) => Promise<react_query.QueryObserverResult<{
        contractType: "split" | "nft-drop" | "nft-collection" | "edition-drop" | "edition" | "token-drop" | "token" | "vote" | "marketplace" | "pack" | undefined;
        pubishMetadata: null;
    } | {
        contractType: "custom";
        pubishMetadata: PublishedMetadata | null | undefined;
    } | undefined, unknown>>;
    remove: () => void;
    fetchStatus: react_query.FetchStatus;
} | null;

/**
 * Use this to get the contract type for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractType, isLoading, error } = useResolvedContractType("{{contract_address}}");
 * ```
 *
 * @param contractAddress - the address of the deployed contract
 * @returns a response object that includes the contract type of the contract
 * @beta
 */
export declare function useResolvedContractType(contractAddress?: string): react_query.UseQueryResult<"split" | "custom" | "nft-drop" | "nft-collection" | "edition-drop" | "edition" | "token-drop" | "token" | "vote" | "marketplace" | "pack" | undefined, unknown>;

/**
 * @param uri - the uri to resolve (can be a url or a ipfs://\<cid\>)
 * @returns the fully resolved url + mime type of the media
 *
 * @example
 * Usage with fully formed url:
 * ```jsx
 * const Component = () => {
 *   const resolved = useResolvedMediaType("https://example.com/video.mp4");
 *   console.log("mime type", resolved.data.mimeType);
 *   console.log("url", resolved.data.url);
 *   return null;
 * }
 * ```
 *
 * Usage with ipfs cid:
 * ```jsx
 * const Component = () => {
 *   const resolved = useResolvedMediaType("ipfs://QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvsd");
 *   console.log("mime type", resolved.data.mimeType);
 *   console.log("url", resolved.data.url);
 *   return null;
 * }
 * ```
 */
export declare function useResolvedMediaType(uri?: string): {
    url: string | undefined;
    mimeType: string | undefined;
};

declare class UserRejectedRequestError extends Error {
    name: string;
    message: string;
}

/**
 *
 * @returns {@link ThirdwebSDK}
     * @internal
     */
 export declare function useSDK(): ThirdwebSDK | undefined;

 /**
  *
  * @internal
  */
 export declare function useSigner(): Signer | undefined;

 /**
  * Returns a Split contract instance
  * @param contractAddress - the address of the Split contract, found in your thirdweb dashboard
  * @public
  */
 export declare function useSplit(contractAddress?: string): Split | undefined;

 /**
  * Returns a Token contract instance
  * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
  * @public
  */
 export declare function useToken(contractAddress?: string): Token | undefined;

 /**
  * Returns a Vote contract instance
  * @param contractAddress - the address of the Vote contract, found in your thirdweb dashboard
  * @public
  */
 export declare function useVote(contractAddress?: string): Vote | undefined;

 /**
  * Convienience hook for connecting to a wallet via WalletConnect
  * @returns a function that will prompt the user to connect their wallet via WalletConnect
  * @public
  */
 export declare function useWalletConnect(): () => Promise<{
     data?: wagmi_core.ConnectorData<any> | undefined;
     error?: Error | undefined;
 }>;

 /**
  * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
  * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
  * @internal
  */
 export declare function useWalletLink(): () => Promise<{
     data?: wagmi_core.ConnectorData<any> | undefined;
     error?: Error | undefined;
 }>;

 declare namespace util {
     type AssertEqual<T, Expected> = [T] extends [Expected] ? [Expected] extends [T] ? true : false : false;
     function assertNever(_x: never): never;
     type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
     type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
     type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
     const arrayToEnum: <T extends string, U extends [T, ...T[]]>(items: U) => { [k in U[number]]: k; };
     const getValidEnumValues: (obj: any) => any[];
     const objectValues: (obj: any) => any[];
     const objectKeys: ObjectConstructor["keys"];
     const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
     type identity<T> = T;
     type flatten<T extends object> = identity<{
         [k in keyof T]: T[k];
     }>;
     type noUndefined<T> = T extends undefined ? never : T;
     const isInteger: NumberConstructor["isInteger"];
 }

 declare namespace wagmi {
     export {
         Provider_2 as Provider,
         Provider_2 as WagmiProvider,
         useContext,
         Context,
         Props as ProviderProps,
         Props as WagmiProviderProps,
         useAccount,
         useBalance,
         useBlockNumber,
         useConnect_2 as useConnect,
         useContract_2 as useContract,
         useContractEvent,
         useContractRead,
         useContractWrite,
         useEnsAvatar,
         useEnsLookup,
         useEnsResolveName,
         useEnsResolver,
         useFeeData,
         useNetwork,
         useProvider,
         useSigner_2 as useSigner,
         useSignMessage,
         useSignTypedData,
         useToken_2 as useToken,
         useTransaction,
         useWaitForTransaction,
         useWebSocketProvider,
         Connector,
         InjectedConnector_2 as InjectedConnector,
         chain,
         allChains,
         defaultChains,
         defaultL2Chains,
         developmentChains,
         erc1155ABI,
         erc20ABI,
         erc721ABI,
         normalizeChainId,
         AddChainError,
         ChainNotConfiguredError,
         ConnectorAlreadyConnectedError,
         ConnectorNotFoundError,
         SwitchChainError,
         UserRejectedRequestError,
         Chain_2 as Chain,
         ConnectorData
     }
 }

 declare namespace wagmi_core {
     export {
         Connector,
         InjectedConnector_2 as InjectedConnector,
         ConnectorData,
         ConnectorEvents,
         BalanceActionArgs,
         BalanceActionResult,
         balanceAction,
         erc1155ABI,
         erc20ABI,
         erc721ABI,
         chain,
         allChains,
         defaultChains,
         defaultL2Chains,
         developmentChains,
         units,
         AddChainError,
         ChainNotConfiguredError,
         ConnectorAlreadyConnectedError,
         ConnectorNotFoundError,
         SwitchChainError,
         UserRejectedRequestError,
         Balance,
         Chain_2 as Chain,
         Unit,
         normalizeChainId
     }
 }

 /**
  * @internal
  */
 export declare type WalletConnectConnectorType = "walletConnect" | {
     name: "walletConnect";
     options: WalletConnectConnector["options"];
 };

 /**
  * @internal
  */
 export declare type WalletConnector = InjectedConnectorType | WalletConnectConnectorType | WalletLinkConnectorType;

 /**
  * @internal
  */
 export declare type WalletLinkConnectorType = "walletLink" | "coinbase" | {
     name: "walletLink" | "coinbase";
     options: CoinbaseWalletConnector["options"];
 };

 declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> extends ZodType<arrayOutputType<T, Cardinality>, ZodArrayDef<T>, Cardinality extends "atleastone" ? [T["_input"], ...T["_input"][]] : T["_input"][]> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     get element(): T;
     min(minLength: number, message?: errorUtil.ErrMessage): this;
     max(maxLength: number, message?: errorUtil.ErrMessage): this;
     length(len: number, message?: errorUtil.ErrMessage): this;
     nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
     static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodArray<T_1, "many">;
 }

 declare interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     type: T;
     typeName: ZodFirstPartyTypeKind.ZodArray;
     minLength: {
         value: number;
         message?: string;
     } | null;
     maxLength: {
         value: number;
         message?: string;
     } | null;
 }

 declare interface ZodCustomIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.custom;
     params?: {
         [k: string]: any;
     };
 }

 declare class ZodDefault<T extends ZodTypeAny> extends ZodType<util.noUndefined<T["_output"]>, ZodDefaultDef<T>, T["_input"] | undefined> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     removeDefault(): T;
     static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
 }

 declare interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     innerType: T;
     defaultValue: () => util.noUndefined<T["_input"]>;
     typeName: ZodFirstPartyTypeKind.ZodDefault;
 }

 declare class ZodEffects<T extends ZodTypeAny, Output = T["_output"], Input = T["_input"]> extends ZodType<Output, ZodEffectsDef<T>, Input> {
     innerType(): T;
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     static create: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"], I["_input"]>;
     static createWithPreprocess: <I extends ZodTypeAny>(preprocess: (arg: unknown) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], I["_input"]>;
 }

 declare interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     schema: T;
     typeName: ZodFirstPartyTypeKind.ZodEffects;
     effect: Effect<any>;
 }

 declare class ZodError<T = any> extends Error {
     issues: ZodIssue[];
     get errors(): ZodIssue[];
     constructor(issues: ZodIssue[]);
     format: () => ZodFormattedError<T>;
     static create: (issues: ZodIssue[]) => ZodError<any>;
     toString(): string;
     get message(): string;
     get isEmpty(): boolean;
     addIssue: (sub: ZodIssue) => void;
     addIssues: (subs?: ZodIssue[]) => void;
     flatten(mapper?: (issue: ZodIssue) => string): {
         formErrors: string[];
         fieldErrors: {
             [k: string]: string[];
         };
     };
     flatten<U>(mapper?: (issue: ZodIssue) => U): {
         formErrors: U[];
         fieldErrors: {
             [k: string]: U[];
         };
     };
     get formErrors(): {
         formErrors: string[];
         fieldErrors: {
             [k: string]: string[];
         };
     };
 }

 declare type ZodErrorMap = typeof defaultErrorMap;

 declare enum ZodFirstPartyTypeKind {
     ZodString = "ZodString",
     ZodNumber = "ZodNumber",
     ZodNaN = "ZodNaN",
     ZodBigInt = "ZodBigInt",
     ZodBoolean = "ZodBoolean",
     ZodDate = "ZodDate",
     ZodUndefined = "ZodUndefined",
     ZodNull = "ZodNull",
     ZodAny = "ZodAny",
     ZodUnknown = "ZodUnknown",
     ZodNever = "ZodNever",
     ZodVoid = "ZodVoid",
     ZodArray = "ZodArray",
     ZodObject = "ZodObject",
     ZodUnion = "ZodUnion",
     ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
     ZodIntersection = "ZodIntersection",
     ZodTuple = "ZodTuple",
     ZodRecord = "ZodRecord",
     ZodMap = "ZodMap",
     ZodSet = "ZodSet",
     ZodFunction = "ZodFunction",
     ZodLazy = "ZodLazy",
     ZodLiteral = "ZodLiteral",
     ZodEnum = "ZodEnum",
     ZodEffects = "ZodEffects",
     ZodNativeEnum = "ZodNativeEnum",
     ZodOptional = "ZodOptional",
     ZodNullable = "ZodNullable",
     ZodDefault = "ZodDefault",
     ZodPromise = "ZodPromise"
 }

 declare type ZodFormattedError<T> = {
     _errors: string[];
 } & (T extends [any, ...any[]] ? {
     [K in keyof T]?: ZodFormattedError<T[K]>;
 } : T extends any[] ? ZodFormattedError<T[number]>[] : T extends object ? {
     [K in keyof T]?: ZodFormattedError<T[K]>;
 } : unknown);

 declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> extends ZodType<T["_output"] & U["_output"], ZodIntersectionDef<T, U>, T["_input"] & U["_input"]> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     static create: <T_1 extends ZodTypeAny, U_1 extends ZodTypeAny>(left: T_1, right: U_1, params?: RawCreateParams) => ZodIntersection<T_1, U_1>;
 }

 declare interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     left: T;
     right: U;
     typeName: ZodFirstPartyTypeKind.ZodIntersection;
 }

 declare interface ZodInvalidArgumentsIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_arguments;
     argumentsError: ZodError;
 }

 declare interface ZodInvalidDateIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_date;
 }

 declare interface ZodInvalidEnumValueIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_enum_value;
     options: (string | number)[];
 }

 declare interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_intersection_types;
 }

 declare interface ZodInvalidLiteralIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_literal;
     expected: unknown;
 }

 declare interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_return_type;
     returnTypeError: ZodError;
 }

 declare interface ZodInvalidStringIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_string;
     validation: StringValidation;
 }

 declare interface ZodInvalidTypeIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_type;
     expected: ZodParsedType;
     received: ZodParsedType;
 }

 declare interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_union_discriminator;
     options: Primitive[];
 }

 declare interface ZodInvalidUnionIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.invalid_union;
     unionErrors: ZodError[];
 }

 declare type ZodIssue = ZodIssueOptionalMessage & {
     message: string;
 };

 declare type ZodIssueBase = {
     path: (string | number)[];
     message?: string;
 };

 declare const ZodIssueCode: {
     invalid_type: "invalid_type";
     invalid_literal: "invalid_literal";
     custom: "custom";
     invalid_union: "invalid_union";
     invalid_union_discriminator: "invalid_union_discriminator";
     invalid_enum_value: "invalid_enum_value";
     unrecognized_keys: "unrecognized_keys";
     invalid_arguments: "invalid_arguments";
     invalid_return_type: "invalid_return_type";
     invalid_date: "invalid_date";
     invalid_string: "invalid_string";
     too_small: "too_small";
     too_big: "too_big";
     invalid_intersection_types: "invalid_intersection_types";
     not_multiple_of: "not_multiple_of";
 };

 declare type ZodIssueCode = keyof typeof ZodIssueCode;

 declare type ZodIssueOptionalMessage = ZodInvalidTypeIssue | ZodInvalidLiteralIssue | ZodUnrecognizedKeysIssue | ZodInvalidUnionIssue | ZodInvalidUnionDiscriminatorIssue | ZodInvalidEnumValueIssue | ZodInvalidArgumentsIssue | ZodInvalidReturnTypeIssue | ZodInvalidDateIssue | ZodInvalidStringIssue | ZodTooSmallIssue | ZodTooBigIssue | ZodInvalidIntersectionTypesIssue | ZodNotMultipleOfIssue | ZodCustomIssue;

 declare class ZodLazy<T extends ZodTypeAny> extends ZodType<output<T>, ZodLazyDef<T>, input<T>> {
     get schema(): T;
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     static create: <T_1 extends ZodTypeAny>(getter: () => T_1, params?: RawCreateParams) => ZodLazy<T_1>;
 }

 declare interface ZodLazyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     getter: () => T;
     typeName: ZodFirstPartyTypeKind.ZodLazy;
 }

 declare interface ZodNotMultipleOfIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.not_multiple_of;
     multipleOf: number;
 }

 declare class ZodNullable<T extends ZodTypeAny> extends ZodType<T["_output"] | null, ZodNullableDef<T>, T["_input"] | null> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     unwrap(): T;
     static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodNullable<T_1>;
 }

 declare interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     innerType: T;
     typeName: ZodFirstPartyTypeKind.ZodNullable;
 }

 declare class ZodObject<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = "strip", Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall>, Input = objectInputType<T, Catchall>> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
     readonly _shape: T;
     readonly _unknownKeys: UnknownKeys;
     readonly _catchall: Catchall;
     private _cached;
     _getCached(): {
         shape: T;
         keys: string[];
     };
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     get shape(): T;
     strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
     strip(): ZodObject<T, "strip", Catchall>;
     passthrough(): ZodObject<T, "passthrough", Catchall>;
     /**
      * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
      * If you want to pass through unknown properties, use `.passthrough()` instead.
      */
     nonstrict: () => ZodObject<T, "passthrough", Catchall>;
     augment: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall, objectOutputType<extendShape<T, Augmentation>, Catchall>, objectInputType<extendShape<T, Augmentation>, Catchall>>;
     extend: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<extendShape<T, Augmentation>, UnknownKeys, Catchall, objectOutputType<extendShape<T, Augmentation>, Catchall>, objectInputType<extendShape<T, Augmentation>, Catchall>>;
     setKey<Key extends string, Schema extends ZodTypeAny>(key: Key, schema: Schema): ZodObject<T & {
         [k in Key]: Schema;
     }, UnknownKeys, Catchall>;
     /**
      * Prior to zod@1.0.12 there was a bug in the
      * inferred type of merged objects. Please
      * upgrade if you are experiencing issues.
      */
     merge<Incoming extends AnyZodObject>(merging: Incoming): ZodObject<extendShape<T, Incoming["_shape"]>, UnknownKeys, Catchall>;
     catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
     pick<Mask extends {
         [k in keyof T]?: true;
     }>(mask: Mask): ZodObject<objectUtil.noNever<{
         [k in keyof Mask]: k extends keyof T ? T[k] : never;
     }>, UnknownKeys, Catchall>;
     omit<Mask extends {
         [k in keyof T]?: true;
     }>(mask: Mask): ZodObject<objectUtil.noNever<{
         [k in keyof T]: k extends keyof Mask ? never : T[k];
     }>, UnknownKeys, Catchall>;
     deepPartial(): partialUtil.DeepPartial<this>;
     partial(): ZodObject<{
         [k in keyof T]: ZodOptional<T[k]>;
     }, UnknownKeys, Catchall>;
     partial<Mask extends {
         [k in keyof T]?: true;
     }>(mask: Mask): ZodObject<objectUtil.noNever<{
         [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k];
     }>, UnknownKeys, Catchall>;
     required(): ZodObject<{
         [k in keyof T]: deoptional<T[k]>;
     }, UnknownKeys, Catchall>;
     static create: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
     static strictCreate: <T_1 extends ZodRawShape>(shape: T_1, params?: RawCreateParams) => ZodObject<T_1, "strict", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
     static lazycreate: <T_1 extends ZodRawShape>(shape: () => T_1, params?: RawCreateParams) => ZodObject<T_1, "strip", ZodTypeAny, { [k_1 in keyof objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>]: objectUtil.addQuestionMarks<{ [k in keyof T_1]: T_1[k]["_output"]; }>[k_1]; }, { [k_3 in keyof objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T_1]: T_1[k_2]["_input"]; }>[k_3]; }>;
 }

 declare interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     typeName: ZodFirstPartyTypeKind.ZodObject;
     shape: () => T;
     catchall: Catchall;
     unknownKeys: UnknownKeys;
 }

 declare class ZodOptional<T extends ZodTypeAny> extends ZodType<T["_output"] | undefined, ZodOptionalDef<T>, T["_input"] | undefined> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     unwrap(): T;
     static create: <T_1 extends ZodTypeAny>(type: T_1, params?: RawCreateParams) => ZodOptional<T_1>;
 }

 declare interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     innerType: T;
     typeName: ZodFirstPartyTypeKind.ZodOptional;
 }

 declare const ZodParsedType: {
     function: "function";
     number: "number";
     string: "string";
     nan: "nan";
     integer: "integer";
     float: "float";
     boolean: "boolean";
     date: "date";
     bigint: "bigint";
     symbol: "symbol";
     undefined: "undefined";
     null: "null";
     array: "array";
     object: "object";
     unknown: "unknown";
     promise: "promise";
     void: "void";
     never: "never";
     map: "map";
     set: "set";
 };

 declare type ZodParsedType = keyof typeof ZodParsedType;

 declare class ZodPromise<T extends ZodTypeAny> extends ZodType<Promise<T["_output"]>, ZodPromiseDef<T>, Promise<T["_input"]>> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     static create: <T_1 extends ZodTypeAny>(schema: T_1, params?: RawCreateParams) => ZodPromise<T_1>;
 }

 declare interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
     type: T;
     typeName: ZodFirstPartyTypeKind.ZodPromise;
 }

 declare type ZodRawShape = {
     [k: string]: ZodTypeAny;
 };

 declare class ZodString extends ZodType<string, ZodStringDef> {
     _parse(input: ParseInput): ParseReturnType<string>;
     protected _regex: (regex: RegExp, validation: StringValidation, message?: errorUtil.ErrMessage | undefined) => ZodEffects<this, string, string>;
     _addCheck(check: ZodStringCheck): ZodString;
     email(message?: errorUtil.ErrMessage): ZodString;
     url(message?: errorUtil.ErrMessage): ZodString;
     uuid(message?: errorUtil.ErrMessage): ZodString;
     cuid(message?: errorUtil.ErrMessage): ZodString;
     regex(regex: RegExp, message?: errorUtil.ErrMessage): ZodString;
     min(minLength: number, message?: errorUtil.ErrMessage): ZodString;
     max(maxLength: number, message?: errorUtil.ErrMessage): ZodString;
     length(len: number, message?: errorUtil.ErrMessage): ZodString;
     /**
      * Deprecated.
      * Use z.string().min(1) instead.
      */
     nonempty: (message?: errorUtil.ErrMessage | undefined) => ZodString;
     get isEmail(): boolean;
     get isURL(): boolean;
     get isUUID(): boolean;
     get isCUID(): boolean;
     get minLength(): number;
     get maxLength(): null;
     static create: (params?: RawCreateParams) => ZodString;
 }

 declare type ZodStringCheck = {
     kind: "min";
     value: number;
     message?: string;
 } | {
     kind: "max";
     value: number;
     message?: string;
 } | {
     kind: "email";
     message?: string;
 } | {
     kind: "url";
     message?: string;
 } | {
     kind: "uuid";
     message?: string;
 } | {
     kind: "cuid";
     message?: string;
 } | {
     kind: "regex";
     regex: RegExp;
     message?: string;
 };

 declare interface ZodStringDef extends ZodTypeDef {
     checks: ZodStringCheck[];
     typeName: ZodFirstPartyTypeKind.ZodString;
 }

 declare interface ZodTooBigIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.too_big;
     maximum: number;
     inclusive: boolean;
     type: "array" | "string" | "number" | "set";
 }

 declare interface ZodTooSmallIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.too_small;
     minimum: number;
     inclusive: boolean;
     type: "array" | "string" | "number" | "set";
 }

 declare class ZodTuple<T extends [ZodTypeAny, ...ZodTypeAny[]] | [] = [ZodTypeAny, ...ZodTypeAny[]], Rest extends ZodTypeAny | null = null> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest>, InputTypeOfTupleWithRest<T, Rest>> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     get items(): T;
     rest<Rest extends ZodTypeAny>(rest: Rest): ZodTuple<T, Rest>;
     static create: <T_1 extends [ZodTypeAny, ...ZodTypeAny[]] | []>(schemas: T_1, params?: RawCreateParams) => ZodTuple<T_1, null>;
 }

 declare interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> extends ZodTypeDef {
     items: T;
     rest: Rest;
     typeName: ZodFirstPartyTypeKind.ZodTuple;
 }

 declare type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];

 declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
     readonly _type: Output;
     readonly _output: Output;
     readonly _input: Input;
     readonly _def: Def;
     get description(): string | undefined;
     abstract _parse(input: ParseInput): ParseReturnType<Output>;
     _getType(input: ParseInput): string;
     _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
     _processInputParams(input: ParseInput): {
         status: ParseStatus;
         ctx: ParseContext;
     };
     _parseSync(input: ParseInput): SyncParseReturnType<Output>;
     _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
     parse(data: unknown, params?: Partial<ParseParams>): Output;
     safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;
     parseAsync(data: unknown, params?: Partial<ParseParams>): Promise<Output>;
     safeParseAsync(data: unknown, params?: Partial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
     /** Alias of safeParseAsync */
     spa: (data: unknown, params?: Partial<ParseParams> | undefined) => Promise<SafeParseReturnType<Input, Output>>;
     refine<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, RefinedOutput, RefinedOutput>;
     refine(check: (arg: Output) => unknown | Promise<unknown>, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, Output, Input>;
     refinement<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, RefinedOutput, RefinedOutput>;
     refinement(check: (arg: Output) => boolean, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, Output, Input>;
     _refinement(refinement: RefinementEffect<Output>["refinement"]): ZodEffects<this, Output, Input>;
     superRefine: (refinement: RefinementEffect<Output>["refinement"]) => ZodEffects<this, Output, Input>;
     constructor(def: Def);
     optional(): ZodOptional<this>;
     nullable(): ZodNullable<this>;
     nullish(): ZodNullable<ZodOptional<this>>;
     array(): ZodArray<this>;
     promise(): ZodPromise<this>;
     or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
     and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
     transform<NewOut>(transform: (arg: Output) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
     default(def: util.noUndefined<Input>): ZodDefault<this>;
     default(def: () => util.noUndefined<Input>): ZodDefault<this>;
     describe(description: string): this;
     isOptional(): boolean;
     isNullable(): boolean;
 }

 declare type ZodTypeAny = ZodType<any, any, any>;

 declare interface ZodTypeDef {
     errorMap?: ZodErrorMap;
     description?: string;
 }

 declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<T[number]["_output"], ZodUnionDef<T>, T[number]["_input"]> {
     _parse(input: ParseInput): ParseReturnType<this["_output"]>;
     get options(): T;
     static create: <T_1 extends readonly [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(types: T_1, params?: RawCreateParams) => ZodUnion<T_1>;
 }

 declare interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[
 ZodTypeAny,
 ZodTypeAny,
 ...ZodTypeAny[]
 ]>> extends ZodTypeDef {
     options: T;
     typeName: ZodFirstPartyTypeKind.ZodUnion;
 }

 declare type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;

 declare interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
     code: typeof ZodIssueCode.unrecognized_keys;
     keys: string[];
 }

 export { }
