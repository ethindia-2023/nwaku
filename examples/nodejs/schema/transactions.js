const mongoose = require("mongoose");
const { Schema, model } = mongoose;

class TrackTransacionClass {
  constructor() {
    this.Schema = new Schema({
      AppID: { type: String, required: true },
      blockNumber: { type: String, required: true },
      from: { type: String, required: true },
      gas: { type: String, required: true },
      gasPrice: { type: String, required: true },
      hash: { type: String, required: true },
      input: { type: String, required: true },
      to: { type: String, required: true },
      value: { type: String, required: true },
      transactionIndex: { type: String, required: true },
      logs: { type: Array, required: true },
      logsBloom: { type: String, required: true },
      chainId: { type: String, required: true },
      timestamp: { type: String, default: Date.now },
    });
  }
}
const TransactionScheme = new TrackTransacionClass();
module.exports = TransactionScheme.Schema;
