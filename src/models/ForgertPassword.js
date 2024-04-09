const { Schema, model } = require("./default");

const OlvidoContraseniaSchema = new Schema({
  userId: Number,
  token: String,
  expirationDate: Date,
});

module.exports = model("ForgertPassword", OlvidoContraseniaSchema);
