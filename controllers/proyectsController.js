import Proyect from "../models/proyect.js";
import fs from "fs";

const aggregateProyect = async (req, res) => {
  const proyect = new Proyect(req.body);

  proyect.user = req.user._id;

  /*Prevenir proyectos duplicados*/
  const { name } = req.body;
  const proyectDuplicate = await Proyect.findOne({ name });
  if (proyectDuplicate) {
    const error = new Error("PROYECTO YA REGISTRADO");
    return res.status(400).json({ msg: error.message });
  }

  /*guardar proyecto*/
  try {
    const proyectGuardado = await proyect.save();

    res.json(proyectGuardado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyects = async (req, res) => {
  const proyects = await Proyect.find().where("user").equals(req.user);
  res.json(proyects);
};

const exploreMain = async (req, res) => {
  const proyects = await Proyect.find();
  res.json(proyects);
};

const myProyects = async (req, res) => {
  const proyects = await Proyect.find().where("user").equals(req.user);
  res.json(proyects);
};

const obtenerProyect = async (req, res) => {
  const { id } = req.params;
  const proyect = await Proyect.findById(id);

  if (!proyect) {
    return res.status(400).json({ msg: "PROYECTO NO ENCONTRADO" });
  }

  if (proyect.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "ACCION NO VALIDA" });
  }

  res.json(proyect);
};

const actualizarProyect = async (req, res) => {
  const { id } = req.params;
  const proyect = await Proyect.findById(id);

  if (!proyect) {
    return res.status(400).json({ msg: "PROYECTO NO ENCONTRADO" });
  }

  if (proyect.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "ACCION NO VALIDA" });
  }

  /*ACTUALIZANDO*/
  proyect.id == req.body.id || proyect.id;
  proyect.name = req.body.name || proyect.name;
  proyect.arquitect = req.body.arquitect || proyect.arquitect;
  proyect.area = req.body.area || proyect.area;
  proyect.site = req.body.site || proyect.site;
  proyect.year = req.body.year || proyect.year;
  proyect.proyectImg = req.body.proyectImg || proyect.proyectImg;
  try {
    const proyectActualizado = await proyect.save();
    res.json(proyectActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyect = async (req, res) => {
  const { id } = req.params;
  const proyect = await Proyect.findById(id);

  if (!proyect) {
    return res.status(400).json({ msg: "PROYECTO NO ENCONTRADO" });
  }

  if (proyect.user._id.toString() !== req.user._id.toString()) {
    return res.json({ msg: "ACCION NO VALIDA" });
  }
  try {
    await proyect.deleteOne();
    return res.json({ id: id, delete: true, msg: "PROYECTO ELIMINADO" });
  } catch (error) {
    console.log(error);
  }
};

const imgProyect = (req, res) => {
  const { id } = req.params;
};

export {
  aggregateProyect,
  obtenerProyects,
  myProyects,
  obtenerProyect,
  actualizarProyect,
  eliminarProyect,
  exploreMain,
  imgProyect,
};
