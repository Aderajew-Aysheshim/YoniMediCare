const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// @route   GET /api/medicines
// @desc    Get all medicines with search and filter
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const medicines = await Medicine.find(query).sort(sort || { createdAt: -1 });
    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/medicines/:id
// @desc    Get single medicine by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/medicines
// @desc    Create a new medicine
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);

    // record audit
    const { recordAudit } = require("../utils/audit");
    await recordAudit({ req, actorId: req.user._id, action: 'create_medicine', resourceType: 'Medicine', resourceId: medicine._id, details: { name: medicine.name } });

    res.status(201).json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/medicines/:id
// @desc    Update medicine
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body, {
      new: true,
      runValidators: true,
    }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // record audit
    const { recordAudit } = require("../utils/audit");
    await recordAudit({ req, actorId: req.user._id, action: 'update_medicine', resourceType: 'Medicine', resourceId: medicine._id, details: req.body });

    res.json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/medicines/:id
// @desc    Delete medicine
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    // record audit
    const { recordAudit } = require("../utils/audit");
    await recordAudit({ req, actorId: req.user._id, action: 'delete_medicine', resourceType: 'Medicine', resourceId: medicine._id, details: { name: medicine.name } });

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;