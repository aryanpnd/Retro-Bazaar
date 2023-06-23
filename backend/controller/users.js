const {User } = require('../model/user');

const addUser = async (req, res, next) => {
    const user = new User(req.body)
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
    user.token = token;
    await user.save()
        .then((docs) => { res.status(200).send(`User registered successfully `) })
        .catch((err) => { res.status(400).json({"error":err}) })

}

// // get all the products
// const getProducts = async (req, res) => {
//     await Product.find()
//         .then((docs) => { res.status(200).json(docs) })
//         .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
//     // or
//     // await Product.find({price:{$gte:req.body.price}}).then((s)=>res.json(s))
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

module.exports = { addUser,}