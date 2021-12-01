require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const crypto = require('./utils/crypto_data');
const util = require ('./utils/utils');
const Kit = require('@celo/contractkit');
const kit = Kit.newKit(process.env.CELO_NETWORK);
const logger = require("./config/logger");
const ipfilter = require('express-ipfilter').IpFilter;
const watcher = require('./webSocket/watcher');
const MoolaStakingRewards = require('./abis/MoolaStakingRewards.json');
const ERC20 = require('./abis/erc20.json');
const Staking_Token = require('./abis/stakingToken.json'); 
const StakingRewards = require('./abis/StakingRewards.json');
const UniswapV2Library = require('./abis/UniswapV2Library.json');
var Schema = require("./config/dbconnection");

var cUSD_celo = require('./routes/cUSD/routes_cUSD.js');
app.use('/', cUSD_celo);

var geral_routes = require('./routes/geral/geral.js');
app.use('/', geral_routes);

const { ChainId, Pair, Fetcher, Token, cUSD, Route } = require("@ubeswap/sdk");
const ethers = require('ethers');
const { couldStartTrivia, convertToObject } = require("typescript");
const { route } = require("./routes/cUSD/routes_cUSD.js");
const customHttpProvider = new ethers.providers.JsonRpcProvider(process.env.CELO_NETWORK);
const chainId = ChainId.MAINNET;  

watcher.watchEtherTransfers();

app.use( ipfilter([process.env.ALLOWED_IP_0], 
  { mode: process.env.MODE_IP }));

app.listen(process.env.PORT || 3000, function() {
    logger.info(`Server is running on port ${process.env.PORT}` );
  });


