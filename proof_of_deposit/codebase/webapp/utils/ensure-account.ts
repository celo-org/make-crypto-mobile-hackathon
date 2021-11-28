export const ensureAccount = async (kit: any, address: string) => {
  const accounts = await kit.contracts.getAccounts();
  if (!(await accounts.isAccount(address))) {
    await accounts.createAccount().sendAndWaitForReceipt({ from: address });
  }
};
