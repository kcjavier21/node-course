const Joi = require('joi');
const mongoose = require('mongoose');

// =========== Schema =============

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55
    },

    isGold: {
        type: Boolean,
        required: true
    },

    phone:{
        type: String,
        required: true
    }
});

// ========= Create Model ===============
const Customer = mongoose.model('Customer', customerSchema);

// =========== VALIDATE Customer ===========
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;