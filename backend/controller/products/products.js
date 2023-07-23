const { Product } = require("../../model/products");

// total count of products available in database
const totalProducts = async (req, res) => {
    await Product.count()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send(err);
        });
};

// get all Product's Specific Field , if distinct in query then the result will be distinct otherwise duplicates might be there
const getProductSpecificField = async (req, res) => {
    try {
        if (req.query.distinct) {
            const distinctCategories = await Product.distinct(req.query.field,{
                $and: [{ isArchive: false }],
              });
            res.status(200).json(distinctCategories);
        } else {
            const distinctCategories = await Product.find({isArchive:false}).select(req.query.field);
            res.status(200).json(distinctCategories);
        }
    } catch (err) {
        res.status(400).send(`Some error occurred: ${err}`);
    }
};

// get all the products
const getProducts = async (req, res) => {
    // get products by category and sorted both
    if (req.query.sortby && req.query.category) {
        const pageSize = req.query.pagesize; // no of data in one page
        const pageNo = req.query.pageno; // which no of page needed
        const product = Product.find({ category: req.query.category,isArchive:false })
            .sort({ [req.query.sortby]: req.query.order })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
            .exec();
        await product
            .then((docs) => {
                res.status(200).json(docs);
            })
            .catch((err) => {
                res.status(400).send(`Some error occured <br/> ${err}`);
            });
    }

    // get products by category
    else if (req.query.category) {
        const pageSize = req.query.pagesize; // no of data in one page
        const pageNo = req.query.pageno; // which no of page needed
        const product = Product.find({ category: req.query.category,isArchive:false })
            // .sort({ [req.query.sortby]: req.query.order })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
            .exec();
        await product
            .then((docs) => {
                res.status(200).json(docs);
            })
            .catch((err) => {
                res.status(400).send(`Some error occured <br/> ${err}`);
            });
    }
    // get products sorted
    else if (req.query.sortby) {
        const pageSize = req.query.pagesize; // no of data in one page
        const pageNo = req.query.pageno; // which no of page needed
        const product = Product.find({isArchive:false})
            .sort({ [req.query.sortby]: req.query.order })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
            .exec();
        await product
            .then((docs) => {
                res.status(200).json(docs);
            })
            .catch((err) => {
                res.status(400).send(`Some error occured <br/> ${err}`);
            });
    }

    // get products as default (sorted by date , newer first)
    else {
        const pageSize = req.query.pagesize;
        const pageNo = req.query.pageno;
        const product = Product.find({isArchive:false})
            .sort({ date: -1 })
            .skip(pageSize * (pageNo - 1))
            .limit(pageSize)
            .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
            .exec();

        await product
            .then((docs) => {
                res.status(200).json(docs);
            })
            .catch((err) => {
                res.status(400).send(`Some error occured <br/> ${err}`);
            });
    }
};

// search in products
const searchItems = async (req, res) => {
    const searchQuery = req.query.q;
    const searchLogic = {
        $and: [
          {
            $or: [
              { title: { $regex: new RegExp(searchQuery, "i") } },
              { description: { $regex: new RegExp(searchQuery, "i") } },
              { category: { $regex: new RegExp(searchQuery, "i") } },
            ],
          },
          { isArchive: false }, 
        ],
      };

    try {
        Product.countDocuments(searchLogic).then((data) => {
            Product.find(searchLogic)
                .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
                .sort({ [req.query.sortby]: req.query.order })
                .exec()
                .then((documents) => {
                    res.status(200).json({ products: documents, count: data });
                });
        });
    } catch (err) {
        res.status(400).send(`Some error occurred: ${err}`);
    }
};



const getSingleProduct = async (req, res) => {
    const pid = req.query.pid;
    
    try {
      const product = await Product.findById(pid)
        .populate("postedBy", req.session.passport?{ password: 0, _id: 0 }:{ password: 0, _id: 0,email:0,phoneNo:0})
        .exec();
  
      if (product && product.isArchive === false) {
        res.json({ success: true, data: product });
      } else {
        res.json({ success: false, data: null });
      }
    } catch (err) {
      res.status(400).send(`Some error occurred <br/> ${err}`);
    }
  };

module.exports = {
    totalProducts,
    getProductSpecificField,
    getProducts,
    searchItems,
    getSingleProduct,
};
