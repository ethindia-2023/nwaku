const { IdentifierModel } = require("../models/identitfier");

exports.createNewProject = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(
      req.body.AuthToken,
      [],
      req.body.AppID
    );
    const result = await identifier.save();
    res.status(200).json({
      message: "Identifier saved successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Identifier not saved",
      error: error,
    });
  }
};

exports.findProjectAuthTokenByAppID = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.find();
    res.status(200).json({
      message: "Identifier fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Identifier not fetched",
      error: error,
    });
  }
};

exports.AddLogtoLogs = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.addLog(req.body.logtopush);
    res.status(200).json({
      message: "Log added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not added",
      error: error,
    });
  }
};

exports.findLogWithinAtomicTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.findLogWithinAtomicTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "Log fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not fetched",
      error: error,
    });
  }
};

exports.findLogsByGroupedTimeRange = async (req, res, next) => {
  try {
    const identifier = new IdentifierModel(null, [], req.body.AppID);
    const result = await identifier.findLogsByGroupedTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "Log fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Log not fetched",
      error: error,
    });
  }
};
