const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g. 'confirm_payment', 'update_order_status', 'create_medicine'
  resourceType: { type: String, required: true }, // e.g. 'Order', 'Medicine'
  resourceId: { type: mongoose.Schema.Types.ObjectId, refPath: 'resourceType' },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  details: { type: Object }, // additional contextual data
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);