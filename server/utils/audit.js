const AuditLog = require('../models/AuditLog');

async function recordAudit({ req, actorId, action, resourceType, resourceId, details }) {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection ? .remoteAddress;
    const userAgent = req.headers['user-agent'];

    await AuditLog.create({
      action,
      resourceType,
      resourceId,
      actor: actorId,
      details,
      ip,
      userAgent,
    });
  } catch (err) {
    // Don't fail the request if audit logging fails; just log server-side
    console.error('Failed to record audit:', err.message || err);
  }
}

module.exports = { recordAudit };