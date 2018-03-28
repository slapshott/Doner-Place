const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {  
    viewOrder: (req, res) => {

        let productId = req.params.id
        Product.findById(productId)
                .then((product) => {
                res.render('orders/customize-order', product);
        })
       
    },

    viewOrderPost: (req, res) => {

        // console.log(req.params)
        // console.log(req.body)
       
        let id
        let currentProduct = req.body.product;
        let size = req.body.size;
        let currentUser = req.user.username;
        let toppings = [
            req.body.topping01,
            req.body.topping02,
            req.body.topping03,
            req.body.topping04,
            req.body.topping05,
            req.body.topping06
        ]
        toppings = toppings.filter(t => t !== undefined)        

        Order.create({
            creator: currentUser,
            product: currentProduct,
            toppings: toppings,
            size: size
        }).then((p) => {
            id = p._id
            res.redirect(`/order-details/:${id}`)
        }).catch(err => console.log(err))
    
    },

    orderDetails: (req, res) => {
        let id = (req.params.id)
        id = id.substr(1);
 
            Order.findById(id)
                    .then(order => {
                        res.render('orders/order-details', order)
                    })
                    .catch(err => console.log(err.message))
            
    },

    orderStatus: (req, res) => {
        let user = res.locals.currentUser.username
        Order.find({creator: user})
                .then(orders => {
                    console.log(orders)
                    res.render('orders/order-status', orders)
                })
                .catch(err => console.log(err))

        
    }

}