import mongoose from "mongoose"
import { creator } from "./Creator.js"

const { model, Schema } = mongoose

const Creator = creator(Schema, model)

export { Creator }
