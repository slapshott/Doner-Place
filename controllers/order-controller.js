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
            res.redirect(`/order-details/${id}`)
        }).catch(err => console.log(err))
    
    },

    orderDetails: (req, res) => {
        let id = (req.params.id)
 
            Order.findById(id)
                    .then(order => {
                        res.render('orders/order-details', order)
                    })
                    .catch(err => console.log(err.message))
            
    },

    orderStatusGet: (req, res) => {
        
        let user = res.locals.currentUser.username
        if(user === 'Admin'){
            // console.log('Admin view')
            Order.find()
                    .then((orders) => {
                        res.render('admin/order-status', {orders})
                    })
        }else{
            Order.find({creator: user})
                .then(orders => {
                    res.render('orders/order-status', {orders})
                })
                .catch(err => console.log(err))
        }    

    },

    orderStatusPost: (req, res) => {
        
        let ordersStatus = req.body
        rdersStatus = ordersStatus.orders
        console.log(ordersStatus)
        // Order.findOneAndUpdate
    }

}