const { Router } = require("express");

const controller = require("../controllers/data-indexing.js");

const router = Router();

router.post("/data-indexing", controller.addSinglePageToPages);
router.post("/cid", controller.addCID);
router.post("/cid-grouped", controller.getCIDByGroupTimeRange);
router.post("/cid-atomic", controller.getCIDWithinAtomicTimeRange);
router.post("/page-by-time-range", controller.getPageByTimeRange);
router.post(
  "/find-page-by-group-time-range",
  controller.findPagesByGroupTimeRange
);

module.exports = router;
