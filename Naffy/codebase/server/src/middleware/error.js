export const error = () => {
  return (err, _req, res, _next) => {
    const message = err.message
    const status = err.status

    console.log(err)
    res.status(status || 500).json({ success: false, message })
  }
}
