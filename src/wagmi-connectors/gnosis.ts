export const magic = () => "Gnosis!";

// import { Connector, ConnectorData } from "@wagmi/core";
// import { Signer } from "ethers";

// const IS_SERVER = typeof window === "undefined";

// export class GnosisConnector extends Connector {
//   getProvider(
//     config?:
//       | { chainId?: number | undefined; create?: boolean | undefined }
//       | undefined,
//   ): Promise<any> {
//     console.log("*** config", config);
//     throw new Error("Method not implemented.");
//   }
//   ready = !IS_SERVER;
//   readonly id = "gnosis";
//   readonly name = "Magic";

//   connect(): Promise<Required<ConnectorData<any>>> {
//     throw new Error("Method not implemented.");
//   }
//   disconnect(): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
//   getAccount(): Promise<string> {
//     throw new Error("Method not implemented.");
//   }
//   getChainId(): Promise<number> {
//     throw new Error("Method not implemented.");
//   }

//   getSigner(): Promise<Signer> {
//     throw new Error("Method not implemented.");
//   }
//   isAuthorized(): Promise<boolean> {
//     throw new Error("Method not implemented.");
//   }
//   protected onAccountsChanged(accounts: string[]): void {
//     console.log(accounts);
//     throw new Error("Method not implemented.");
//   }
//   protected onChainChanged(chain: string | number): void {
//     console.log(chain);
//     throw new Error("Method not implemented.");
//   }
//   protected onDisconnect(error: Error): void {
//     console.log(error);
//     throw new Error("Method not implemented.");
//   }
// }
