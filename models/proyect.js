import mongoose from "mongoose";

const proyectsSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    arquitect: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: Number,
      required: true,
    },
    site: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    proyectImg: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Proyect = mongoose.model("proyect", proyectsSchema);

export default Proyect;
