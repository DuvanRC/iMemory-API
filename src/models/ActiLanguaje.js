const { Schema, model } = require("./default");

const ActiLanguajeSchema = new Schema({
  description: String,
  status: Number,
});

module.exports = model("ActiLanguaje", ActiLanguajeSchema);
