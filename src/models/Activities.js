// const { Schema, model } = require("mongoose");
const { Schema, model } = require("./default");

const actividadesSchema = new Schema({
  userId: Number,
  sesionId: String,
  avatar: String,
  reasoningId: Number,
  memoryId: Number,
  languagueId: Number,
  processId: Number,
});

module.exports = model("Activities", actividadesSchema);
