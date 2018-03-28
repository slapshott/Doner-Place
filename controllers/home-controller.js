const Product = require('../models/Product');

module.exports = {
    index: (req, res) => {

        Product.find().then((products) => {
            res.render('home/index', { products });
        })


    }
};