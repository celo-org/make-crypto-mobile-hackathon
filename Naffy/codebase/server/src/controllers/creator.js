import { Exception } from "../helpers/Exception.js"
import { Creator } from "../models/index.js"

export const creator = {
  async create(req) {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const category = req.body.category
    const address = req.body.address
    const owner = req.body.owner

    const existingCreator = await Creator.findOne({ owner })
    if (existingCreator) {
      throw new Exception("A creator is already associated with address", 400)
    }

    const creator = new Creator({ name, description, image, category, owner, address })
    await creator.save()

    return { message: "Creator created", data: creator }
  },

  async getMany(req) {
    const limit = req.query.limit
    const order = req.query.order
    const category = req.query.category

    let creators
    if (limit && order === "random") {
      creators = await Creator.aggregate().sample(Number(limit))
    } else if (limit && order !== "straight") {
      creators = await Creator.find({}).limit(limit).lean()
    } else if (category) {
      creators = await Creator.find({ category }).limit(limit).lean()
    } else {
      creators = await Creator.find({}).lean()
    }

    return { message: "Creators fetched", data: creators }
  },

  async getOne(req) {
    const _id = req.query.id
    const owner = req.query.owner
    const address = req.query.address

    let creator
    if (_id && _id !== "undefined") {
      creator = await Creator.findOne({ _id }).lean()
    } else {
      creator = await Creator.findOne({ $or: [{ address }, { owner }] }).lean()
    }

    if (!creator) {
      throw new Exception("Creator not found", 404)
    }

    return { message: "Creator fetched", data: creator }
  },

  async update(req) {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const category = req.body.category

    const creator = await Creator.findOne({ id: req.query.id })
    if (!creator) {
      throw new Exception("Creator does not exist", 400)
    }
    await Creator.updateOne({ _id: creator._id }, { name, description, image, category })

    return { message: "Creator updated" }
  },
}
