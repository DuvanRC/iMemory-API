const { Schema, model } = require("./default");

const CambioContraseniaSchema = new Schema({
  userId: Number,
  oldPassword: String,
  newPassword: String,
});

module.exports = model("ChangePassword", CambioContraseniaSchema);
