const mongoose = require('mongoose');

const AuditModel = mongoose.model('audit', {
  ip: String,
  path: String,
  user: Object,
  method: String,
  payload: Object
});

module.exports = AuditModel