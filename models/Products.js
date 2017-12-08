/**
 * Schema products creation
 * @author BEN CHEIKH Ramy <ramy.bencheih@ynov.com>
 *
 */


/** inclusion of the Mongoose module and mongoose-double module*/
    const mongoose =require('mongoose')
    require('mongoose-double')(mongoose);


    const SchemaTypes = mongoose.Schema.Types;

    /**
     * We create a schema product that we use to define the types of variables and structure our data
     *
     **/

    const productSchema = new mongoose.Schema ({
        name : {type:String, required: true},
        price : {type :SchemaTypes.Double, required: true}
    });


module.exports = mongoose.model('Product', productSchema);