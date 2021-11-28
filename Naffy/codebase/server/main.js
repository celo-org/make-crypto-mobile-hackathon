import express from "express"
import http from "http"
import mongoose from "mongoose"
import cors from "cors"
import { logger } from "./src/config/logger.js"
import { router } from "./src/config/router.js"
import { notFound } from "./src/middleware/404.js"
import { error } from "./src/middleware/error.js"

const app = express()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/fundsail"
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use("*", notFound())
app.use(error())

mongoose.connect(DATABASE_URL, mongooseOptions).then(() => logger.info("Connection to MongoDB has been established"))
http.createServer(app).listen(PORT, HOST, () => {
  logger.info(`Server is listening on port ${PORT}`)
})
