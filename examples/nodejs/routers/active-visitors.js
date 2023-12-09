const { Router } = require("express");
const controller = require("../controllers/active-visitors.js");

const router = Router();

router.post("/active-visitors", controller.CreateNewPageVisit);
router.post(
  "/active-visitors-over-time",
  controller.findActivePageViewsOverTimeRange
);
router.post(
  "/active-visitors-grouped",
  controller.findActivePageViewsGroupedByTimeRange
);

module.exports = router;
