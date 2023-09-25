const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Full_Name: {
        type: String,
        required: true
    },
	Email_ID: {
        type: String,
        required: true,
    
    },
    Mobile_Number: {
        type: String,
        required: true
    },
	Your_Message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const contactUs = mongoose.model('contactUs',contactSchema);

module.exports = contactUs;