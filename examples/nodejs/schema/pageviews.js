const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

class PageViewsSchemeClass {
  constructor() {
    this.Schema = new Schema(
      {
        counter: { type: Number, required: true, default: 1 },
      },
      {
        timestamps: true,
      }
    );
  }
}

const PageViewsScheme = new PageViewsSchemeClass();
PageViewsScheme.Schema.plugin(AutoIncrement, { inc_field: "counter" });
module.exports = model("pageviews", PageViewsScheme.Schema);
