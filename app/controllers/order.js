const Order = require('../../models/Orders'),
        Orderline = require('../../models/Orderlines');


/**
 * Function to create a new order
 * @param req
 * @param res
 */
exports.create_an_order = function (req, res) {
    // Create and Save a new Product
    if(!req.body) {
        res.status(400).send({message: "Order can not be empty"});
    }
    var new_order = new Order({
        code: req.body.code || "Untitled Order",
        total: req.body.total,
        status: req.body.status

    });

    new_order.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Order."});
        } else {
            res.send(data);
        }
    });
}

/**
 * Function to list all order
 * @param req
 * @param res
 */
exports.list_all_order = function (req, res) {
    Order.find(function(err, order){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving Order."});
        } else {
            res.send(order);
        }
    });
};


exports.list_an_order= function (req, res) {
    Order.findById(req.params.id, function(err, dataOrder) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            Orderline.find().where({ order:req.params.id}).exec(function (err, dataOrderline) {
                if(err){
                    res.status(500).send({message:"Some error while retrieving Orderline"})
                }
                else {
                    res.send(dataOrder, dataOrderline);
                }
            });
        }
    });
};

/**
 * Function to modificate a order if he is not confirmed
 * @param req
 * @param res
 */
exports.update_an_order = function (req, res) {
    // Updating a product
    Order.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            if(data.status=='confirmed')
            {
                res.status(403).send({message: "Unable to modify your order because it is already confirmed"})
            }
            else
            {
                Order.findByIdAndUpdate( req.params.id, req.body,  function(err, order) {
                    if (err) {
                        res.status(403).send(err);
                    } else {
                        res.json(order);
                    }
                });
            }
        }
    });
}

/**
 * Function to delete a order if he is not confirmed
 * @param req
 * @param res
 */
exports.delete_an_order = function (req, res) {
    Order.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            if(data.status=='confirmed')
            {
                res.status(403).send({message: "Unable to delete your order because it is already confirmed"})
            }
            else
            {
                Order.findByIdAndRemove(req.params.id, function (err, data) {
                    if (err) {
                        res.status(403).send(err);
                    } else {
                        res.send({message: "Deleted with success"});
                    }
                });
            }
        }
    });
}