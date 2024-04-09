// const { Schema, model } = require("mongoose");

const SesionSchema = new Schema({
  userId: Number,
  levelId: Number,
  activitiesId: Number,
});

module.exports = model("Sesion", SesionSchema);
