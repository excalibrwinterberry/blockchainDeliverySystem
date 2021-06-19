const {Block, giveHash} = require('./blockchain')
const {userInfo} = require('./userData')
const {deliveerySolution} = require('./deliverychain')


let date = new Date()

date.setDate(date.getDate()+2)

const newOrder = [
    {
        customerName: userInfo[0]["userName"],
        deliveryAddress: userInfo[0]["userAddress"][userInfo[0]["primaryAddress"]],
        customerPhone: userInfo[0]["userPhone"][userInfo[0]["primaryPhone"]],
        orderId: "QWERT123",
        itemCode: "0ABE7895",
        itemWeight: 2.3,
        sellerInfo: "Delivery Enterprises",
        expectedDeliveryDate: date,
        expectedRoute: ["delhi","noida","Muzzafapur","Patna"],
        paymentStatus: "already Paid"

    }
]

const check = giveHash(newOrder[0]["orderId"] + newOrder[0]["itemCode"]+ newOrder[0]["itemWeight"])

deliveerySolution.addBlock(new Block( new Date(), newOrder))

const updates = [
{
    previousAdd: "delhi",
    currentAdd: "noida",
    modeOfTransportation: "train",
    orderId: "QWERT123",
    itemCode: "0ABE7895",
    itemWeight: 2.3
},
{
    previousAdd: "noida",
    currentAdd: "Muzzafapur",
    modeOfTransportation: "train",
    orderId: "QWERT123",
    itemCode: "0ABE7895",
    itemWeight: 2.3
},
{
    previousAdd: "Muzzafapur",
    currentAdd: "Patna",
    modeOfTransportation: "train",
    orderId: "QWERT123",
    itemCode: "0ABE7895",
    itemWeight: 2.3
}
]

let flag = false

for(let i=0;i<updates.length;i++){
    if(giveHash(updates[i]["orderId"]+updates[i]["itemCode"]+ updates[i]["itemWeight"]) !== check){
        flag = true
        break
    }
    deliveerySolution.addBlock(new Block( new Date(), updates[i]))
}


const finalUpdate = [{
    orderId: "QWERT123",
    itemCode: "0ABE7895",
    itemWeight: 2.3,
    itemDelivered: true,
    itemReceived: true
}]

if(giveHash(finalUpdate[0]["orderId"] + finalUpdate[0]["itemCode"]+ finalUpdate[0]["itemWeight"]) !== check || finalUpdate[0]["itemDelivered"] !== true || finalUpdate[0]["itemReceived"] !==true || flag !==false){
    flag = true
}
else{
    deliveerySolution.addBlock(new Block( new Date(), finalUpdate))
    
}



for(let i=1;i<updates.length;i++){
    if(updates[i]["previousAdd"] !== updates[i-1]["currentAdd"]){
        flag = true
    }
}



if(flag){
    console.log("the Item could not be delivered successfully\n")
}else{
    console.log("the item was delivered without any issues\n")
}


console.log(deliveerySolution.getBlockChain())

