var express = require("express");
var app = express();
var wakuMod = require("bindings")("waku");
const { TOPICS } = require("./topics");
const { handler } = require("./handler");
const Database = require("./utils/db");

var cfg = `{
    "host": "0.0.0.0",
    "port": 60001,
    "key": "364d111d729a6eb6d3e6113e163f017b5ef03a6f94c9b5b7bb1bb36fa5cb07a9",
    "relay": true
}`;

wakuMod.wakuNew(cfg);

wakuMod.wakuVersion(function (msg) {
  console.log("Waku Version: " + msg);
});

wakuMod.wakuDefaultPubsubTopic(function (msg) {
  defaultPubsubTopic = msg;
});

for (var i = 0; i < TOPICS.length; i++) {
  wakuMod.wakuRelaySubscribe(TOPICS[i].name, function onErr(msg) {
    console.log("Error subscribing: " + msg);
  });
}

console.log("Setting callback event callback function");
wakuMod.wakuSetEventCallback(handler);

wakuMod.wakuStart();

wakuMod.wakuConnect(
  "/ip4/127.0.0.1/tcp/60000/p2p/16Uiu2HAmVFXtAfSj4EiR7mL2KvL4EE2wztuQgUSBoj2Jx2KeXFLN",
  10000,
  function onErr(msg) {
    console.log("Error connecting node: " + msg);
  }
);

app.post("/publish", function (req, res) {
  console.log("Publish event received");
  res.end(JSON.stringify("OK publish"));
});

var server = app.listen(8081, async function () {
  var host = server.address().address;
  var port = server.address().port;
  const db = new Database()
  await db.connect();
  console.log("Example waku listening at http://%s:%s", host, port);
});
