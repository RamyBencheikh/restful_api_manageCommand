/**
 * Inclusion of the Mongoose module and mongoose-double module
 * */
    const mongoose =require('mongoose')
    require('mongoose-double')(mongoose),
    Schema = mongoose.Schema;

    const SchemaTypes = mongoose.Schema.Types;

/**
 * Oderline Models
 * ----------------
 *
 * @type {mongoose.Schema} - We create a schema orderline that we use to define the types of variables and structure our data
 */

const orderlineSchema = new mongoose.Schema ({
        product : [{ type: Schema.ObjectId, ref:"product"}],
        order : [{ type:Schema.ObjectId, ref:"order" }],
        quantity: {type :SchemaTypes.Number}
    });
module.exports = mongoose.model('Orderline', orderlineSchema);
