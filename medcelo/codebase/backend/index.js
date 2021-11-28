const { Web3Storage, getFilesFromPath } = require("web3.storage");

const fileUpload = require("express-fileupload");

const { forceSync } = require("node-force-sync");

const express = require("express");

const fs = require("fs");

const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

const PORT = 8080;

app.use(fileUpload());

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg0YTJkMTRhRTIxYzBGZDUzNDlkNkIyN0VhNTZlMTc5ODM5NEE4MGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzc0NDE0MjYxMTYsIm5hbWUiOiJtZWRjZWxvIn0.wBq0DP94-PfHyL585R9guBCDsn0OFEuUejGKPRx1wH0";

const client = new Web3Storage({ token });

async function storeFiles(files, filename) {
  const stream = await getFilesFromPath(files);

  const cid = await client.put(stream);

  return `${cid}.ipfs.dweb.link/${filename}`;
}

app.get("/", async (req, res) => {
  res.send(`<form method="POST" action="" enctype="multipart/form-data">
    <h2>Upload File</h2>
    <input type="file" name="thumbnails" multiple>
    <button type="submit">
   </form>`);
});

app.post("/", (req, res) => {
  //   storeFiles()
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("no file uploaded");
  }

  const thumbnails = req.files.thumbnails;

  if (!thumbnails) {
    return res.status(400).send("no thumbnails found");
  }

  try {
    thumbnails.forEach((thumbnail) => {
      if (
        !(
          thumbnail.mimetype == "image/png" ||
          thumbnail.mimetype == "image/jpeg" ||
          thumbnail.mimetype == "image/jpg"
        )
      ) {
        throw Error;
      }
    });
  } catch (e) {
    return res.status(400).send("invalid mimetype");
  }

  var cids = [];

  try {
    thumbnails.forEach(async function (thumbnail) {
      const uploadPath = __dirname + "/upload/" + thumbnail.md5 + ".jpeg";

      thumbnail.mv(uploadPath, async function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });

      const syncStoreFiles = forceSync(storeFiles);

      const cid = storeFiles(uploadPath, thumbnail.md5);

      cids.push(cid);
    });

    Promise.all(cids).then((values) => {
      thumbnails.forEach(async function (thumbnail) {
        try {
          const uploadPath = "./upload/" + thumbnail.md5 + ".jpeg";
          fs.unlinkSync(uploadPath);
        } catch (error) {
          console.log(error);
        }
      });
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
      return res.send(values);
    });
  } catch (error) {
    return res.status(400).send("couldn't upload file");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
