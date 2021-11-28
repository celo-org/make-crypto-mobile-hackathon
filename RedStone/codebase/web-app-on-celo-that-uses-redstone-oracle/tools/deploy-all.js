const fs = require("fs");
const deployKoCELO = require("./deploy-ko-celo");
const deployKoCUSD = require("./deploy-ko-cusd");
const ubeswap = require("./ubeswap");
const commodities = require("../src/assets/data/commodities.json");

// Set to 0 to disable limit
const LIMIT = 0;
const OFFSET = 0;

main();

async function main() {
  const finalReport = {};
  let index = 0, deployedCount = 0;

  try {
    for (const symbol in commodities) {
      if (LIMIT > 0 && deployedCount >= LIMIT) {
        break;
      } else {
        if (index >= OFFSET) {
          console.log(`===== Deploying token nr ${index}: ${symbol}. Started =====`);
          const addresses = await deployKoToken(symbol);
          finalReport[symbol] = addresses;
          deployedCount++;
          console.log(`===== Deploying token: ${symbol}. Completed =====`);
          console.log("-----------------------------------");
        } else {
          console.log(`===== Skipping token: ${symbol} =====`);
        }
      }
      index++;
    }
  } catch (e) {
    console.error(e);
    console.log("Token deployment stopped. Saving report...");
  } finally {
    console.log("===== Final report =====");
    console.log(finalReport);

    const filename = `./deploy-report-${Date.now()}.json`;
    console.log(`===== Saving report to a file: ${filename} =====`);
    fs.writeFileSync(filename, JSON.stringify(finalReport, null, 2));
  }
}

async function deployKoToken(symbol) {
  const cusdAddresses = await deployKoCusdWithUbeswap(symbol);
  const celoAddresses = await deployKoCeloWithUbeswap(symbol);
  return {
    "CELO": celoAddresses,
    "cUSD": cusdAddresses,
  };
}

async function deployKoCeloWithUbeswap(symbol) {
  console.log(`=== Deploying koTokenCELO for ${symbol}. Started ===`);
  const addresses = await deployKoCELO(symbol);
  const ubeswapAddresses = await ubeswap.createPool(addresses.koToken);
  console.log(`=== Deploying koTokenCELO for ${symbol}. Completed ===`);
  return {
    ...addresses,
    ...ubeswapAddresses,
  };
}

async function deployKoCusdWithUbeswap(symbol) {
  console.log(`=== Deploying koTokenCUSD for ${symbol}. Started ===`);
  const addresses = await deployKoCUSD(symbol);
  const ubeswapAddresses = await ubeswap.createPool(addresses.koToken);
  console.log(`=== Deploying koTokenCUSD for ${symbol}. Completed ===`);
  return {
    ...addresses,
    ...ubeswapAddresses,
  };
}
