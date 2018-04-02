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
    },

    deleteProduct: (req, res) => {
            let productId = req.params.id

            Product.findById(productId)
                    .then(p => {
                        Product.deleteOne(p)
                                .then((p) => {
                                    res.redirect('/')
                                })
                                .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            
    },

    updateProduct: (req, res) => {
        let id = req.params.id

        Product.findById(id)
                .then(p => {
                    // console.log(p)
                    res.render('product/edit-product', p)
                })
                .catch(err => console.log(err))
    },

    editProduct: (req, res) => {
        let id = req.params.id
        console.log(id)
        console.log(req.body)

        let editedProduct = req.body
        Product.findByIdAndUpdate(id, editedProduct)
                .then(p => {
                    console.log(p)
                    res.redirect('/')
                })
                .catch(err => console.log(err))
    }
}