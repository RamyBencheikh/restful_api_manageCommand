const Order = require('../../models/Orders');

/**
 * This function confirm one order
 * @param req
 * @param res
 */
exports.confirm_an_order = function (req, res) {
    if(!req.body){
        res.status(400).send({message: "Order can not be empty"});
    }else {
        /**
         * This request modify the order with the req.params.id, using the information in req.body
         * @param req.params.id - This parameter contains the id from the order
         * @param req.body - This parameter contains the information, which has to be modified
         */
        Order.findByIdAndUpdate( req.params.id, req.body,  function(err, order) {
            if (err) {
                res.status(403).send({message: "Could not retrieve Order with id " + req.params.idOrder});
            } else {
                res.json(order);
            }
        });
    }

};