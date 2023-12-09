const { PageViewMessage } = require("./protobuf");

const PageViewHandler = (msg) => {
  console.log("PageViewMessage: " + msg);
};

const TOPICS = [
  {
    name: "/waku/2/analytics/page/count/base64",
    message: PageViewMessage,
    handler: PageViewHandler,
  },
];

module.exports = {
  TOPICS,
};
