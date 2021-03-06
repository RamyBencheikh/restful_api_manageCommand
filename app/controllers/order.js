/**
 * Inclusion of the Orders and Orderlines Models
 */
const Order = require('../../models/Orders'),
    Orderline = require('../../models/Orderlines');


/**
 * Function to create a new order
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.create_an_order = function (req, res) {
    if(!req.body) {
        res.status(400).send({message: "Order can not be empty"});
    }
    /**
     * Create a new order object using model "Orders"
     * Stock datas in fields of orders
     */
    var new_order = new Order({
        code: req.body.code,
        total: req.body.total,
        status: req.body.status

    });
    /**
     * Function create the order using the new_order object defined previously
     */
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
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.list_all_order = function (req, res) {

    /**
     * This function lists all Orders and their datas
     * @param err - will fetch the error if there is one
     * @param order - will fetch the response
     */
    Order.find(function(err, order){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving Order."});
        } else {
            res.send(order);
        }
    });
};


/**
 * Function to list One order by id
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.list_an_order= function (req, res) {
    /**
     * Fetching the order using the id given by the function
     * @param err - will fetch the error if there is one
     * @param dataOrder - will fetch the response
     */
    Order.findById(req.params.id, function(err, dataOrder) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            /**
             * Fetching the orderline where field order equal id
             * @param dataOderline - Will fetch the Order where the value of "req.params.id" is
             */
            Orderline.find().where({ order:req.params.id}).exec(function (err, dataOrderline) {
                if(err){
                    res.status(500).send({message:"Some error while retrieving Orderline"})
                }
                else {
                    res.send(dataOrder);
                }
            });
        }
    });
};

/**
 * Function to modificate a order if he is not confirmed
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.update_an_order = function (req, res) {
    /**
     * Fetching the order using the id given by the request
     * @param err - will fetch the error if there is one
     * @param data - will fetch the response
     */
    Order.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            /**
             * @arg data.status - this variable contains the "statut" from the order
             */
            if(data.status=='confirmed')
            {
                res.status(403).send({message: "Unable to modify your order because it is already confirmed"})
            }
            else
            {
                /**
                 * This request modify the order with the req.params.id, using the information in req.body
                 * @param req.params.id - This parameter contains the id from the order
                 * @param req.body - This parameter contains the information, which has to be modified
                 */
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
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.delete_an_order = function (req, res) {
    /**
     * Fetching the order using the id given by the request
     * @param err - will fetch the error if there is one
     * @param data - will fetch the response
     */
    Order.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Order with id " + req.params.id});
        } else {
            /**
             * @arg data.status - this variable contains the "statut" from the order
             */
            if(data.status=='confirmed')
            {
                res.status(403).send({message: "Unable to delete your order because it is already confirmed"})
            }
            else
            {
                /**
                 * This function delete the order with the req.params.id
                 * @param req.params.id - This parameter contains the id from the order
                 */
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