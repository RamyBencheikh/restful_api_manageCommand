const Product = require('../../models/Products');

/**
 * Function to create a new product
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.create_a_product = function (req, res) {
    /**
     * Create a new order object using model "Products"
     * Stock datas in fields of product
     */
    var new_product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    /**
     * Function create the order using the new_product object defined previously
     */
    new_product.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Product."});
        } else {
            res.send(data);
        }
    });
};

/**
 * Function to list all product
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.list_all_product = function (req, res) {
    /**
     * This function lists all Product and their datas
     * @param err - will fetch the error if there is one
     * @param order - will fetch the response
     */
    Product.find(function(err, product){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving product."});
        } else {
            res.send(product);
        }
    });

};

/**
 * Function to list One product by id
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.list_a_product = function (req, res) {
    /**
     * Fetching the product using the id given by the function
     * @param err - will fetch the error if there is one
     * @param dataOrder - will fetch the response
     */
    Product.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve Product with id " + req.params.id});
        } else {
            res.send(data);
        }
    });

};


/**
 * Function to modificate a profuct
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.update_a_product = function (req, res) {
    /**
     * Fetching the product using the id given by the request
     * @param err - will fetch the error if there is one
     * @param data - will fetch the response
     */
    Product.findByIdAndUpdate( req.params.id, req.body,  function(err, product) {
        if (err) {
            res.status(403).send(err);
        } else {
            res.json(product);
        }
    });
};

/**
 * Function to delete a product
 * @param req - This variable is the request informations
 * @param res - This variable is the response information
 */
exports.delete_a_product = function (req, res) {
    /**
     * Fetching the product using the id given by the request
     * @param err - will fetch the error if there is one
     * @param data - will fetch the response
     */
    Product.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) {
            res.status(403).send(err);
        } else {
            res.send({message: "Deleted successful"});
        }
    });
}