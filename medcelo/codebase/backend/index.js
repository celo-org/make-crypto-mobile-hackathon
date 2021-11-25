const { Web3Storage } = require('web3.storage')

const fileUpload = require('express-fileupload');

const express = require('express')

const app = express()

const PORT = 8080

app.use(fileUpload())

const token = ''

const client = new Web3Storage({ token })

async function storeFiles (files) {
  const cid = await client.put(files)
}

app.get('/', async (req, res) => {
    res.send('hello world')
})

app.post('/', async (req, res) => {

//   storeFiles()

    if(!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('no file uploaded')
    }

    if(!req.files.thumbnail) {
        res.status(400).send('no thumbnail found')
    }

    if(!(req.files.thumbnail.mimetype == 'image/png' || req.files.thumbnail.mimetype == 'image/jpeg')) {
        res.status(400).send('invalid mimetype')
    }

    await storeFiles(req.files.thumbnail)


    res.send('successfully uploaded!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})