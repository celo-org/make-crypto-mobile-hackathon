'use strict';
var atob = require('atob');
const dirTree = require("directory-tree");
let tree = dirTree('./solana-signer/');
const fs = require('fs');
const express = require('express')
const morgan = require('morgan');
const { exec } = require('child_process');
const unirest = require('unirest');
const path = require('path');
const app = express()
const port = 8080

const APIGATEWAY = ""
const APIGATEWAY2 = "xxxxxxxxxx.execute-api.us-east-1.amazonaws.com"

function getInfoFromHTML(html, address) {
  let array = []
  for (let i = 0; i < html.length; i++) {
    let type = html[i].split('<span class="tile-label" data-test="transaction_type">\n')[1].split('\n')[0]
    let status = html[i].split('<span class="tile-status-label ml-2 ml-md-0" data-test="transaction_status">\n\n')[1].split('\n')[0]
    let from = html[i].split('<span class="d-none d-md-none d-xl-inline">')[1].split('</span>')[0]
    let to = html[i].split('<span class="d-none d-md-none d-xl-inline">')[2].split('</span>')[0]
    let fee = html[i].split('<span class="ml-0 ml-md-1 text-nowrap">\n')[1].split(' TX Fee')[0]
    let amount = html[i].split('<span class="col-xs-12 col-lg-4 ml-3 ml-sm-0">\n\n')[1].split('\n\n \n')[0]
    let currency = html[i].split(`<a data-test="token_link"`)[1].split('>')[1].split('<')[0]
    let link = html[i].split('<div class="text-truncate d-flex">\n<a class="text-truncate" data-test="transaction_hash_link" href="/tx/')[1].split('">')[0]
    let json = {
      type: type,
      status: status,
      from: from,
      to: to,
      fee: fee,
      amount: amount,
      currency: currency,
      inout: address===from?"out":"in",
      link: `https://alfajores-blockscout.celo-testnet.org/tx/${link}`
    }
    array.push(json)
  }
  return array
}

function findPrivateKey(address) {
  let privateKey = ""
  let data = fs.readFileSync("./user.json","utf-8")
  data = JSON.parse(data).users
  for (let i = 0; i < data.length; i++) {
    if (data[i].account === address) {
      privateKey = data[i].privateKey
      break;
    }
  }
  return privateKey
}

function check(json) {
  try {
    if (json.headers.forwarded.replace("host=", "").split(";")[2] === APIGATEWAY || json.headers.forwarded.replace("host=", "").split(";")[2] === APIGATEWAY2) {
      return true
    }
    else {
      return false
    }
  }
  catch (err) {
    return false
  }
}

app.use(morgan('dev'));
app.use(express.json())

app.get('/', async (req, res) => {
  if (check(req)) {
    res.send(`Hello From Kharon Server`)
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/create-new-account', async (req, res) => {
  if (check(req)) {
    exec(`celocli account:new`, async (error, stdout, stderr) => {
      if (error) {
        res.send(`Error, try again`)
      }
      else if (stderr) {
        res.send(`Error, try again`)
      }
      else {
        let result = stdout.split('\n');
        result.shift();
        result.shift();
        let myJSON = {
          "mnemonic": result[0].split(': ')[1],
          "account": result[1].split(': ')[1],
          "privateKey": result[2].split(': ')[1]
        }
        let data = fs.readFileSync("./user.json","utf-8")
        data = JSON.parse(data)
        data.users.push(myJSON)
        fs.writeFileSync("./user.json", JSON.stringify(data));
        res.send(myJSON)
      }
    });
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/testing', async (req, res) => {
  if (check(req)) {
    exec(`celocli account:balance ${req.headers.address}`, async (error, stdout, stderr) => {
      if (error) {
        res.send(`Error, try again`)
      }
      else if (stderr) {
        res.send(`Error, try again`)
      }
      else {
        let result = stdout.split('\n');
        result.shift();
        result.shift();
        result.shift();
        result.pop()
        let myJSON = {
          "CELO": result[0].split(': ')[1],
          "cUSD": result[1].split(': ')[1],
          "cEUR": result[2].split(': ')[1]
        }
        res.send(myJSON)
      }
    });

  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/get-balance', async (req, res) => {
  if (check(req)) {
    exec(`celocli account:balance ${req.headers.address}`, async (error, stdout, stderr) => {
      if (error) {
        res.send(`Error, try again`)
      }
      else if (stderr) {
        res.send(`Error, try again`)
      }
      else {
        let result = stdout.split('\n');
        result.shift();
        result.shift();
        result.shift();
        result.pop()
        let myJSON = {
          "CELO": result[0].split(': ')[1],
          "cUSD": result[1].split(': ')[1],
          "cEUR": result[2].split(': ')[1]
        }
        res.send(myJSON)
      }
    });

  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/get-transactions', async (req, res) => {
  if (check(req)) {
    let resp = await new Promise((resolve, reject) => {
      unirest('GET', `https://alfajores-blockscout.celo-testnet.org/address/${req.headers.address}/token-transfers?type=JSON`)
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          resolve(getInfoFromHTML(res.body.items,req.headers.address))
        });
    })
    res.send(resp)
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/transfer-celo', async (req, res) => {
  if (check(req)) {
    let privateKey = findPrivateKey(req.headers.from)
    if (privateKey === "") {
      res.send("Error, try again")
    }
    else{
      exec(`celocli transfer:celo --from ${req.headers.from} --to ${req.headers.to} --value ${req.headers.amount} --privateKey ${privateKey}`, async (error, stdout) => {
        if (error) {
          res.send(`Error, try again`)
        }
        else {
          let result = stdout.split('\n');
          let myjson={
            "check": result[1].indexOf("✔")!==-1?true:false,
            "txHash": result[3].split(': ')[1]
          }
          res.send(myjson)
        }
      });
    }
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.get('/get-rates', async (req, res) => {
  if (check(req)) {
      exec(`celocli exchange:show`, async (error, stdout) => {
        if (error) {
          res.send(`Error, try again`)
        }
        else {
          let result = stdout.split('\n');
          let myjson = {
            "cUSD": result[1].split('=> ')[1].split(' cUSD')[0]/1000000000000000000,
            "cEUR": result[4].split('=> ')[1].split(' cEUR')[0]/1000000000000000000,
          }
          res.send(myjson)
        }
      });
  }
  else {
    res.status(401).send("Unauthorized");
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})