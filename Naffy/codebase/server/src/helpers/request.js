export const request = {
  handle(handler) {
    if (typeof handler !== "function") {
      throw new Error("Request handler must be a function")
    }

    return async (req, res, next) => {
      try {
        const { status, message, data } = (await handler(req)) || {}
        return res.status(status || 200).json({ success: true, message, data })
      } catch (e) {
        next(e)
      }
    }
  },
}
