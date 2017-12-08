const Product = require('../../models/Products');

exports.create_a_product = function (req, res) {
    // Create and Save a new Product
    var new_product = new Product({name: req.body.name || "Untitled Product", price: req.body.price});

    new_product.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Product."});
        } else {
            res.send(data);
        }
    });
}


exports.list_all_product = function (req, res) {
    // Retrieve and return all Product from the database.
    Product.find(function(err, product){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving product."});
        } else {
            res.send(product);
        }
    });

}


exports.list_a_product = function (req, res) {
    // Retrieve and return a Product by id from the database
    Product.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Product with id " + req.params.id});
        } else {
            res.send(data);
        }
    });

}


exports.update_a_product = function (req, res) {
    // Updating a product
    Product.findByIdAndUpdate( req.params.id, req.body,  function(err, product) {
        if (err) {
            res.status(403).send(err);
        } else {
            res.json(product);
        }
    });
}


exports.delete_a_product = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) {
            res.status(403).send(err);
        } else {
            res.send({message: "Supprimer avec succées"});
        }
    });
}