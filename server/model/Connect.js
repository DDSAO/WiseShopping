const { MongoClient } = require("mongodb"); 
const client = new MongoClient(process.env.MODEL_URL, { useUnifiedTopology: true });

const getWishlist = async () => {
    return new Promise((resolve, reject) => {
        client.connect((err,client)=>{
            if (! err) {
                resolve(client.db("WiseShopping").collection("Wishlist"))
            } else {
                reject(err)
            }
        })
    })
}

const getIndex = async () => {
    return new Promise((resolve, reject) => {
        client.connect((err,client)=>{
            if (! err) {
                resolve(client.db("WiseShopping").collection("Index"))
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {getWishlist, getIndex}