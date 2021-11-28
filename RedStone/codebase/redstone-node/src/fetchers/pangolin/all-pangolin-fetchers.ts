import panfolinFetchersConfig from "./pangolin-fetchers-config.json";
import { PangolinFetcher } from "./PangolinFetcher";

const pangolinFetchers: Record<string, PangolinFetcher> = {};

for (const [fetcherName, details] of Object.entries(panfolinFetchersConfig)) {
  pangolinFetchers[fetcherName] =
    new PangolinFetcher(fetcherName, details.baseToken);
}

export default pangolinFetchers;
