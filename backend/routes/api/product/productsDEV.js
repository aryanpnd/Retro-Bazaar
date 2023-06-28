const { Product } = require("../../../model/products")

const devInsertMany = (req, res, next) => {
    Product.insertMany(req.body)
        .then((result) => {
            res.status(200).send('saved');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error inserting documents' });
        });

}

module.exports = { devInsertMany }