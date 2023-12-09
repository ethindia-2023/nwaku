const mongoose = require("mongoose");
const txScheme = require("../schema/transactions");
const axios = require("axios");
class TransactionModel {
  constructor(
    AppID,
    blockNumber,
    from,
    gas,
    gasPrice,
    hash,
    input,
    to,
    value,
    transactionIndex,
    logs,
    logsBloom,
    chainId,
    addtionalOptions = null
  ) {
    this.model = mongoose.model("transactions", txScheme);
    this.AppID = AppID;
    this.blockNumber = blockNumber;
    this.from = from;
    this.gas = gas;
    this.gasPrice = gasPrice;
    this.hash = hash;
    this.input = input;
    this.to = to;
    this.value = value;
    this.transactionIndex = transactionIndex;
    this.logs = logs;
    this.logsBloom = logsBloom;
    this.chainId = chainId;
    this.addtionalOptions = addtionalOptions;
  }

  static async init(txhash, rpc, AppID, addtionalOptions = null) {
    const response1 = await axios.post(
      rpc,
      `{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["${txhash}"],"id":1}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const response2 = await axios.post(
      rpc,
      `{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["${txhash}"],"id":1}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const response3 = await axios.post(
      rpc,
      `{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return new TransactionModel(
      AppID,
      response1.data.result.blockNumber,
      response1.data.result.from,
      response1.data.result.gas,
      response1.data.result.gasPrice,
      response1.data.result.hash,
      response1.data.result.input,
      response1.data.result.to,
      response1.data.result.value,
      response1.data.result.transactionIndex,
      response2.data.result.logs,
      response2.data.result.logsBloom,
      response3.data.result,
      addtionalOptions
    );
  }

  async save() {
    try {
      const result = await this.model.create({
        AppID: this.AppID,
        blockNumber: this.blockNumber,
        from: this.from,
        gas: this.gas,
        gasPrice: this.gasPrice,
        hash: this.hash,
        input: this.input,
        to: this.to,
        value: this.value,
        transactionIndex: this.transactionIndex,
        logs: this.logs,
        logsBloom: this.logsBloom,
        chainId: this.chainId,
        addtionalOptions: this.addtionalOptions,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async filterTxOverTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          AppID: this.AppID,
          createdAt: { $gte: start, $lte: end },
        })
        //select all fields except _id
        .select({ _id: 0, __v: 0 })
        .lean();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = TransactionModel;
