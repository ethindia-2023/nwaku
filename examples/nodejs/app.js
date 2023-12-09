const express = require("express");

const activeVisitorsRouter = require("./routers/active-visitors.js");
const dataIndexingRouter = require("./routers/data-indexing.js");
const identifierRouter = require("./routers/identifier.js");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.use("/activevisitors", activeVisitorsRouter);
app.use("/dataindexing", dataIndexingRouter);
app.use("/identifier", identifierRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
