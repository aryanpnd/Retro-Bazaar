const { Product } = require("../../model/products");
const { User } = require("../../model/user");

// get a user's product
const getUserProducts = async (req, res) => {
  const userId = req.session.passport.user.id;
  await Product.find({ postedBy: userId })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.status(400).send(`Some error occured <br/> ${err}`);
    });
};

// add a product
const addProduct = async (req, res, next) => {
  await User.findById(req.session.passport.user.id).then(async (data) => {
    if (data.phoneNo) {
      const product = new Product(req.body);
      product.date = Date.now();
      product.postedBy = req.session.passport.user.id;
      await product
        .save()
        .then((docs) => {
          res.status(200).send(`Your product has been added successfully`);
        })
        .catch((err) => {
          res.status(400).send(`Some error occured ${err}`);
        });
    } else {
      res
        .status(200)
        .json({ code: "f", message: "Phone number is not verified" });
    }
  });
};

// delete a product
const deleteProduct = async (req, res) => {
  const userId = req.session.passport.user.id;
  const productId = req.body.productid;
  await Product.find({ postedBy: userId })
    .then(async (docs) => {
      const isUserProduct = docs.find((id) => id._id.equals(productId)); //we're using equals() because the _id is a class so it will give blank value if we use "==="
      if (isUserProduct) {
        await Product.findByIdAndDelete(productId)
          .then(() => res.status(200).send("deleted successfully"))
          .catch((err) => res.send(err));
      } else {
        res.send("Item does not exists");
      }
    })
    .catch((err) => {
      res.status(400).send(`Some error occured <br/> ${err}`);
    });
};

// delete all the products from the account
const deleteAllProducts = async (req, res) => {
  const userId = req.session.passport.user.id;
  await Product.deleteMany({ postedBy: userId })
    .then((docs) => {
      res.send(
        "All your posted products have been successfully removed from your account"
      );
    })
    .catch((err) => {
      res.status(400).send(`Some error occured <br/> ${err}`);
    });
};

module.exports = {
  getUserProducts,
  addProduct,
  deleteProduct,
  deleteAllProducts,
};
