export const creator = (Schema, model) => {
  const schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  })

  schema.index({ address: 1, owner: 1 })
  return model("Creator", schema)
}
