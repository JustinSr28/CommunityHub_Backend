const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: [true, "El campo 'user' es obligatorio"]
    },
    event: {
      type: Number,
      required: [true, "El campo 'event' es obligatorio"]
    },
    status: {
      type: String,
      required: [true, "El campo 'status' es obligatorio"],
      trim: true,
      enum: {
        values: ["confirmada", "cancelada"],
        message: "El estado '{VALUE}' no es válido"
      },
      default: "confirmada"
    },
    registeredAt: {
      type: Date,
      default: Date.now
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

// Evita que el mismo usuario se inscriba dos veces al mismo evento
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;