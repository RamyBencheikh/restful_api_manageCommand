const Orderline = require('../../models/Orderlines'),
    Product = require('../../models/Products'),
    Order = require('../../models/Orders');
const ObjectId = require('mongodb').ObjectID;

exports.add_orderline = function (req, res) {
    if(!req.body) {
        res.status(400).send({message: "Orderline can not be empty"});
    }
    else{
        var orderId = req.params.id;
        var quantity = req.body.quantity;
        var productName = req.body.product;

        Product.find({}, {'_id' : true}).where({ name:productName}).exec(function (err, data) {
            if (err){
                res.status(404).send(err);
            }
            else{

                var id = ObjectId(data[0]._id);
                var new_orderline = new Orderline({product: id, order: orderId, quantity: quantity});
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



exports.delete_an_orderline = function (req, res) {
    Orderline.findById(req.params.idLine, function (err, dataOrderline) {
        if (err) {
            res.status(500).send({message: "Could not retrieve Orderline with id " + req.params.idOrder});
        } else {
            Order.findById(dataOrderline.order, function (err, dataOrder) {
                if (err) {
                    res.status(500).send({message: "Could not retrieve Order with id " + req.params.idOrder});
                }
                else {
                    if (dataOrder.status == 'confirmed') {
                        res.status(403).send({message: "Unable to delete your orderline because this order is already confirmed"})
                    }
                    else {
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



exports.modify_an_orderline = function (req, res) {
    Orderline.findById(req.params.idLine, function(err, dataOrderline) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Orderline with id " + req.params.idOrder});
        } else {
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
