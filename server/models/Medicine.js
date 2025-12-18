const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide medicine name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
  },
  category: {
    type: String,
    required: [true, "Please provide category"],
    enum: [
      "Pain Relief",
      "Antibiotics",
      "Vitamins",
      "Cold & Flu",
      "Digestive Health",
      "Heart Health",
      "Diabetes",
      "Skin Care",
      "First Aid",
      "Other",
    ],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
    min: 0,
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: 0,
    default: 0,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x300?text=Medicine",
  },
  requiresPrescription: {
    type: Boolean,
    default: false,
  },
  manufacturer: {
    type: String,
    required: [true, "Please provide manufacturer name"],
  },
  dosage: {
    type: String,
  },
  sideEffects: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Medicine", medicineSchema);
