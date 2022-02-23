# Interface: ThirdwebProviderProps<TSupportedChain\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSupportedChain` | extends `SupportedChain` = `SupportedChain` |

## Table of contents

### Properties

- [chainRpc](../wiki/ThirdwebProviderProps#chainrpc)
- [dAppMeta](../wiki/ThirdwebProviderProps#dappmeta)
- [desiredChainId](../wiki/ThirdwebProviderProps#desiredchainid)
- [sdkOptions](../wiki/ThirdwebProviderProps#sdkoptions)
- [storageInterface](../wiki/ThirdwebProviderProps#storageinterface)
- [supportedChains](../wiki/ThirdwebProviderProps#supportedchains)
- [walletConnectors](../wiki/ThirdwebProviderProps#walletconnectors)

## Properties

### chainRpc

• `Optional` **chainRpc**: `Partial`<[`ChainRpc`](../wiki/Exports#chainrpc)<`TSupportedChain`\>\>

A partial map of chainIds to rpc urls to use for certain chains
If not provided, will default to the rpcUrls of the chain objects for the supported chains

#### Defined in

[src/Provider.tsx:76](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L76)

___

### dAppMeta

• `Optional` **dAppMeta**: [`DAppMetaData`](../wiki/DAppMetaData)

Metadata to pass to wallet connect and walletlink wallet connect. (Used to show *which* dApp is being connected to in mobile wallets that support it)
Defaults to just the name being passed as `thirdweb powered dApp`.

#### Defined in

[src/Provider.tsx:81](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L81)

___

### desiredChainId

• **desiredChainId**: `TSupportedChain` extends `Chain` ? `TSupportedChain`[``"id"``] : `undefined` \| `TSupportedChain`

The chainId that your dApp is running on.
While this *can* be `undefined` it is required to be passed. Passing `undefined` will cause no SDK to be instantiated.
When passing a chainId, it **must** be part of the `supportedChains` array.

#### Defined in

[src/Provider.tsx:87](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L87)

___

### sdkOptions

• `Optional` **sdkOptions**: `Object`

The {@link SDKOptions} to pass to the thirdweb SDK
comes with sensible defaults

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasSettings?` | { `maxPriceInGwei?`: `number` ; `speed?`: ``"safeLow"`` \| ``"standard"`` \| ``"fast"`` \| ``"fastest"``  } |
| `gasSettings.maxPriceInGwei?` | `number` |
| `gasSettings.speed?` | ``"safeLow"`` \| ``"standard"`` \| ``"fast"`` \| ``"fastest"`` |
| `gasless?` | { `openzeppelin`: { `relayerForwarderAddress?`: `string` ; `relayerUrl`: `string`  }  } \| { `biconomy`: { `apiId`: `string` ; `apiKey`: `string` ; `deadlineSeconds?`: `number`  }  } |
| `readonlySettings?` | { `chainId?`: `number` ; `rpcUrl`: `string`  } |
| `readonlySettings.chainId?` | `number` |
| `readonlySettings.rpcUrl` | `string` |

#### Defined in

[src/Provider.tsx:61](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L61)

___

### storageInterface

• `Optional` **storageInterface**: `IStorage`

The storage interface to use with the sdk.

#### Defined in

[src/Provider.tsx:94](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L94)

___

### supportedChains

• `Optional` **supportedChains**: `TSupportedChain`[]

An array of chainIds or {@link Chain} objects that the dApp supports
If not provided, all chains supported by the SDK will be supported by default

#### Defined in

[src/Provider.tsx:66](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L66)

___

### walletConnectors

• `Optional` **walletConnectors**: [`WalletConnector`](../wiki/Exports#walletconnector)[]

An array of connector types (strings) or [WalletConnector](../wiki/Exports#walletconnector) objects that the dApp supports
If not provided, will default to metamask (injected), wallet connect and walletlink (coinbase wallet) with sensible defaults

#### Defined in

[src/Provider.tsx:71](https://github.com/thirdweb-dev/react/blob/945f587/src/Provider.tsx#L71)
