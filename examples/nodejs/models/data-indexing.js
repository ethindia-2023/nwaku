const { mongoose } = require("mongoose");
const { dataIndexingClass } = require("../schema/date-indexing");

class dataIndexingModel {
  constructor(Page, AppID) {
    this.model = mongoose.model("dateindexing", dataIndexingClass);
    this.Page = Page;
    this.AppID = AppID;
  }
  // checks if a pages is already been created it updates the Pages array otherwise it creates a new entry and saves the page in that Pages array
  async addPage() {
    try {
      const result = await this.model.updateOne(
        { AppID: this.AppID },
        { $addToSet: { Pages: this.Page } },
        { upsert: true }
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // cron job use karega
  async addCID(CID) {
    // Should add a CID to the latest document whose CID is null right now
    // CID is a string
    const result = await this.model.updateOne(
      {
        CID: null,
        AppID: this.AppID,
      },
      { CID: CID }
    );
    return result;
  }

  async findCIDByGroupTimeRange(start, end, intervalInSeconds) {
    try {
      const result = await this.model
        .aggregate([
          {
            $match: {
              createdAt: { $gte: start, $lte: end },
              AppID: this.AppID,
            },
          },
          {
            $group: {
              _id: {
                $toDate: {
                  $subtract: [
                    { $toLong: "$createdAt" },
                    {
                      $mod: [
                        { $toLong: "$createdAt" },
                        intervalInSeconds * 1000,
                      ],
                    },
                  ],
                },
              },
              CID: { $push: "$CID" },
            },
          },
        ])
        .sort({ _id: 1 })
        .exec();
      const CID = result.map(({ CID, _id }) => ({
        CID,
        timestamp: _id,
      }));
      return CID;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findCIDWithinAtomicTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          createdAt: { $gte: start, $lte: end },
          AppID: this.AppID,
        })
        .select({ CID: 1, createdAt: 1 })
        .lean();
      const CID = result.map(({ CID, createdAt }) => ({
        CID,
        timestamp: createdAt,
      }));
      return CID;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async find_page_by_time_range(start, end) {
    try {
      const result = await this.model
        .find({
          createdAt: { $gte: start, $lte: end },
          AppID: this.AppID,
        })
        .select({ Pages: 1, createdAt: 1 })
        .lean();
      const Pages = result.map(({ Pages, createdAt }) => ({
        Pages,
        timestamp: createdAt,
      }));
      return Pages;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findPagesByGroupTimeRange(start, end, intervalInSeconds) {
    try {
      const result = await this.model
        .aggregate([
          {
            $match: {
              createdAt: { $gte: start, $lte: end },
              AppID: this.AppID,
            },
          },
          {
            $group: {
              _id: {
                $toDate: {
                  $subtract: [
                    { $toLong: "$createdAt" },
                    {
                      $mod: [
                        { $toLong: "$createdAt" },
                        intervalInSeconds * 1000,
                      ],
                    },
                  ],
                },
              },
              Pages: { $push: "$Pages" },
            },
          },
        ])
        .sort({ _id: 1 })
        .exec();
      const Pages = result.map(({ Pages, _id }) => ({
        Pages,
        timestamp: _id,
      }));
      return Pages;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = dataIndexingModel;
