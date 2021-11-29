import { Exception } from "../helpers/Exception.js"

export const notFound = () => {
  return (_req, _res, next) => {
    const err = new Exception("Route does not exist", 404)
    return next(err)
  }
}
