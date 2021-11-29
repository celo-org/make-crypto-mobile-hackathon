const { expect } = require("chai");

describe("SimpleToken contract", function () {
  let token = null;
  const initialSupply = 1000;
  const name = "Super Token";
  const symbol = "STK";
  let deployer, wallet, walletTo;

  beforeEach(async () => {
    [deployer, wallet, walletTo] = await ethers.getSigners();
    const simpleTokenContract = await ethers.getContractFactory("SimpleToken");
    token = await simpleTokenContract.deploy(
      wallet.address,
      initialSupply,
      name,
      symbol
    );
  });

  it("sets correct parameter", async function () {
    await expect(await token.name()).to.equal(name);
    await expect(await token.symbol()).to.equal(symbol);
    await expect(await token.balanceOf(wallet.address)).to.equal(initialSupply);
  });
});
