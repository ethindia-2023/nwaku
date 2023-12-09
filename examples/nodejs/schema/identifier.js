const mongoose = require("mongoose");
const { Schema, model } = mongoose;

class IdentifierSchemaClass {
  constructor() {
    this.schema = new Schema({
      AuthToken: { type: String, required: true },
      Logs: [{ type: Schema.Types.ObjectId, ref: "dateindexing" }],
      AppID: { type: String, required: true },
    },
    {
      timestamps: true,
    });
  }
}

const identitifierClass = new IdentifierSchemaClass();
module.exports = identitifierClass.schema;
