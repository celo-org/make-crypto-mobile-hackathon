import { request } from "../config/request"

export const api = {
  async newCreator(data) {
    try {
      const response = await request.post("/creator", data)
      return response.data
    } catch (e) {
      return e.response
    }
  },

  async updateCreatorProfile(id, data) {
    try {
      const response = await request.put("/creator?id=" + id, data)
      return response.data
    } catch (e) {
      return e.response
    }
  },

  async getCreators({ category } = {}) {
    try {
      if (category) {
        const response = await request.get("/creators?category=" + category)
        return response.data
      }
      const response = await request.get("/creators?order=random&limit=10")
      return response.data
    } catch (e) {
      return e.response
    }
  },

  async getCreator({ id, address, owner } = {}) {
    try {
      const response = await request.get(`/creator?id=${id}&address=${address}&owner=${owner}`)
      return response.data
    } catch (e) {
      return e.response
    }
  },
}
