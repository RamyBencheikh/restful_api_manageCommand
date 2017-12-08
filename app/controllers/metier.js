const Order = require('../../models/Orders');

exports.confirm_an_order = function (req, res) {

    Order.findByIdAndUpdate( req.params.id, req.body,  function(err, order) {
        if (err) {
            res.status(403).send(err);
        } else {
            res.json(order);
        }
    });

}