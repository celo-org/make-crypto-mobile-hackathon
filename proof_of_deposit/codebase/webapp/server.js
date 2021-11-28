const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const key_file = './certs/privkey.pem';
const cert_file = './certs/fullchain.pem';
const httpsOptions = {
  key: fs.existsSync(key_file) ? fs.readFileSync(key_file) : fs.readFileSync('./certs/localhost.key'),
  cert: fs.existsSync(cert_file) ? fs.readFileSync(cert_file) : fs.readFileSync('./certs/localhost.crt'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});