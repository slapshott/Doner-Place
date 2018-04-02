const controllers = require('../controllers');
const restrictedPages = require('./auth');
const auth = require('./auth');

module.exports = app => {

    // Home
    app.get('/', controllers.home.index);

    // Authentication
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.get('/logout', controllers.user.logout);

    // Add Product
    app.get('/createProduct', auth.hasRole('Admin'), controllers.product.viewAddProduct);
    app.post('/createProduct', auth.hasRole('Admin'), controllers.product.addProduct);
    
    // Delete product
    app.delete('/deleteProduct/:id', controllers.product.deleteProduct);

    // Orders 
    app.get('/order/:id', auth.isAuthed, controllers.order.viewOrder);
    app.post('/order/:id', auth.isAuthed, controllers.order.viewOrderPost);

    // Order-Details
    app.get('/order-details/:id', controllers.order.orderDetails);
    
    // Order Status
    app.get('/order-status', controllers.order.orderStatusGet)
    app.post('/order-status', controllers.order.orderStatusPost)

    // Error
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};