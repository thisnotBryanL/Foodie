const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    foodName: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    restaurant: {type: String, required: true},

}, {
    timestamps = true,
});

const Food = mongoose.model('Food', userSchema);

module.exports = Food;