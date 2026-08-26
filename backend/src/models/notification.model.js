const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El campo 'user' es obligatorio"]
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "El campo 'event' es obligatorio"]
    },
    type: {
      type: String,
      enum: ["recordatorio"],
      default: "recordatorio"
    },
    message: {
      type: String,
      required: [true, "El campo 'message' es obligatorio"],
      trim: true
    },
    read: {
      type: Boolean,
      default: false
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

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;