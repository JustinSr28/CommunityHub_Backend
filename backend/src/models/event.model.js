const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El campo 'titulo' es obligatorio"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "El campo 'descripcion' es obligatorio"],
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "El campo 'category' es obligatorio"]
    },
    date: {
      type: Date,
      required: [true, "El campo 'date' es obligatorio"]
    },

    time: {
      type: String,
      required: [true, "El campo 'time' es obligatorio"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "El campo 'location' es obligatorio"],
      trim: true
    },
    max_capacity: {
      type: Number,
      required: [true, "El campo 'max_capacity' es obligatorio"],
      trim: true
    },
    image: {
      type: String,
      required: [true, "El campo 'image' es obligatorio"],
      trim: true
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
      required: [true, "El campo 'organizer' es obligatorio"],
    },
    status: {
      type: String,
      required: [true, "El campo 'status' es obligatorio"],
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    }
  }
);


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;