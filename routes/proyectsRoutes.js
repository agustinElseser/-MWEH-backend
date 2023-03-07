import express from "express";

const router = express.Router();
import {
  aggregateProyect,
  obtenerProyects,
  exploreMain,
  myProyects,
  obtenerProyect,
  actualizarProyect,
  eliminarProyect,
  imgProyect,
} from "../controllers/proyectsController.js";
import checkAuth from "../middleware/authmiddleware.js";

router.route("/").post(checkAuth, aggregateProyect).get(exploreMain);
router.route("/myproyects").get(checkAuth, myProyects);

router
  .route("/:id")
  .get(checkAuth, obtenerProyect)
  .put(checkAuth, actualizarProyect)
  .delete(checkAuth, eliminarProyect);

router.route("/img/:id").get(imgProyect);

export default router;
