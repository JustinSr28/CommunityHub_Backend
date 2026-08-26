const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo 'name' es obligatorio"],
      trim: true,
      unique: true
    },

    description: {
      type: String,
      required: [true, "El campo 'description' es obligatorio"],
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;