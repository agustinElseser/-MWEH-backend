import mongoose from "mongoose";
import generarId from "../helpers/id.js";
import bcrypt from "bcrypt";
import myproyects from "../helpers/myproyects.js";

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  token: {
    type: String,
    default: generarId(),
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  myProyects: {
    type: Array,
  },
  favourite: {
    type: Array,
    default: [],
  },
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

const User = mongoose.model("user", usersSchema);

export default User;