app.use(function (req, res, next) {
    
  try{
  
    if(util.checkHeader(req)){
        next();
      }else {
        return res.status(403).json({message: "The access cannot be granted!"});
      }
  } catch(error){
    logger.error(`middleware - error - ${error.message}` );
    return res.status(403).json({message: error.message});
  }

  });
 


  app.post("/getInfoPool", async function(req, res) {
    
    try{

      const pool = new kit.web3.eth.Contract(MoolaStakingRewards, req.body.addressPool);
      const stakeTokenAddress = await pool.methods.stakingToken().call();
      
      let rewardsTokenList = [];
  
      const poolToken = await getERC20Data(stakeTokenAddress);
      // ---------------------------Balances--------------------------------------------------------
  
      let totalSupply =  await pool.methods.totalSupply().call();
      totalSupply = totalSupply / 10 ** poolToken.decimals;
  
      let userSupply = await pool.methods.balanceOf(req.body.walletAddress).call();
      userSupply = Number(userSupply) / 10 ** poolToken.decimals;
  
      let stakingToken = await pool.methods.stakingToken().call();
      let erc20Contract = new kit.web3.eth.Contract(Staking_Token, stakingToken);
  
      let token0 = await erc20Contract.methods.token0().call();
      let token0Data = await getERC20Data(token0);
      token0Data.priceToken0Usd = await getTokenPrice(token0, token0Data);
  
      let token1 = await erc20Contract.methods.token1().call();
      let token1Data = await getERC20Data(token1);
      token1Data.priceToken1Usd = await getTokenPrice(token1, token1Data);
      
      let totalSupplyUsd = totalSupply * token0Data.priceToken0Usd + totalSupply * token1Data.priceToken1Usd;
      let userSupplyUsd = userSupply * token0Data.priceToken0Usd + userSupply * token1Data.priceToken1Usd;
  
      let rewardsToken =  await pool.methods.rewardsToken().call();
      let ernedTokenPool = await getERC20Data(rewardsToken);
      ernedTokenPool.price = await getTokenPrice(rewardsToken, ernedTokenPool);
      ernedTokenPool.earned = ( await pool.methods.earned(req.body.walletAddress).call() ).toString();
      ernedTokenPool.rewardRatePerSecond = Number( await pool.methods.rewardRate().call() );
      ernedTokenPool.weeklyReward = ernedTokenPool.rewardRatePerSecond / 10 ** ernedTokenPool.decimals * 604800;
      ernedTokenPool.weeklyRewardUser = (userSupply/totalSupply) * ernedTokenPool.weeklyReward;
      rewardsTokenList.push(ernedTokenPool);
  
      let earnedTokenExt = await pool.methods.earnedExternal(req.body.walletAddress).call();
  
      if(req.body.rewardsNumber == 3){
  
        const externalRewardAddress0 = await pool.methods.externalStakingRewards().call();
        const rewardPool0 = new kit.web3.eth.Contract(MoolaStakingRewards, externalRewardAddress0);
  
        let rewardsToken =  await rewardPool0.methods.rewardsToken().call();
        let ernedTokenPool0 = await getERC20Data(rewardsToken);
        ernedTokenPool0.price = await getTokenPrice(rewardsToken, ernedTokenPool0);
        ernedTokenPool0.earned = earnedTokenExt[0];
        ernedTokenPool0.rewardRatePerSecond = ( await rewardPool0.methods.rewardRate().call() ).toString();
        ernedTokenPool0.weeklyReward = ernedTokenPool0.rewardRatePerSecond / 10 ** ernedTokenPool0.decimals * 604800;
        ernedTokenPool0.weeklyRewardUser = (userSupply / totalSupply) * ernedTokenPool0.weeklyReward;
        rewardsTokenList.push(ernedTokenPool0);
  
        const externalRewardAddress1 = await rewardPool0.methods.externalStakingRewards().call();
        const rewardPool1 = new kit.web3.eth.Contract(MoolaStakingRewards, externalRewardAddress1);
        let rewardsToken1 =  await rewardPool1.methods.rewardsToken().call();
        let ernedTokenPool1 = await getERC20Data(rewardsToken1);
        ernedTokenPool1.price = await getTokenPrice(rewardsToken1, ernedTokenPool1);
        ernedTokenPool1.earned = earnedTokenExt[1];
        ernedTokenPool1.rewardRatePerSecond = ( await rewardPool1.methods.rewardRate().call() ).toString();
        ernedTokenPool1.weeklyReward = ernedTokenPool1.rewardRatePerSecond / 10 ** ernedTokenPool1.decimals * 604800;
        ernedTokenPool1.weeklyRewardUser = (userSupply / totalSupply) * ernedTokenPool1.weeklyReward;
        rewardsTokenList.push(ernedTokenPool1);
      }
      
      res.status(200).json({totalSupply, userSupply, totalSupplyUsd, userSupplyUsd, poolToken, token0Data, token1Data, rewardsTokenList});
     
    } catch(error){
      return res.status(400).json({message: error.message});
    }
  });

  async function getERC20Data(address) {
    const erc20Contract = new ethers.Contract(address, ERC20, customHttpProvider);
    let symbol = await erc20Contract.symbol();
    let name = await erc20Contract.name();
    let decimals = await erc20Contract.decimals();
    let totalSupply = Number(await erc20Contract.totalSupply())/10**decimals;
    return {symbol, name, decimals, totalSupply};
  }

  async function getTokenPrice(tokenAddress, tokenData) {
    
    if( tokenData.symbol && ( tokenData.symbol == "mCUSD" || tokenData.symbol == "cUSD") ) { return 1 };

    if(tokenData.symbol == "mCELO") tokenAddress = "0x7037F7296B2fc7908de7b57a89efaa8319f0C500";
    
    const token0Fecher = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
    const p0 = await Fetcher.fetchPairData(token0Fecher, cUSD[chainId], customHttpProvider);
    const r0 = new Route([p0], token0Fecher);
    let midPrice = r0.midPrice.toSignificant(6);
    return midPrice;
  }

  

  async function getPath(tokenAddress) {
    const token0Fecher = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
    const p0 = await Fetcher.fetchPairData(token0Fecher, cUSD[chainId], customHttpProvider);
    const r0 = new Route([p0], token0Fecher);
    let path = r0.path.map(p =>{ return p.address });
    return path;
  }

  const mapPaths = new Map();
  mapPaths.set("cUSD-MOO", ["0x765de816845861e75a25fca122bb6898b8b1282a", "0x17700282592d6917f6a73d0bf8accf4d578c131e"]);
  mapPaths.set("cUSD-mCELO", ["0x765de816845861e75a25fca122bb6898b8b1282a", "0x471ece3750da237f93b8e339c536989b8978a438", "0x7d00cd74ff385c955ea3d79e47bf06bd7386387d"]);
  mapPaths.set("MOO-cUSD", ["0x17700282592d6917f6a73d0bf8accf4d578c131e", "0x765de816845861e75a25fca122bb6898b8b1282a"]);
  mapPaths.set("mCELO-cUSD", ["0x7d00cd74ff385c955ea3d79e47bf06bd7386387d", "0x471ece3750da237f93b8e339c536989b8978a438", "0x765de816845861e75a25fca122bb6898b8b1282a"]);
  mapPaths.set("CELO-cUSD", ["0x471ece3750da237f93b8e339c536989b8978a438", "0x00be915b9dcf56a3cbe739d9b9c202ca692409ec", "0x765de816845861e75a25fca122bb6898b8b1282a"]);
  mapPaths.set("UBE-cUSD", ["0x00be915b9dcf56a3cbe739d9b9c202ca692409ec", "0x765de816845861e75a25fca122bb6898b8b1282a"]);
  mapPaths.set("cUSD-mcEUR", ["0x765de816845861e75a25fca122bb6898b8b1282a", "0x471ece3750da237f93b8e339c536989b8978a438", "0xe273ad7ee11dcfaa87383ad5977ee1504ac07568"]);

  app.post("/depositPool", async function(req, res) {
    
    try{

      const stableTokenAddress = await kit.registry.addressFor(Kit.CeloContract.StableToken);
      const gasPriceMinimumContract = await kit.contracts.getGasPriceMinimum();
      const gasPriceMinimum = await gasPriceMinimumContract.getGasPriceMinimum(stableTokenAddress);
      const gasPrice = Math.ceil(gasPriceMinimum * 1.3);
      await kit.setFeeCurrency(Kit.CeloContract.StableToken);

      var walletAddress = new RegExp(["^", req.body.walletAddress, "$"].join(""), "i");
      let wallet = await Schema.Wallet.findOne({ publicKey: walletAddress });
      kit.addAccount(crypto.descriptografar( wallet.privateKey ));

      const pool = new kit.web3.eth.Contract(MoolaStakingRewards, req.body.addressPool);
  
      let stakingToken = await pool.methods.stakingToken().call();
      
      let erc20Contract = new kit.web3.eth.Contract(Staking_Token, stakingToken);

      let value = (req.body.value/2).toString();
  
      let token0 = await erc20Contract.methods.token0().call();
      let erc20Token0 = new kit.web3.eth.Contract(ERC20, token0);
      let balanceOfWalletToken0 = await erc20Token0.methods.balanceOf(req.body.walletAddress).call();
      let receipt0Approve = await erc20Token0.methods.approve(req.body.addressUniswap, value)
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });
      
      let token1 = await erc20Contract.methods.token1().call();
      let erc20Token1 = new kit.web3.eth.Contract(ERC20, token1);
      let balanceOfWalletToken1 = await erc20Token1.methods.balanceOf(req.body.walletAddress).call();
      let receipt1Approve = await erc20Token1.methods.approve(req.body.addressUniswap, value)
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      
      const uniswap = new kit.web3.eth.Contract(UniswapV2Library, req.body.addressUniswap);

      let deadline = Date.now() + 1000 * 60 * 10;
      
      let receipt0 = await uniswap.methods.swapExactTokensForTokens( value, 0 , mapPaths.get(req.body.token0Conversion), req.body.walletAddress, deadline )
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });
      
      let balanceOfWalletToken0New = await erc20Token0.methods.balanceOf(req.body.walletAddress).call();

      let receipt1 = await uniswap.methods.swapExactTokensForTokens( value, 0 , mapPaths.get(req.body.token1Conversion), req.body.walletAddress, deadline )
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      let balanceOfWalletToken1New = await erc20Token1.methods.balanceOf(req.body.walletAddress).call();

      let balanceOf0Transfered =  balanceOfWalletToken0New - balanceOfWalletToken0;
      let balanceOf1Transfered =  balanceOfWalletToken1New - balanceOfWalletToken1;

     
      let liquidity = await uniswap.methods.addLiquidity(token0, token1, balanceOf0Transfered.toString(), balanceOf1Transfered.toString(), 0, 0, 
        req.body.walletAddress, deadline)
        .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      let pairContract = new kit.web3.eth.Contract(Staking_Token, stakingToken);
      let balanceOfPair = await pairContract.methods.balanceOf(req.body.walletAddress).call();

      const stakingRewards = new kit.web3.eth.Contract(StakingRewards, req.body.stakingRewardsAddress);
      
      let stakeReceipt = await stakingRewards.methods.stake( balanceOfPair )
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      res.status(200).json("Ok");
    }catch(error){
      
      return res.status(400).json({message: error.message});
    }

  });


  app.post("/withdrawPool", async function(req, res) {
    
    try{

      const stableTokenAddress = await kit.registry.addressFor(Kit.CeloContract.StableToken);
      const gasPriceMinimumContract = await kit.contracts.getGasPriceMinimum();
      const gasPriceMinimum = await gasPriceMinimumContract.getGasPriceMinimum(stableTokenAddress);
      const gasPrice = Math.ceil(gasPriceMinimum * 1.3);
      await kit.setFeeCurrency(Kit.CeloContract.StableToken);
      
      let wallet = await Schema.Wallet.findOne({ publicKey: req.body.walletAddress });
      kit.addAccount(crypto.descriptografar( wallet.privateKey ));

      // 1 - withdraw
      const stakingRewards = new kit.web3.eth.Contract(StakingRewards, req.body.stakingRewardsAddress);

      let exitReceipt = await stakingRewards.methods.exit()
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      // 2 - remove liquidity
      const pool = new kit.web3.eth.Contract(MoolaStakingRewards, req.body.addressPool);
  
      let stakingToken = await pool.methods.stakingToken().call();
      
      let erc20Contract = new kit.web3.eth.Contract(Staking_Token, stakingToken);
      let userSupply = await erc20Contract.methods.balanceOf(req.body.walletAddress).call();
  
      let token0 = await erc20Contract.methods.token0().call();
      let token1 = await erc20Contract.methods.token1().call();

      let deadLine = Date.now() + 1000 * 60 * 10;

      const uniswap = new kit.web3.eth.Contract(UniswapV2Library, req.body.addressUniswap);

      let liquidity = await uniswap.methods.removeLiquidity(token0, token1, userSupply, 0, 0, req.body.walletAddress, deadLine)
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      // 3 -  swap tokens
      let erc20Token0 = new kit.web3.eth.Contract(ERC20, token0);
      let balanceOfWalletToken0 = await erc20Token0.methods.balanceOf(req.body.walletAddress).call();
      
      let receipt0 = await uniswap.methods.swapExactTokensForTokens( balanceOfWalletToken0, 0 , mapPaths.get(req.body.token0Conversion), req.body.walletAddress, deadLine )
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });
      
      let erc20Token1 = new kit.web3.eth.Contract(ERC20, token1);
      let balanceOfWalletToken1 = await erc20Token1.methods.balanceOf(req.body.walletAddress).call();
      
      let receipt1 = await uniswap.methods.swapExactTokensForTokens( balanceOfWalletToken1, 0 , mapPaths.get(req.body.token1Conversion), req.body.walletAddress, deadLine )
      .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });

      let rewardsToken =  await pool.methods.rewardsToken().call();
      let erc20ContractRewardsToken = new kit.web3.eth.Contract(Staking_Token, rewardsToken);
      let balanceOfRewards0 = await erc20ContractRewardsToken.methods.balanceOf(req.body.walletAddress).call();
      
      if (balanceOfRewards0 >= 10000000000){
        let receipt2 = await uniswap.methods.swapExactTokensForTokens( balanceOfRewards0, 0, mapPaths.get(req.body.reward0Conversion), req.body.walletAddress, deadLine )
        .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice, feeCurrency: stableTokenAddress });
      }

      if(req.body.rewardsNumber == 3){
        
        const externalRewardAddress0 = await pool.methods.externalStakingRewards().call();
        const rewardPool0 = new kit.web3.eth.Contract(MoolaStakingRewards, externalRewardAddress0);
        let rewardsTokenPool0 =  await rewardPool0.methods.rewardsToken().call();
        let erc20ContractRewardsToken1 = new kit.web3.eth.Contract(Staking_Token, rewardsTokenPool0);
        let balanceOfRewards1 = await erc20ContractRewardsToken1.methods.balanceOf(req.body.walletAddress).call();

        if (balanceOfRewards1 >= 10000000000){
          let receipt3 = await uniswap.methods.swapExactTokensForTokens( balanceOfRewards1, 0, mapPaths.get(req.body.reward1Conversion), req.body.walletAddress, deadLine )
          .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });
        }

        const externalRewardAddress1 = await rewardPool0.methods.externalStakingRewards().call();
        const rewardPool1 = new kit.web3.eth.Contract(MoolaStakingRewards, externalRewardAddress1);
        let rewardsTokenPool1 =  await rewardPool1.methods.rewardsToken().call();
        let erc20ContractRewardsToken2 = new kit.web3.eth.Contract(Staking_Token, rewardsTokenPool1);
        let balanceOfRewards2 = await erc20ContractRewardsToken2.methods.balanceOf(req.body.walletAddress).call();

        if (balanceOfRewards2 >= 10000000000){
          let receipt4 = await uniswap.methods.swapExactTokensForTokens( balanceOfRewards2, 0, mapPaths.get(req.body.reward2Conversion), req.body.walletAddress, deadLine )
          .send({ from: req.body.walletAddress, gas: 3000000, gasPrice: gasPrice,  feeCurrency: stableTokenAddress });
        }
      }
    
      res.status(200).json("Ok");
    }catch(error){
      return res.status(400).json({message: error.message});
    }

  });
