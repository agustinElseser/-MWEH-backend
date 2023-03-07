import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usersRoutes from "./routes/usersRoutes.js";
import proyectsRoutes from "./routes/proyectsRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  },
};
app.use(cors(corsOptions));
app.use("/api/users", usersRoutes);
app.use("/api/proyects", proyectsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto: ${PORT}`);
});
