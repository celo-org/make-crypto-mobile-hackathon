export default class DataManager {
    static sharedInstance = null

    _NFTs = []

    _userWallet = ""

    static getInstance() {
        if (DataManager.sharedInstance == null) {
            DataManager.sharedInstance = new DataManager()
        }

        return this.sharedInstance
    }

    getNFTs() {
        return this._NFTs
    }

    setNFTs(NFTs) {
        this._NFTs = NFTs
    }

    getNFT(tokenId) {
        return this._NFTs.find(x=>x.tokenId === tokenId)
    }

    getUserWallet() {
        return this._userWallet
    }

    setUserWallet(wallet) {
        this._userWallet = wallet
    }
}