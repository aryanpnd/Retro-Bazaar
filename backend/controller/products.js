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



// get all Product's Specific Field , if distinct in query then the result will be distinct otherwise duplicates might be there
const getProductSpecificField = async (req, res) => {
    try {
        if (req.query.distinct) {
            const distinctCategories = await Product.distinct(req.query.field);
            res.status(200).json(distinctCategories);
        }
        else{
            const distinctCategories = await Product.find().select(req.query.field);
            res.status(200).json(distinctCategories);
        }
    } catch (err) {
        res.status(400).send(`Some error occurred: ${err}`);
    }
};




// get all the products
const getProducts = async (req, res) => {
    let query = Product.find()

    // get products sorted
    if (req.query.pagesize && req.query.sortby) {
        const pageSize = req.query.pagesize // no of data in one page 
        const pageNo = req.query.pageno // which no of page needed 
        const product = query
            .sort({ [req.query.sortby]: req.query.order })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", { password: 0, _id: 0 })
            .exec()
        await product
            .then((docs) => { res.status(200).json(docs) })
            .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
    }

    // get products as default (sorted by date , newer first)
    else {
        const pageSize = req.query.pagesize
        const pageNo = req.query.pageno
        const product = query
            .sort({ date: -1 })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", { password: 0, _id: 0 })
            .exec()

        await product.then((docs) => { res.status(200).json(docs) })
            .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })
    }
}


// search in products
const searchItems = async (req, res) => {
    const searchQuery = req.query.query;
  
    try {
      const documents = await Product.find({
        $or: [
          { title: { $regex: new RegExp(searchQuery, 'i') } },
          { description: { $regex: new RegExp(searchQuery, 'i') } },
          { category: { $regex: new RegExp(searchQuery, 'i') } }
        ]
      });
  
      res.status(200).json(documents);
    } catch (err) {
      res.status(400).send(`Some error occurred: ${err}`);
    }
  };
  



// add a product
const addProduct = async (req, res, next) => {
    const product = new Product(req.body)
    product.date = Date.now()
    product.postedBy = req.session.passport.user.id
    await product.save()
        .then((docs) => { res.status(200).send(`Query has been saved `) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}





const deleteProduct = async (req, res) => {
    const reqId = req.params.id
    await Product.findByIdAndRemove(reqId)
        .then((docs) => { res.status(200).send(`Deleted in products list at product Id:${reqId}`) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}



const deleteAllProducts = async (req, res) => {
    const reqId = req.params.id
    await Product.findByIdAndRemove(reqId)
        .then((docs) => { res.status(200).send(`Deleted in products list at product Id:${reqId}`) })
        .catch((err) => { res.status(400).send(`Some error occured <br/> ${err}`) })

}



module.exports = { totalProducts, getProductSpecificField, addProduct, deleteProduct, updateProduct, patchProduct, getProducts,searchItems }