import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  /* birthDate: { type: Date, required: true },*/
  department: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

const User = model("User", usuarioSchema);

export default User;
