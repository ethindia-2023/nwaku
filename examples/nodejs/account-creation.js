const Web3 = require('web3')

class ProjectAccount{
    constructor(){
        this.privateKey = web3.eth.accounts.create().privateKey
        this.publicKey = web3.eth.accounts.privateKeyToAccount(this.privateKey).address
    }
    
    async getPrivateKey(){
        return this.privateKey
    }
    
    async getPublicKey(){
        return this.publicKey
    }
}
export default ProjectAccount