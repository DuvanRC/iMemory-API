// const { Schema, model } = require("mongoose");
const { Schema, model } = require("./default");

const SesionSchema = new Schema({
  userId: Number,
  levelId: Number,
  activitiesId: Number,
});

module.exports = model("Sesion", SesionSchema);
