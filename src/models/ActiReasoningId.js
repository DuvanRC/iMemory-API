const { Schema, model } = require("./default");

const ActiReasoningIdSchema = new Schema({
  description: String,
  status: Number,
});

module.exports = model("ActiReasoningId", ActiReasoningIdSchema);
