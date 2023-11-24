function errorMessage(res, error, status) {
  console.error(error);
  res.status(status).json({
    message: `${error}`,
    status: status,
  });
}
module.exports = errorMessage