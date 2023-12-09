const { ActiveVisitorsModel } = require("../models/active-visitors");

exports.CreateNewPageVisit = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(
      req.body.publicKey,
      req.body.page,
      req.body.AppID
    );
    const result = await activeVisitors.savePageView();
    res.status(200).json({
      message: "Page visit added successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Page visit not added",
      error: error,
    });
  }
};

exports.findActivePageViewsOverTimeRange = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(
      [],
      req.body.page,
      req.body.AppID
    );
    const result = await activeVisitors.findActivePageViewsOverTimeRange(
      req.body.start,
      req.body.end
    );
    res.status(200).json({
      message: "Page visit fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Page visit not fetched",
      error: error,
    });
  }
};

exports.findActivePageViewsGroupedByTimeRange = async (req, res, next) => {
  try {
    const activeVisitors = new ActiveVisitorsModel(
      [],
      req.body.page,
      req.body.AppID
    );
    const result = await activeVisitors.findActivePageViewsGroupedByTimeRange(
      req.body.start,
      req.body.end,
      req.body.intervalInSeconds
    );
    res.status(200).json({
      message: "Page visit fetched successfully",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Page visit not fetched",
      error: error,
    });
  }
};
