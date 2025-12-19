const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Medicine = require("../models/Medicine");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { items, deliveryAddress, prescriptionImage } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Calculate total amount and verify stock
    let totalAmount = 0;
    for (let item of items) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res
          .status(404)
          .json({ message: `Medicine not found: ${item.medicine}` });
      }
      if (medicine.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${medicine.name}. Available: ${medicine.stock}`,
        });
      }
      totalAmount += medicine.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      prescriptionImage,
    });

    // Update medicine stock
    for (let item of items) {
      await Medicine.findByIdAndUpdate(item.medicine, {
        $inc: { stock: -item.quantity },
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email phone")
      .populate("items.medicine");

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.medicine")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("items.medicine");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Make sure user owns this order or is admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/orders/admin/all
// @desc    Get all orders (admin only)
// @access  Private/Admin
router.get("/admin/all", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.medicine")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    )
      .populate("user", "name email phone")
      .populate("items.medicine");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/orders/:id/confirm-payment
// @desc    Confirm payment for an order (admin only)
// @access  Private/Admin
router.put("/:id/confirm-payment", protect, admin, async (req, res) => {
  try {
    const { method, transactionId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.payment = {
      confirmed: true,
      method: method || "manual",
      transactionId: transactionId || "",
      confirmedAt: Date.now(),
    };

    // Advance status if still pending
    if (order.status === "pending") order.status = "processing";

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email phone")
      .populate("items.medicine");

    res.json(populatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/orders/admin/stats
// @desc    Get order statistics (admin only)
// @access  Private/Admin
router.get("/admin/stats", protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const statusCounts = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const revenueByMonth = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0] ? .total || 0,
      statusCounts,
      revenueByMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;