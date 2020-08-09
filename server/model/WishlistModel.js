const { getWishlist } = require('./Connect')
const Index = require('./Index')

const addWishlist = async (wishlist) => {
    const wishlists = await getWishlist()
    const wid = await getNextIndex()
    const wishlist = Object.assign(wishlist, {wid: wid})
    const result = await wishlists.insertOne(wishlist)
    return result
}

const getNextIndex = async () => {
    return Index.getWishlistIndex()
}

const getNextIndexAndIncrement = async () => {
    const currentId = await Index.getWishlistIndex()
    Index.incrementWishlistIndex()
}

module.exports = {addWishlist, getNextIndex}