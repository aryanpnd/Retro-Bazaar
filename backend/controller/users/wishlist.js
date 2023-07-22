const { Wishlist } = require("../../model/wishlist");


// **NOTE** we are finding user's whishlist by object UID and not email is due to security issues 

// checking if the wishlist exists and creating one if not
const check = async (req, res, next) => {
    await Wishlist.exists({ uid: req.session.passport.user.id }).then((userWishlist) => {
        if (!userWishlist) {
            const wishlist = new Wishlist({ uid: req.session.passport.user.id, user: req.session.passport.user.email })
            wishlist.save()
            next()
        } else {
            next()
        }
    }).catch((err) => { res.send(err) })
}

// getting the user wishlist
const getWishlist = (req, res, next) => {

    Wishlist.findOne({ uid: req.session.passport.user.id })
        .populate({
            path: 'products',
            match: { isArchive: false },
            populate: {
                path: 'postedBy',
                model: 'User',
                select: '-password -_id -accountId -provider'
            },
        }).exec().then(wishlist => {
            if (!wishlist) res.send('wishlist not found')
            else { res.send(wishlist) }
        })
}

// add to cart
// the code uses the "some()" (we can use "find()" as well)  function to iterate over the wishlist.products array and checks if any element in the array is equal to the productId using the equals() method of the ObjectId class. This allows you to compare ObjectIds directly.
const addToWishlist = (req, res, next) => {
    const productId = req.body.productId;

    Wishlist.findOne({ uid: req.session.passport.user.id })
        .then(wishlist => {
            const isProductInWishlist = wishlist.products.some(product => product.equals(productId));

            if (!isProductInWishlist) {
                wishlist.products.push(productId);
                wishlist.save()
                    .then(() => {
                        res.send('added to the wishlist');
                    })
                    .catch(error => {
                        res.send(error);
                    });
            } else {
                res.send('already present in the wishlist');
            }
        })
        .catch(error => {
            res.send("error");
        });
}



// delete one from the Wishlist
const deleteOneFromWishlist = (req, res, next) => {
    Wishlist.findOne({ uid: req.session.passport.user.id })
        .then(async wishlist => {
            const itemIndex = wishlist.products.indexOf(req.query.productId)
            if (itemIndex !== -1) {
                wishlist.products.splice(itemIndex, 1)
                wishlist.save()
                res.send('deleted from the wishlist')
            }
            else {
                res.send('is not in the wishlist')
            }
        })
        .catch(error => {
            res.send(error);
        });
}


// delete all from the Wishlist
const deleteAllFromWishlist = (req, res, next) => {
    Wishlist.findOne({ uid: req.session.passport.user.id })
        .then(async wishlist => {
            wishlist.products = []
            wishlist.save()
            res.send('All items from the wishlist has been deleted successfully')


            //this one not working because array contains instances here
            //     if(wishlist.products!==){
            //         wishlist.products = []
            //         wishlist.save()
            //         res.send('All items from the wishlist has been deleted successfully')
            //     }else{
            //         res.send('Wishlist already empty!')
            //     }
            // })
            // .catch(error => {
            //     res.send(error);
        });
}

module.exports = { check, getWishlist, addToWishlist, deleteOneFromWishlist, deleteAllFromWishlist }