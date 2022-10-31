const mongoose = require('mongoose');

const authnewSchema = new mongoose.Schema({
	phoneNumber:{
		type: Number,
		required:true
	},
	otp:{
		type: Number,
		required:true
	}
})

module.exports = mongoose.model('authnew',authnewSchema)