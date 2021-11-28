import axios from "axios";

export default {
  async executeQuery(subgraphUrl: string, query: string): Promise<any> {
    const response = await axios.post(subgraphUrl, { query });
    return response.data;
  },
};
