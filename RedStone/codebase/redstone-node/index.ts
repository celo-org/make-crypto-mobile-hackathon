import yargs from "yargs";
import {Consola} from "consola"
import NodeRunner from "./src/NodeRunner";
import {NodeConfig} from "./src/types";
import {readJSON} from "./src/utils/objects";
import { JWKInterface } from "arweave/node/lib/wallet";

const logger = require("./src/utils/logger")("index") as Consola;
const {hideBin} = require("yargs/helpers") as any;

async function start() {
  try {
    await main();
  } catch (e) {
    logger.error(e.stack);
    logger.info(
      "USAGE: yarn start:prod [--config <PATH_TO_CONFIG_FILE>] [--config-env <NAME_OF_ENV_VARIABLE_WITH_CONFIG>]");
  }
}

async function main(): Promise<void> {
  // Reading cli arguments
  const argv = yargs(hideBin(process.argv)).argv;
  const configFilePath = argv.config as string;

  // Validating cli arguments
  if (!configFilePath && !argv["config-env"]) {
    throw new Error("Either --config or --config-env must be specified");
  }

  let config: NodeConfig;
  let jwk: JWKInterface;

  if (configFilePath) {
    // Loading config from file
    config = readJSON(configFilePath);
    jwk = readJSON(config.arweaveKeysFile!);
  } else {
    // Loading config from environment variable
    const configString = process.env[argv["config-env"] as string];
    if (!configString) {
      throw new Error(`ENV variable '${argv["config-env"]}' is empty`);
    }
    config = JSON.parse(configString);
    jwk = config.arweaveKeysJWK!;
  }

  // Running limestone-node with manifest
  const runner = await NodeRunner.create(
    jwk,
    config
  );
  await runner.run();
}

start();

export = {};
