
module.exports = function(app) {

/**
 * Routes API
 * ----
*/

    /**
     * Products Routes
     * ----------------
     */

    var product = require('../controllers/product.js');

    /** Create a product*/
    app.post('/product', product.create_a_product);

    /** Retrieve all Product*/
    app.get('/product', product.list_all_product);

    /**Retrieve a single Product with id*/
    app.get('/product/:id', product.list_a_product);

    /**Update a Product with id*/
    app.put('/product/:id', product.update_a_product);

    /**Delete a Product with id*/
    app.delete('/product/:id', product.delete_a_product);


    /**
     * Orders Routes
     */
    var order = require('../controllers/order.js');

    /**Create a new Orders*/
    app.post('/order', order.create_an_order);

    /**Retrieve all Orders*/
    app.get('/order', order.list_all_order);

    /**Retrieve a single Orders with id*/
    app.get('/order/:id', order.list_an_order);

    /**Update a Orders with id*/
    app.put('/order/:id', order.update_an_order);

    /**Delete a Orders with id*/
    app.delete('/order/:id', order.delete_an_order);


    /**
     * Orderline Routes
     * ----------------
     */

    var orderline = require('../controllers/orderline');

    /**Add a orderline*/
    app.post('/order/:id/line', orderline.add_orderline);

    /**Delete a orderline*/
    app.delete('/order/:idOrder/line/:idLine',  orderline.delete_an_orderline);

    /**Modify a orderline*/
    app.put('/orderline/idOrder/line/:idLine', orderline.modify_an_orderline);

    /**
     * Metier Routes
     * --------------
     */
    var metier = require('../controllers/metier');
    /**Confirm one order*/
    app.put('/order/:id/confirm', metier.confirm_an_order);
}