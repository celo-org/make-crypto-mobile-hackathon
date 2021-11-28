function getEnv(name: string, required = false): string {
  if (process.env[name] !== undefined) {
    return process.env[name] as string;
  } else {
    if (required) {
      throw new Error(`Required env variable not found: ${name}`);
    } else {
      return "";
    }
  }
}

const mode = getEnv("MODE");
const isProd = mode === "PROD";

function getBroadcasterUrl(): string {
  if (isProd) {
    return "https://api.redstone.finance";
  } else {
    return "http://localhost:9000";
  }
}

export default {
  mode,
  isProd,
  broadcasterUrl: getBroadcasterUrl(),
};
