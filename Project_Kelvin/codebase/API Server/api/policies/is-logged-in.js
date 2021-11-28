module.exports = async function (req, res, proceed) {

  if (req.me) {
    return proceed();
  }

  return res.unauthorized();

};
