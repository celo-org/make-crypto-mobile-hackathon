import init, { initializeDepositTransaction, initializeWithdrawalTransaction } from './ContractMethods';
import { listenToEvent } from './EventListener';

class CeloController {
    constructor() {
        init();
    }

    async onConfirmDeposit(amount) {
        let transaction;
        listenToEvent('TransactionInitEvent', (error, result) => {
            if (error){
                throw error;
            } else {
                this.addTransactionToPool(result);
            }
        });
        try {
            transaction = {
                status: 'Successful',
                id: await initializeDepositTransaction(amount),
            };
        } catch (e) {
            transaction = {
                status: 'failed',
                errorMessage: e.message,
            };
        }
    }

    async onConfirmWithDrawal(amount) {
        let transactionID;
        try {
            listenToEvent('TransactionInitEvent', (error, result) => {
                if (error) {
                    throw error;
                } else {
                    this.addTransactionToPool(result);
                }
            });
            transactionID = await initializeWithdrawalTransaction(amount);
            return transactionID;
        } catch (error) {
            return 'failed';
        }
    }

    async addTransactionToPool(transaction) {
        // todo
    }
}

export default CeloController;