# @thirdweb-dev/react - v2.0.0-alpha.1

## Table of contents

### Interfaces

- [ThirdwebPoviderProps](../wiki/ThirdwebPoviderProps)

### Variables

- [ThirdwebProvider](../wiki/Exports#thirdwebprovider)
- [defaultChains](../wiki/Exports#defaultchains)
- [defaultL2Chains](../wiki/Exports#defaultl2chains)

### Functions

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
- [useSDK](../wiki/Exports#usesdk)
- [useSigner](../wiki/Exports#usesigner)
- [useToken](../wiki/Exports#usetoken)
- [useVote](../wiki/Exports#usevote)

## Variables

### ThirdwebProvider

• **ThirdwebProvider**: `React.FC`<[`ThirdwebPoviderProps`](../wiki/ThirdwebPoviderProps)\>

#### Defined in

[src/Provider.tsx:88](https://github.com/thirdweb-dev/react/blob/6e1d595/src/Provider.tsx#L88)

___

### defaultChains

• **defaultChains**: `Chain`[]

#### Defined in

node_modules/wagmi-private/dist/declarations/src/constants/chains.d.ts:5

___

### defaultL2Chains

• **defaultL2Chains**: `Chain`[]

#### Defined in

node_modules/wagmi-private/dist/declarations/src/constants/chains.d.ts:6

## Functions

### useAccount

▸ `Const` **useAccount**(`__namedParameters?`): readonly [{ `data`: `undefined` \| { `address`: `string` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `ens`: `undefined` \| { `avatar`: `undefined` \| ``null`` \| `string` ; `name`: `string`  }  } ; `error`: `undefined` \| `Error` ; `loading`: `boolean`  }, () => `void`]

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

[src/hooks/useAddress.ts:3](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/useAddress.ts#L3)

___

### useConnect

▸ **useConnect**(): readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

for now just re-exported

#### Returns

readonly [{ `data`: { `connected`: `boolean` ; `connector`: `undefined` \| `Connector`<`any`, `any`\> ; `connectors`: `Connector`<`any`, `any`\>[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, (`connector`: `Connector`<`any`, `any`\>) => `Promise`<{ `data?`: `ConnectorData`<`any`\> ; `error?`: `Error`  }\>]

#### Defined in

[src/hooks/useConnect.ts:6](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/useConnect.ts#L6)

___

### useDisconnect

▸ **useDisconnect**(): () => `void`

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/hooks/useDisconnect.ts:3](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/useDisconnect.ts#L3)

___

### useEdition

▸ **useEdition**(`moduleAddress`): `Edition`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`Edition`

#### Defined in

[src/hooks/modules/useEdition.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useEdition.ts#L4)

___

### useEditionDrop

▸ **useEditionDrop**(`moduleAddress`): `EditionDrop`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`EditionDrop`

#### Defined in

[src/hooks/modules/useEditionDrop.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useEditionDrop.ts#L4)

___

### useMarketplace

▸ **useMarketplace**(`moduleAddress`): `Marketplace`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`Marketplace`

#### Defined in

[src/hooks/modules/useMarketplace.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useMarketplace.ts#L4)

___

### useNFTCollection

▸ **useNFTCollection**(`moduleAddress`): `NFTCollection`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`NFTCollection`

#### Defined in

[src/hooks/modules/useNFTCollection.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useNFTCollection.ts#L4)

___

### useNFTDrop

▸ **useNFTDrop**(`moduleAddress`): `NFTDrop`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`NFTDrop`

#### Defined in

[src/hooks/modules/useNFTDrop.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useNFTDrop.ts#L4)

___

### useNetwork

▸ `Const` **useNetwork**(): readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Returns

readonly [{ `data`: { `chain`: `undefined` \| { `blockExplorers?`: { `name`: `string` ; `url`: `string`  }[] ; `id`: `number` ; `name?`: `string` ; `nativeCurrency?`: { `decimals`: ``18`` ; `name`: `string` ; `symbol`: `string`  } ; `rpcUrls?`: `string`[] ; `testnet?`: `boolean` ; `unsupported`: `undefined` \| `boolean`  } ; `chains`: `Chain`[]  } ; `error`: `undefined` \| `Error` ; `loading`: `undefined` \| `boolean`  }, `undefined` \| (`chainId`: `number`) => `Promise`<{ `data`: `undefined` ; `error`: `SwitchChainError`  } \| { `data`: `undefined` \| `Chain` ; `error`: `undefined`  }\>]

#### Defined in

node_modules/wagmi/dist/declarations/src/hooks/accounts/useNetwork.d.ts:2

___

### usePackModule

▸ **usePackModule**(`moduleAddress`): `Pack`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`Pack`

#### Defined in

[src/hooks/modules/usePack.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/usePack.ts#L4)

___

### useSDK

▸ **useSDK**(): `ThirdwebSDK` \| `undefined`

#### Returns

`ThirdwebSDK` \| `undefined`

#### Defined in

[src/Provider.tsx:214](https://github.com/thirdweb-dev/react/blob/6e1d595/src/Provider.tsx#L214)

___

### useSigner

▸ **useSigner**(): `UseQueryResult`<`undefined` \| `Signer`, `unknown`\>

#### Returns

`UseQueryResult`<`undefined` \| `Signer`, `unknown`\>

#### Defined in

[src/hooks/useSigner.ts:5](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/useSigner.ts#L5)

___

### useToken

▸ **useToken**(`moduleAddress`): `Token`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`Token`

#### Defined in

[src/hooks/modules/useTokenModule.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useTokenModule.ts#L4)

___

### useVote

▸ **useVote**(`moduleAddress`): `Vote`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleAddress` | `string` |

#### Returns

`Vote`

#### Defined in

[src/hooks/modules/useVoteModule.ts:4](https://github.com/thirdweb-dev/react/blob/6e1d595/src/hooks/modules/useVoteModule.ts#L4)
