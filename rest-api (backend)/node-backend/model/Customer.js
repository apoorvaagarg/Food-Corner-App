const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Customer = new Schema({
    customer_name:{
        type:String
    },
    customer_email:{
        type:String
    },
    customer_phone:{
        type:String
    },
    customer_address:{
        type:String
    }
},
{
    collection:'CustomerInfo'
}
)

module.exports = mongoose.model('Customer', Customer)