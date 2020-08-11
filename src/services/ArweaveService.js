import Arweave from "arweave/web";
import { readContract, selectWeightedPstHolder } from "smartweave";

import { APP_NAME, APP_VERSION } from "../utils";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const contractId = "p04Jz3AO0cuGLzrgRG0s2BJbGL20HP1N8F9hsu6iFrE";

export default class ArweaveService {
  static getWalletAddress = (wallet) => {
    return arweave.wallets.jwkToAddress(wallet);
  };

  static getWalletAmount = (address) => {
    return arweave.wallets.getBalance(address);
  };

  static convertToAr = (amount) => {
    return arweave.ar.winstonToAr(amount);
  };

  static convertToWinston = (amount) => {
    return arweave.ar.arToWinston(amount);
  };

  static getTxStatus = async (txIds) => {
    const getAllStatus = await Promise.all(
      txIds.map((txId) => this.fetchStatus(txId))
    );
    return getAllStatus;
  };

  static fetchStatus = async (txId) => {
    const res = await fetch(`https://arweave.net/tx/${txId}/status`)
      .then((data) => data.json())
      .catch((err) => console.log(err));
    return res;
  };

  static payPST = async (wallet) => {
    const contractState = await readContract(arweave, contractId);
    const holder = selectWeightedPstHolder(contractState.balances);
    console.log(holder);
    const transaction = await arweave.createTransaction(
      {
        target: holder,
        quantity: arweave.ar.arToWinston("0.01"),
      },
      wallet
    );
    transaction.addTag("App-Name", APP_NAME);
    transaction.addTag("App-Version", APP_VERSION);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);
  };

  static getName = async (addr) => {
    let get_name_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "App-Name",
        expr2: "arweave-id",
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: addr,
        },
        expr2: {
          op: "equals",
          expr1: "Type",
          expr2: "name",
        },
      },
    };

    const txs = await arweave.api.post(`arql`, get_name_query);

    if (txs.data.length === 0) return addr;

    const tx = await arweave.transactions.get(txs.data[0]);
    return tx.get("data", { decode: true, string: true });
  };
}
