import Proyect from "../models/proyect.js";

const myproyects = (user) => {
  return Proyect.find().where("user").equals(user);
};

export default myproyects;
