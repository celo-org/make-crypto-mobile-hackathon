# How to add a new source

We will use words `source` and `fetcher`. Сonsider them to be synonymous.

## Select a name for the new source
First, you should select a name for your source.
It should use kebab case, for example: `source`, `good-source`, `the-best-source`.
Source name must be unique, because it will unambiguously identify your source.

## Implementation
### Implement source (fetcher)
Create a folder with a name of your fetcher in [src/fetchers](../src/fetchers).
Place the code of your fetcher inside of this folder and update [src/fetchers/index.ts](../src/fetchers/index.ts) file to export your source. For more information check out [BaseFetcher](../src/fetchers/BaseFetcher.ts) code and implementation of other fetchers, like [coingecko](../src/fetchers/coingecko/CoingeckoFetcher.ts), [coinbase](../src/fetchers/coinbase), and [ecb](../src/fetchers/ecb/EcbFetcher.ts).

### Implement tests
We strongly recommend to implement tests for your fetcher. It's generaly a good practice and it will help you to avoid silly bugs in your code. You can find examples of tests for other fetchers in the [test/fetchers](../test/fetchers) folder.

## Manifest(s)
- Create a manifest with the name of the newly added fetcher and place it in the [manifests](../manifests) folder
- [Optional] If the source should be used in the main redstone provider, run `node tools/manifest/generate-main-manifest.js`

## Sources config [optional]
### Should I do this?
Sources config file is used in the RedStone web app. If you want your source to be visible there you should add it to config and update the app appropriately.

### How to add a source to config
- Add source details to the `tools/config/predefined-configs/sources.json` file
- Run `yarn build`. It is required by `generate-sources-config.js` so it can work correctly
- Run `node tools/config/generate-sources-config.js` to generate sources config. It will be saved to `src/config/sources.json`
- Download logo for the newly created source
  - You can simply download it in browser and save as `<SOURCE_NAME>.<IMG_EXTENSTION>`
  - Or you can run `node tools/cdn-images/download-source-logos.js`, but it will download logos for all sources
- Upload the source logo to RedStone CDN (manually through AWS S3 web interface)
- Run `node tools/cdn-images/update-sources-config.js` to replace logo urls in sources config with redstone CDN urls
- Update `redstone-node` dependency in redstone-app for being able to use the new source config file
