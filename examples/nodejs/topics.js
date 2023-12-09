const { PageViewMessage, TransactionMessage } = require("./protobuf");
const ActiveVisitorsModel = require("./models/active-visitors");
const TransactionModel = require("./models/transaction");

const PageViewHandler = (msg) => {
  const parsed = JSON.parse(msg.payload);
  const visitor = new ActiveVisitorsModel(
    parsed.userWallet ? parsed.userWallet : "",
    parsed.pageUrl,
    parsed.appId
  );
  visitor
    .savePageView()
    .then((result) => {
      console.log("PageViewMessage saved: " + result);
    })
    .catch((err) => {
      console.error("Error saving PageViewMessage: " + err);
    });
};

const TransactionHandler = (msg) => {
  const parsed = JSON.parse(msg.payload);
  TransactionModel.init(parsed.txHash, parsed.rpc, parsed.appId).then((tx) => {
    tx.save()
      .then((result) => {
        console.log("Tx saved: ");
      })
      .catch((err) => {
        console.error("Error saving PageViewMessage: " + err);
      });
  });
};

const TOPICS = [
  {
    name: "/waku/2/analytics/page/count/base64",
    message: PageViewMessage,
    handler: PageViewHandler,
  },
  {
    name: "/waku/2/analytics/tx/index/base64",
    message: TransactionMessage,
    handler: TransactionHandler,
  },
];

module.exports = {
  TOPICS,
};
