const SHA256 = require('crypto-js/sha256')
const {userInfo} = require('./userData')

let userInfoHash = SHA256(userInfo).toString()

let date = new Date()


class Block{
    constructor(timestamp, data, previousHash = ''){
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.timestamp  + this.previousHash + JSON.stringify(this.data)).toString()
        // the block values are passed to the sha256 to create a hash of the current block
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()]  //array of the blocks
    }

    createGenesisBlock(){
        return new Block( date, userInfoHash, "User Info Block")
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1]
    }

    getBlockChain(){
        return JSON.stringify(this.chain, null, 4)
    }


    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock);
    }

    isChainValid(){
        //starting from 1st block after genesis block
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                //checking current block's stored hash and recalculating the block's hash
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                //checking the previous hash stored and the hash of the previous block
                return false
            }
        }
        return true
    }


}

function giveHash(dataItem){
    return SHA256(dataItem).toString()
}


module.exports.Blockchain = Blockchain
module.exports.Block = Block
module.exports.giveHash = giveHash
