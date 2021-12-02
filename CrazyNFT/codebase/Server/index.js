const firestore = require('firebase/firestore')
const admin = require('firebase-admin');
const serviceAccount = require('./crazyapp-65a8b-firebase-adminsdk-kt7ur-edad48ebb7.json');
const express = require('express');
const { response } = require('express');
const Web3 = require('web3')
const { newKitFromWeb3 } = require('@celo/contractkit')
const { ethers } = require("ethers");
const { CeloProvider } = require('@celo-tools/celo-ethers-wrapper');
const { contract_abi, contract_address, chain_id } = require('./constants')
const https = require('https')

const app = express()
const port = 3000

const notWeb3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = newKitFromWeb3(notWeb3);
const web3 = kit.web3

const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
const signer = provider.getSigner()


admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.get('/', (req, res) => {
    res.end(JSON.stringify({ result: 'Hello World' }));
});


app.get('/api/login', (req, res) => {
    if(req.query.uid == null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        getPrivateKey(req.query.uid).then((key)=>{
            res.end(JSON.stringify({result: 'done'}))
            
        }).catch((e)=>{
            admin.auth().getUser(req.query.uid).then((response)=>{
                const account = web3.eth.accounts.create()
                db.collection("users").doc(req.query.uid).set({
                    uid: req.query.uid,
                    address: account.address,
                    privateKey: account.privateKey
                }).then(
                    res.end(JSON.stringify({result: 'done'}))
                ).catch((e) => {
                    res.statusCode =500
                    res.end(JSON.stringify({result: "error"}))
            })
                
            }).catch((e) => {
                res.statusCode =400
                res.end(JSON.stringify({result: "error"}))
        })
        })
    }
})

app.get('/api/address', (req, res) => {
    if(req.query.uid == null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        getPrivateKey(req.query.uid).then((key)=>{
            const address = web3.eth.accounts.privateKeyToAccount(key).address;
            res.statusCode = 200
            res.end(JSON.stringify({result: address}))
            
        }).catch((e)=>{
            res.statusCode = 400
            res.end(JSON.stringify({result: 'no private key'}))
        })
    }
})

app.get('/api/getBalance', (req, res) => {
    if(req.query.uid == null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        getPrivateKey(req.query.uid).then((key)=>{
            const address = web3.eth.accounts.privateKeyToAccount(key).address;
            web3.eth.getBalance(address).then((balance)=> {
                res.statusCode=200
                res.end(JSON.stringify({result: web3.utils.fromWei(balance)}))
            }).catch((e)=>{
                res.statusCode = 500
                res.end(JSON.stringify({result: 'error'}))
            });
            
        }).catch((e)=>{
            res.statusCode = 400
            res.end(JSON.stringify({result: 'no private key'}))
        })
    }
})

app.get('/api/lazymint', (req, res) => {
    if(req.query.uri == null || req.query.minPrice == null || req.query.uid == null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'invalid inputs'}))
    } else {
        const uri = req.query.uri
        const minPrice = req.query.minPrice
        const uid = req.query.uid
        createVoucher(uri, minPrice, uid).then((voucher)=> {
            db.collection('lazynft').add({...voucher, uid}).then((response)=>{
                res.statusCode = 200
                res.end(JSON.stringify({result: 'done'}))
            }).catch((error)=>{
                res.statusCode = 500
                res.end(JSON.stringify({result: 'error'}))
            })
        }).catch((error)=>{
            res.statusCode = 500
            res.end(JSON.stringify({result: 'error'}))
        })


    }
})

app.get('/api/getWithdrawBalance', (req, res) => {
    if(req.query.uid==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        const uid = req.query.uid
        getPrivateKey(uid).then((key) => {
            const address = web3.eth.accounts.privateKeyToAccount(key).address;
            availableToWithdraw(address).then((value) => {
                res.statusCode = 200
                res.end(JSON.stringify({result: value}))
            }).catch((error) => {
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            })
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/getURI', (req, res) => {
    if(req.query.id==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'token id not given'}))
    } else {
        const id = req.query.id
        getURI(id).then((value) => {
            res.statusCode = 200
            res.end(JSON.stringify({result: value}))
        }).catch((error) => {
            res.statusCode = 500
            console.log(error)
            res.end(JSON.stringify({result: 'error has occurred'}))
        })
       
    }
})

