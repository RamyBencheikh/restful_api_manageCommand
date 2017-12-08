/**
 * Inclusion of the Mongoose module and mongoose-double module
 * @type {mongoose}
 * @type {mongoose-double}
 */
const mongoose =require('mongoose')
    require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;

/**
 * Order Model
 * ------------
 *
 * @type {mongoose.Schema} - We create a schema order that we use to define the types of variables and structure our data
 */
const orderSchema = new mongoose.Schema({
     code : String,
     date : { type : Date, default : Date.now},
     total: {type :SchemaTypes.Double},
     status: {type: String, enum: ['draft', 'confirmed'], default:'draft'}
});


module.exports = mongoose.model('Order', orderSchema);