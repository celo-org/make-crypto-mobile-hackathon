const { gzipSync, gunzipSync, deflateSync, unzipSync } = require("zlib");

const compressions = {
  deflate: {
    compress(data) {
      return deflateSync(data);
    },

    decompress(data) {
      return unzipSync(data);
    },
  },

  gzip: {
    compress(data) {
      return gzipSync(data);
    },

    decompress(data) {
      return gunzipSync(data);
    },
  }
};

module.exports = compressions;
