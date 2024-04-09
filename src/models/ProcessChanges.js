// const { Schema, model } = require("mongoose");
const { Schema, model } = require("./default");

const ProcesoCambiosSchema = new Schema({
  reminder: String,
  levelId: Number,
  record: String,
  userId: Number,
});

module.exports = model("ProcessChanges", ProcesoCambiosSchema);
