const { expect } = require("chai");

describe("TokenCreator contract", function () {
  let tokenCreator = null;
  const initialSupply = 1000;
  const name = "Super Token";
  const symbol = "STK";
  let deployer, wallet, walletTo;

  beforeEach(async () => {
    [deployer, wallet, walletTo] = await ethers.getSigners();
    const tokenCreatorFactory = await ethers.getContractFactory("TokenCreator");
    tokenCreator = await tokenCreatorFactory.deploy();
  });

  it("is owned by deployer", async function () {
    await expect(await tokenCreator.owner()).to.equal(deployer.address);
  });

  it("Emits event CreatedSimpleToken", async function () {
    await expect(
      await tokenCreator
        .connect(wallet)
        .createSimpleToken(initialSupply, name, symbol)
    )
      .to.emit(tokenCreator, "CreatedSimpleToken")
      .withArgs(
        (
          await tokenCreator.getTokensOfOwner(wallet.address)
        )[0].tokenAddress,
        wallet.address,
        initialSupply,
        name,
        symbol
      );
  });

  it("Assigns correct balance", async function () {
    await tokenCreator
      .connect(wallet)
      .createSimpleToken(initialSupply, name, symbol);
    const token = (await tokenCreator.getTokensOfOwner(wallet.address))[0];
    const simpleToken = await ethers.getContractAt(
      "SimpleToken",
      token.tokenAddress
    );
    await expect(await simpleToken.balanceOf(deployer.address)).to.equal(0);
    await expect(await simpleToken.balanceOf(wallet.address)).to.equal(
      initialSupply
    );
  });
});
