const Product = require('../models/Product');

module.exports = {
    viewAddProduct: (req, res) => {
        res.render('product/add-product');
    },
    addProduct: (req, res) => {
        let productBody = req.body;

        Product.create({
            category: productBody.category,
            imageUrl: productBody.imageUrl,
            size: productBody.size,
            toppings: productBody.toppings
        }).then((p) => {
            p.save()
            .then((p) => {
                res.redirect('/');
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
}