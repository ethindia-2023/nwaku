const protobuf = require("protobufjs");

const PageViewMessage = new protobuf.Type("PageViewMessage")
  .add(new protobuf.Field("appId", 1, "string"))
  .add(new protobuf.Field("userWallet", 2, "string"))
  .add(new protobuf.Field("pageUrl", 3, "string"));

const TransactionMessage = new protobuf.Type("TransactionMessage")
    .add(new protobuf.Field("appId", 1, "string"))
    .add(new protobuf.Field("txHash", 2, "string"))
    .add(new protobuf.Field("rpc", 3, "string"));

module.exports = {
  PageViewMessage,
  TransactionMessage
};
