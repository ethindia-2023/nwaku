const mongoose = require("mongoose");
const identifierSchema = require("../schema/identifier");

class IdentifierModel {
  constructor(AuthToken, Logs = [], AppID) {
    this.model = mongoose.model("Identifier", identifierSchema);
    this.AuthToken = AuthToken;
    this.Logs = Logs;
    this.AppID = AppID;
  }

  async save() {
    try {
      const result = await this.model.create({
        AuthToken: this.AuthToken,
        Logs: this.Logs,
        AppID: this.AppID,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // idts use aayega
  async find() {
    try {
      const result = await this.model
        .findOne({ AppID: this.AppID })
        .select({ Logs: 1 })
        .lean();
      const logs = result ? result.Logs : [];

      const logsFormatted = logs.map((log) => ({
        timestamp: log.createdAt,
      }));

      return logsFormatted;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addLog(logtopush) {
    try {
      const result = await this.model.updateOne(
        { AppID: this.AppID },
        { $push: { Logs: logtopush } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findLogWithinAtomicTimeRange(start, end) {
    try {
      const result = await this.model
        .find({
          AppID: this.AppID,
          createdAt: { $gte: start, $lte: end },
        })
        .select({ Logs: 1, createdAt: 1 })
        .lean();
      const logs = result.map(({ Logs, createdAt }) => ({
        Logs,
        timestamp: createdAt,
      }));
      return logs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findLogsByGroupTimeRange(start, end, intervalInSeconds) {
    try {
      const result = await this.model
        .aggregate([
          {
            $match: {
              AppID: this.AppID,
              createdAt: { $gte: start, $lte: end },
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
                        1000 * intervalInSeconds,
                      ],
                    },
                  ],
                },
              },
              Logs: { $push: "$Logs" },
            },
          },
        ])
        .sort({ _id: 1 })
        .exec();
      const logs = result.map(({ Logs, _id }) => ({
        Logs,
        timestamp: _id,
      }));
      return logs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = IdentifierModel;
