const { User } = require('../model/user');


// // get the User data
const getUserInfo = async (req, res) => {
    await User.findOne({ email: req.session.passport.user.email }).then((data) => {
        res.status(200).json({ data: data });
    }).catch((err) => { res.status(200).send("some error occurred while fetching the data") })
}

// // Signout the User (destroying session)
const signOutUser = (req, res) => {
    try {
        req.session.destroy(function (err) {
            res.status(200).send({ message: 'User signout successfully' });
        });
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out user' });
    }
}


// // // get all the products
// const getUsersById = async (req, res) => {
//     await User.findOne({email:req.session.passport.user.email}).then((data)=>{
//         res.status(200).send(data);
//     }).catch((err)=>{res.status(200).send("some error occurred while fetching the data")})
// }


// const getProductsById = async (req, res) => {
//     await Product.findById(req.params.id)
//         .then((docs) => { res.status(200).json(docs) })
//         .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
// }

// //update and overwrite 
// const updateProduct = async (req, res) => {
//     await Product.findOneAndReplace({ _id: req.params.id }, req.body, { new: true })
//         .then((docs) => { res.status(200).send(`product at id no:${req.params.id} has been replaced by <br/> ${docs}`) })
//         .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

// }


// //update not overwrite
// const patchProduct = async (req, res) => {
//     await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
//         .then((docs) => { res.status(200).send(`Update in products list at product Id:${req.params.id}  from ${[...Object.keys(req.body)]} to ${[...Object.values(req.body)]}`) })
//         .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })


// }


// const deleteProduct = async (req, res) => {
//     const reqId = req.params.id
//     await Product.findByIdAndRemove(reqId) 
//     .then((docs) => { res.status(200).send(`Deleted in products list at product Id:${reqId}`) })
//     .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

// }

module.exports = { getUserInfo,signOutUser }