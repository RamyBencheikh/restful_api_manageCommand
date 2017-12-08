const Orderline = require('../../models/Orderlines'),
    Product = require('../../models/Products'),
    Order = require('../../models/Orders');
const ObjectId = require('mongodb').ObjectID;

/**
 * This function add a orderline
 * @param req
 * @param res
 */
exports.add_orderline = function (req, res) {
    if(!req.body) {
        res.status(400).send({message: "Orderline can not be empty"});
    }
    else{
        var orderId = req.params.id;
        var quantity = req.body.quantity;
        var productName = req.body.product;

        /**This request return the id, according to the name of the product*/
        Product.find({}, {'_id' : true}).where({ name:productName}).exec(function (err, data) {
            if (err){
                res.status(404).send(err);
            }
            else{

                var id = ObjectId(data[0]._id);
                /**
                 * Create a new orderline object using model "Orderline"
                 * Stock datas in fields of orderline
                 */
                var new_orderline = new Orderline({
                    product: id,
                    order: orderId,
                    quantity: quantity
                });

                /**
                 * Function create the order using the new_order object defined previously
                 */
                new_orderline.save(function(err, data) {
                    if(err) {
                        console.log(err);
                        res.status(500).send({message: "Some error occurred while creating the Order."});
                    } else {
                        res.send(data);
                    }
                });
            }
        });
    }
}


/**
 * This function delete a orderline if this order is not confirmed
 * @param req
 * @param res
 */
exports.delete_an_orderline = function (req, res) {
    /**
     * Fetching the orderline using the id given by the request
     * @param err - will fetch the error if there is one
     * @param dataOrderline - will fetch the response
     */
    Orderline.findById(req.params.idLine, function (err, dataOrderline) {
        if (err) {
            res.status(500).send({message: "Could not retrieve Orderline with id " + req.params.idOrder});
        } else {
            /**
             * Fetching the order using the id given by the request
             * @param err - will fetch the error if there is one
             * @param dataOrder - will fetch the response
             */
            Order.findById(dataOrderline.order, function (err, dataOrder) {
                if (err) {
                    res.status(500).send({message: "Could not retrieve Order with id " + req.params.idOrder});
                }
                else {
                    if (dataOrder.status == 'confirmed') {
                        res.status(403).send({message: "Unable to delete your orderline because this order is already confirmed"})
                    }
                    else {
                        /**
                         * This request delete the order with the req.params.idLine
                         * @param req.params.id - This parameter contains the id from the order
                         */
                        Orderline.findByIdAndRemove(req.params.idLine, function (err, data) {
                            if (err) {
                                res.status(403).send(err);
                            } else {
                                res.send({message: "Deleted with success"});
                            }
                        });
                    }
                }
            })
        };
    })
}


/**
 * This function modify a orderline if this order is not confirmed
 * @param req
 * @param res
 */
exports.modify_an_orderline = function (req, res) {
    /**
     * Fetching the orderline using the id given by the request
     * @param err - will fetch the error if there is one
     * @param dataOrderline - will fetch the response
     */
    Orderline.findById(req.params.idLine, function(err, dataOrderline) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Orderline with id " + req.params.idOrder});
        } else {
            /**
             * Fetching the order using the id given by the request
             * @param err - will fetch the error if there is one
             * @param dataOrder - will fetch the response
             */
            Order.findById(dataOrderline.order, function(err, dataOrder) {
                if(err) {
                    res.status(500).send({message: "Could not retrieve Order with id " + req.params.idOrder});
                }
                if(dataOrder.status=='confirmed')
                {
                    res.status(403).send({message: "Unable to delete your orderline because this order is already confirmed"})
                }
                else
                {
                    /**
                     * This request modify the orderline with the req.params.idLine, using the information in req.body
                     * @param req.params.idLine - This parameter contains the id from the orderline
                     */
                    Orderline.findByIdAndUpdate(req.params.idLine, function (err, data) {
                        if (err) {
                            res.status(403).send(err);
                        } else {
                            res.json(data);
                        }
                    });
                }
            })
        };
    })
}
