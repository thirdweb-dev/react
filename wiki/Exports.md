# @thirdweb-dev/react

## Table of contents

### Interfaces

- [DAppMetaData](../wiki/DAppMetaData)
- [ThirdwebProviderProps](../wiki/ThirdwebProviderProps)

### Type aliases

- [ChainRpc](../wiki/Exports#chainrpc)
- [InjectedConnectorType](../wiki/Exports#injectedconnectortype)
- [WalletConnectConnectorType](../wiki/Exports#walletconnectconnectortype)
- [WalletConnector](../wiki/Exports#walletconnector)
- [WalletLinkConnectorType](../wiki/Exports#walletlinkconnectortype)

### Variables

- [defaultChains](../wiki/Exports#defaultchains)
- [defaultL2Chains](../wiki/Exports#defaultl2chains)

### Functions

- [ThirdwebProvider](../wiki/Exports#thirdwebprovider)
- [useAccount](../wiki/Exports#useaccount)
- [useAddress](../wiki/Exports#useaddress)
- [useConnect](../wiki/Exports#useconnect)
- [useDisconnect](../wiki/Exports#usedisconnect)
- [useEdition](../wiki/Exports#useedition)
- [useEditionDrop](../wiki/Exports#useeditiondrop)
- [useMarketplace](../wiki/Exports#usemarketplace)
- [useNFTCollection](../wiki/Exports#usenftcollection)
- [useNFTDrop](../wiki/Exports#usenftdrop)
- [useNetwork](../wiki/Exports#usenetwork)
- [usePackModule](../wiki/Exports#usepackmodule)
- [useReadonlySDK](../wiki/Exports#usereadonlysdk)
- [useSDK](../wiki/Exports#usesdk)
- [useSigner](../wiki/Exports#usesigner)
- [useToken](../wiki/Exports#usetoken)
- [useVote](../wiki/Exports#usevote)

## Type aliases

### ChainRpc

Ƭ **ChainRpc**<`TSupportedChain`\>: `Record`<`TSupportedChain` extends `Chain` ? `TSupportedChain`[``"id"``] : `TSupportedChain`, `string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSupportedChain` | extends `SupportedChain` |

#### Defined in

[src/Provider.tsx:41](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L41)

___

### InjectedConnectorType

Ƭ **InjectedConnectorType**: ``"injected"`` \| ``"metamask"`` \| { `name`: ``"injected"`` \| ``"metamask"`` ; `options?`: `InjectedConnector`[``"options"``]  }

#### Defined in

[src/Provider.tsx:19](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L19)

___

### WalletConnectConnectorType

Ƭ **WalletConnectConnectorType**: ``"walletConnect"`` \| { `name`: ``"walletConnect"`` ; `options`: `WalletConnectConnector`[``"options"``]  }

#### Defined in

[src/Provider.tsx:24](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L24)

___

### WalletConnector

Ƭ **WalletConnector**: [`InjectedConnectorType`](../wiki/Exports#injectedconnectortype) \| [`WalletConnectConnectorType`](../wiki/Exports#walletconnectconnectortype) \| [`WalletLinkConnectorType`](../wiki/Exports#walletlinkconnectortype)

#### Defined in

[src/Provider.tsx:36](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L36)

___

### WalletLinkConnectorType

Ƭ **WalletLinkConnectorType**: ``"walletLink"`` \| ``"coinbase"`` \| { `name`: ``"walletLink"`` \| ``"coinbase"`` ; `options`: `WalletLinkConnector`[``"options"``]  }

#### Defined in

[src/Provider.tsx:28](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L28)

## Variables

### defaultChains

• `Const` **defaultChains**: `Chain`[]

#### Defined in

node_modules/wagmi-core/dist/declarations/src/constants/chains.d.ts:5

___

### defaultL2Chains

• `Const` **defaultL2Chains**: `Chain`[]

#### Defined in

node_modules/wagmi-core/dist/declarations/src/constants/chains.d.ts:6

## Functions

### ThirdwebProvider

▸ **ThirdwebProvider**<`TSupportedChain`\>(`__namedParameters`): `Element`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSupportedChain` | extends `SupportedChain` = `SupportedChain` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `PropsWithChildren`<[`ThirdwebProviderProps`](../wiki/ThirdwebProviderProps)<`TSupportedChain`\>\> |

#### Returns

`Element`

#### Defined in

[src/Provider.tsx:114](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L114)

___

### useAccount

▸ **useAccount**(`__namedParameters?`): readonly [{ `data`: `undefined` \| { `address`: `string` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `ens`: `undefined` \| { `avatar`: `undefined` \| ``null`` \| `string` ; `name`: `string`  }  } ; `error`: `undefined` \| `Error` ; `loading`: `boolean`  }, () => `void`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters?` | `Config` |

#### Returns

readonly [{ `data`: `undefined` \| { `address`: `string` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `ens`: `undefined` \| { `avatar`: `undefined` \| ``null`` \| `string` ; `name`: `string`  }  } ; `error`: `undefined` \| `Error` ; `loading`: `boolean`  }, () => `void`]

#### Defined in

node_modules/wagmi/dist/declarations/src/hooks/accounts/useAccount.d.ts:5

___

### useAddress

▸ **useAddress**(): `string` \| `undefined`

#### Returns

`string` \| `undefined`

#### Defined in

[src/hooks/useAddress.ts:3](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/useAddress.ts#L3)

___

### useConnect

▸ **useConnect**(): readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

for now just re-exported

#### Returns

readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

#### Defined in

[src/hooks/useConnect.ts:6](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/useConnect.ts#L6)

___

### useDisconnect

▸ **useDisconnect**(): () => `void`

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/hooks/useDisconnect.ts:3](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/useDisconnect.ts#L3)

___

### useEdition

▸ **useEdition**(`moduleAddress?`): `Edition` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`Edition` \| `undefined`

#### Defined in

[src/hooks/modules/useEdition.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useEdition.ts#L4)

___

### useEditionDrop

▸ **useEditionDrop**(`moduleAddress?`): `EditionDrop` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`EditionDrop` \| `undefined`

#### Defined in

[src/hooks/modules/useEditionDrop.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useEditionDrop.ts#L4)

___

### useMarketplace

▸ **useMarketplace**(`moduleAddress?`): `Marketplace` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`Marketplace` \| `undefined`

#### Defined in

[src/hooks/modules/useMarketplace.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useMarketplace.ts#L4)

___

### useNFTCollection

▸ **useNFTCollection**(`moduleAddress?`): `NFTCollection` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`NFTCollection` \| `undefined`

#### Defined in

[src/hooks/modules/useNFTCollection.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useNFTCollection.ts#L4)

___

### useNFTDrop

▸ **useNFTDrop**(`moduleAddress?`): `NFTDrop` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`NFTDrop` \| `undefined`

#### Defined in

[src/hooks/modules/useNFTDrop.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useNFTDrop.ts#L4)

___

### useNetwork

▸ **useNetwork**(): readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Returns

readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Defined in

node_modules/wagmi/dist/declarations/src/hooks/accounts/useNetwork.d.ts:2

___

### usePackModule

▸ **usePackModule**(`moduleAddress?`): `Pack` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`Pack` \| `undefined`

#### Defined in

[src/hooks/modules/usePack.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/usePack.ts#L4)

___

### useReadonlySDK

▸ **useReadonlySDK**(`readonlyRpcUrl`, `sdkOptions`, `storageInterface?`): `ThirdwebSDK`

#### Parameters

| Name | Type |
| :------ | :------ |
| `readonlyRpcUrl` | `string` |
| `sdkOptions` | `undefined` \| { `gasSettings?`: { `maxPriceInGwei?`: `number` ; `speed?`: ``"safeLow"`` \| ``"standard"`` \| ``"fast"`` \| ``"fastest"``  } ; `gasless?`: { `openzeppelin`: { `relayerForwarderAddress?`: `string` ; `relayerUrl`: `string`  }  } \| { `biconomy`: { `apiId`: `string` ; `apiKey`: `string` ; `deadlineSeconds?`: `number`  }  } ; `readonlySettings?`: { `chainId?`: `number` ; `rpcUrl`: `string`  }  } |
| `storageInterface?` | `IStorage` |

#### Returns

`ThirdwebSDK`

#### Defined in

[src/hooks/useReadonlySDK.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/useReadonlySDK.ts#L4)

___

### useSDK

▸ **useSDK**(): `ThirdwebSDK` \| `undefined`

#### Returns

`ThirdwebSDK` \| `undefined`

#### Defined in

[src/Provider.tsx:294](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/Provider.tsx#L294)

___

### useSigner

▸ **useSigner**(): `undefined` \| `Signer`

#### Returns

`undefined` \| `Signer`

#### Defined in

[src/hooks/useSigner.ts:5](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/useSigner.ts#L5)

___

### useToken

▸ **useToken**(`moduleAddress?`): `Token` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`Token` \| `undefined`

#### Defined in

[src/hooks/modules/useTokenModule.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useTokenModule.ts#L4)

___

### useVote

▸ **useVote**(`moduleAddress?`): `Vote` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress?` | `string` |

#### Returns

`Vote` \| `undefined`

#### Defined in

[src/hooks/modules/useVoteModule.ts:4](https://github.com/thirdweb-dev/react/blob/b4c1a4d/src/hooks/modules/useVoteModule.ts#L4)
