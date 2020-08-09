const { getIndex } = require('./Connect')

const getWishlistIndex = async (data) => {
    const index = await getIndex()
    return index.find({}).toArray().then((result)=>{
        console.log(result[0].wishlistId)
        return result[0].wishlistId
    }, ()=>"get wishlist index wrong")  
}

const incrementWishlistIndex = async () => {
    const index = await getIndex()
    return index.update({}, {$inc : {wishlistId : 1}})
}

const getUserIndex = async (data) => {
    const index = await getIndex()
    return index.find({}).toArray().then((result)=>{
        console.log(result[0].wishlistId)
        return result[0].userId
    }, ()=>"get wishlist index wrong")  
}

const incrementUserIndex = async () => {
    const index = await getIndex()
    return index.update({}, {$inc : {userlistId : 1}})
}


const reset = async () => {
    const index = await getIndex()
    return index.deleteMany({}).then(()=>index.insertOne({
        wishlistId : 0,
        userId : 0,
    }))
    
}

module.exports = {getWishlistIndex, incrementWishlistIndex, getUserIndex, incrementUserIndex, reset}