module.exports = async function (req, res, proceed) {
  if (!req.me) {
    return res.unauthorized();
  }

  if (!req.me.isSuperAdmin) {
    return res.forbidden();
  }

  return proceed();

};
