# How to test redstone-node code

We always implement tests for all the core modules of the RedStone ecosystem, including the redstone-node.

Tests are located in the `test` folder.
We test each fetcher separately (fetchers tests are located in the `test/fetchers` folder). We also have integration tests in the `test/integration` folder and tests for separate modules: `EvmPriceSigner`, `ManifestParser`, `median-aggregator`, `PricesService`.

You can run tests in the following way:
```bash
yarn test
```
