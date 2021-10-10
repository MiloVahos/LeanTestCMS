const AuditModel = require('./AuditModel')

const auditLogger = () => {
  return function (req, res, next) {
    const auditData = {
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      path: req.originalUrl,
      user: res.locals,
      method: req.method,
      payload: { body: req.body, params: req.params, query: req.query }
    }
    const audit = new AuditModel(auditData);
    audit.save().then(() => console.log('Audit log stored'));
    next()
  }
}

module.exports = { auditLogger }