app.get('/api/redeem', (req, res) => {
    if(req.query.doc==null || req.query.uid==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'invalid values'}))
    } else {
        const doc = req.query.doc
        const uid = req.query.uid
        db.collection("lazynft").doc(doc).get().then((response) => {
            const voucher = response.data()
            delete voucher['uid']
            getPrivateKey(uid).then((key)=>{
                redeemNFT(voucher, key).then((tokenId) => {
                    db.collection("lazynft").doc(doc).delete().then((response) => {
                        
                        db.collection("ownednft").doc(String(tokenId)).set({
                            uid: uid,
                            tokenId: tokenId
                        }).then((response)=>{
                            res.statusCode=200
                            res.end(JSON.stringify({result: 'done'}))
                        }).catch((error) => {
                            res.statusCode = 500
                            res.end(JSON.stringify({result: 'an error occurred'}))
                        })
                    }).catch((error) => {
                        res.statusCode = 500
                        res.end(JSON.stringify({result: 'an error occurred'}))
                    })
                }).catch((error) => {
                    res.statusCode = 500
                    res.end(JSON.stringify({result: String(error)}))
                })
            }).catch((error) => {
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            })
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/marketplace', (req, res) => {
        var nfts = []
        db.collection("lazynft").get().then((response)=>{
            response.docs.map((value)=>nfts.push({id: value.id, ...value.data()}))
            res.statusCode = 200
            res.end(JSON.stringify({result: nfts}))
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
})

app.get('/api/ownednft', (req, res) => {
    if(req.query.uid==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        var uid = req.query.uid
        var nfts = []
        db.collection("ownednft").where('uid', '==', uid).get().then((response)=>{
            response.docs.map((value)=>nfts.push(value.data()))
            res.statusCode = 200
            res.end(JSON.stringify({result: nfts}))
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/withdraw', (req, res) => {
    if(req.query.uid==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        const uid = req.query.uid
        getPrivateKey(uid).then((key) => {
            withdraw(key).then((value) => {
                res.statusCode = 200
                res.end(JSON.stringify({result: 'done'}))
            }).catch((error) => {
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            })
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})



app.get('/api/transfer', (req, res) => {
    if(req.query.uid==null || req.query.id==null || req.query.address==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'invalid inputs'}))
    } else {
        const uid = req.query.uid
        const id = req.query.id
        const address = req.query.address
        getPrivateKey(uid).then((key) => {
            transferFrom(key, address, id).then((value) => {
                db.collection("ownednft").doc(id).delete().then((response)=> {
                    res.statusCode = 200
                res.end(JSON.stringify({result: 'done'}))
                }).catch((error) => {
                    res.statusCode = 500
                    res.end(JSON.stringify({result: 'an error occurred'}))
                })
            }).catch((error) => {
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            })
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/sendCelo', (req, res) => {
    if(req.query.uid==null || req.query.amount==null || req.query.address==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'invalid inputs'}))
    } else {
        const uid = req.query.uid
        const amount = req.query.amount
        const address = req.query.address
        getPrivateKey(uid).then((key) => {
            sendCelo(key, address, amount).then((value) => {
                res.statusCode = 200
                res.end(JSON.stringify({result: 'done'}))
            }).catch((error) => {
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            })
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/tokenTransfers', (req, res) => {
    if(req.query.uid==null){
        res.statusCode = 400
        res.end(JSON.stringify({result: 'uid not given'}))
    } else {
        const uid = req.query.uid
        getPrivateKey(uid).then((key) => {
            const address = web3.eth.accounts.privateKeyToAccount(key).address;
            const url = 'https://alfajores-blockscout.celo-testnet.org/api?module=account&action=tokentx&address='+address+'&contractAddress='+contract_address
            https.get(url, function(response){
                var body = '';
            
                response.on('data', function(chunk){
                    body += chunk;
                });
            
                response.on('end', function(){
                    var transfers = JSON.parse(body);
                    res.statusCode = 200
                    res.end(JSON.stringify(transfers))
                });
            }).on('error', function(e){
                res.statusCode = 500
                res.end(JSON.stringify({result: 'an error occurred'}))
            });
            
        }).catch((error) => {
            res.statusCode = 500
            res.end(JSON.stringify({result: 'an error occurred'}))
        })
    }
})

app.get('/api/values', (req, res) => {
    var contract = new web3.eth.Contract(contract_abi, contract_address, {from: "0x1E87Dc193d890849941F0Bf4532d8BbB366Da2E1"});
contract.events.Transfer(
  {filter: {from: "0x1E87Dc193d890849941F0Bf4532d8BbB366Da2E1"}, fromBlock: 0},
  function(error, event){ console.log(event); })
});

async function getPrivateKey(uid){
    const ref = db.collection("users").doc(uid)
    const doc = await ref.get()
    return doc.data().privateKey
}

async function createVoucher(uri, minPrice = 0, uid) {
    const voucher = { uri, minPrice }
    const domain = {
        name: "MobileNFT",
        version: "1",
        chainId: chain_id,
        verifyingContract: contract_address,
    };
    const types = {
      NFTVoucher: [
        {name: "minPrice", type: "uint256"},
        {name: "uri", type: "string"},  
      ]
    }
    const key = await getPrivateKey(uid)
    const signer = new ethers.Wallet(key, provider);
    const signature = await (await signer._signTypedData(domain, types, voucher)).toString('hex')
    return {
        ...voucher,
        signature,
      }

  }

  async function redeemNFT(voucher, key) {
    const contract = new web3.eth.Contract(contract_abi, contract_address);
  
    const amount = voucher["minPrice"];
    const amountToSend = web3.utils.toWei(amount.toString(), "ether");
    const address = web3.eth.accounts.privateKeyToAccount(key).address;
    const tx = {
      from: address,
      to: contract.options.address,
      value: amountToSend,
      data: contract.methods
        .redeem(address, voucher)
        .encodeABI(),
      chainId: chain_id,
      gas: "300000",
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, key);
    const signedTx = await signPromise
    const response = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)

    return web3.utils.hexToNumber(response.logs[0].topics[3])
  }

  async function getURI(id){
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    const uri = await contract.methods.tokenURI(id).call()
    return uri
  }

  async function withdraw(key){
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    const address = web3.eth.accounts.privateKeyToAccount(key).address;
    const tx = {
      from: address,
      to: contract.options.address,
      value: 0,
      data: contract.methods
        .withdraw()
        .encodeABI(),
      chainId: chain_id,
      gas: "210000",
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, key);
    const signedTx = await signPromise
    const response = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
    return response
  }

  async function availableToWithdraw(address){
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    const balance = await contract.methods.availableToWithdraw(address).call()
    return web3.utils.fromWei(balance)
  }

  async function transferFrom(key, toAddress, tokenId) {
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    const address = web3.eth.accounts.privateKeyToAccount(key).address;
    const tx = {
      from: address,
      to: contract.options.address,
      value: 0,
      data: contract.methods
        .safeTransferFrom(address, toAddress, tokenId)
        .encodeABI(),
      chainId: chain_id,
      gas: "210000",
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, key);
    const signedTx = await signPromise
    const response = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
    return response
  }

  async function sendCelo(key, toAddress, amount){
    const address = web3.eth.accounts.privateKeyToAccount(key).address;
    const tx = {
      from: address,
      to: toAddress,
      value: web3.utils.toWei(amount, "ether"),
      chainId: chain_id,
      gas: "210000",
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, key);
    const signedTx = await signPromise
    const response = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction)
    return response
  }

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });