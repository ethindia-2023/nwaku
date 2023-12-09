const { TOPICS } = require("./topics");

const handler = (msg) => {
  const parsedMsg = JSON.parse(msg);
  const topic = TOPICS.filter((topic) => topic.name === parsedMsg.pubsubTopic);
  if (topic.length > 0) {
    topic[0].handler(parsedMsg.wakuMessage);
  }
};

module.exports = {
  handler,
};
