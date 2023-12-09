const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const PageViewsScheme = require("./pageviews");

class ActivePageViewsSchemeClass {
  constructor() {
    this.Schema = new Schema(
      {
        page: { type: String, required: true },
        publicKeys: [
          {
            key: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
          },
        ],
        AppID: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}
const ActivePageViewsScheme = new ActivePageViewsSchemeClass();
module.exports = ActivePageViewsScheme.Schema;
