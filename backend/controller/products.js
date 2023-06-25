const { productSchema, Product } = require('../model/products');
const { User } = require('../model/user');


// total count of products available in database
const totalProducts = async (req, res) => {
    await Product.count()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => { res.send(err) })
}

// add a product
const addProducts = async (req, res, next) => {
    const product = new Product(req.body)
    //we can define in this way as well (hard coded)------
    // product.title = "OledTv";
    // product.price = 999; 
    // product.rating = 4.5;//----------------------------

    await product.save()
        .then((docs) => { res.status(200).send(`Query has been saved `) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}

// get all the products
const getProducts = async (req, res) => {
    let query = Product.find()
    // pagination
    if (req.query.pagesize) {
        const pageSize = req.query.pagesize // no of data in one page 
        const pageNo = req.query.pageno // which no of page needed 
        const product = query.sort({ [req.query.sortby]: req.query.order }).skip(pageSize * (pageNo - 1)).limit(pageSize).exec()
        await product
            .then((docs) => { res.status(200).json(docs) })
            .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
    }
    // sorting
    // else if (req.query.sortby) {
    //     const result = req.query.result
    //     const product = query.sort({ [req.query.sortby]: req.query.order }).limit(result).exec() //limit is just for limiting the number of data from the DB and exex is for executing the command
    //     await product
    //         .then((docs) => {
    //             res.status(200).json(docs) // 
    //         })
    //         .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
    // }
    //all products
    else {
        query
            .then((docs) => { res.status(200).json(docs) })
            .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
    }
}


const getProductsById = async (req, res) => {
    await Product.findById(req.params.id)
        .then((docs) => { res.status(200).json(docs) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
}

//update and overwrite 
const updateProduct = async (req, res) => {
    await Product.findOneAndReplace({ _id: req.params.id }, req.body, { new: true })
        .then((docs) => { res.status(200).send(`product at id no:${req.params.id} has been replaced by <br/> ${docs}`) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}


//update not overwrite
const patchProduct = async (req, res) => {
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((docs) => { res.status(200).send(`Update in products list at product Id:${req.params.id}  from ${[...Object.keys(req.body)]} to ${[...Object.values(req.body)]}`) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })


}


const deleteProduct = async (req, res) => {
    const reqId = req.params.id
    await Product.findByIdAndRemove(reqId)
        .then((docs) => { res.status(200).send(`Deleted in products list at product Id:${reqId}`) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}

module.exports = { totalProducts, addProducts, deleteProduct, updateProduct, patchProduct, getProducts, getProductsById }