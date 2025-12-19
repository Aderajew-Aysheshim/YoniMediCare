const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// @route GET /api/audit
// @desc  List audit logs (admin only) - supports pagination and filters
// @access Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 25, action, resourceType, actor, q } = req.query;
    const filter = {};

    if (action) filter.action = action;
    if (resourceType) filter.resourceType = resourceType;
    if (actor) filter.actor = actor;
    if (q) filter.$or = [
      { 'details.name': { $regex: q, $options: 'i' } },
      { action: { $regex: q, $options: 'i' } },
    ];

    const logs = await AuditLog.find(filter)
      .populate('actor', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await AuditLog.countDocuments(filter);

    res.json({ logs, page: Number(page), limit: Number(limit), total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;