const { Schema, model } = require("./default");

const ActiMemorySchema = new Schema({
  description: String,
  status: Number,
});

module.exports = model("ActiMemory", ActiMemorySchema);
