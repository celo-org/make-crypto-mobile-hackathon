const { expect } = require("chai");

xdescribe("Database Option 1 gas test", function () {
  let database1 = null;
  let deployer, wallet, a1, a2, c1, c2, c3, c4;

  beforeEach(async () => {
    [deployer, wallet, a1, a2, c1, c2, c3, c4] = await ethers.getSigners();
    const tokenCreatorFactory = await ethers.getContractFactory("Database1");
    database1 = await tokenCreatorFactory.deploy();
  });

  it("saves all contracts and gives them back", async function () {
    await database1.addContract(a1.address, "c1", c1.address);
    await database1.addContract(a1.address, "c2", c2.address);
    await database1.addContract(a1.address, "c3", c3.address);
    await database1.addContract(a2.address, "c4", c4.address);
    await expect(await database1.getContractsOfOwner(a1.address)).to.deep.equal(
      [
        ["c1", c1.address],
        ["c2", c2.address],
        ["c3", c3.address],
      ]
    );
    await expect(await database1.getContractsOfOwner(a2.address)).to.deep.equal(
      [["c4", c4.address]]
    );
  });
});
