const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const storeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
	address: { type: String, required: true },
    image: { type: String, required: true },
	floor: { type: Number, required: true},
	total_floor: { type: Number, required: true},
	parking_availability: { type:Boolean, required: true},
	key_money: { type: Number, required: true },
	monthly_rent: { type: Number, required: true },
	deposit: { type: Number, required: true },
	maintenance_cost: { type: Number, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Store', storeSchema);