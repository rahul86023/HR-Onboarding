const mongoose = require('mongoose');

const new_hireSchema = new mongoose.Schema({

    employee_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    email: {
        type: String,
      //  required: true
    },
    Mobile_no: {
        type: String,
        required: true
    },
    joining_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    onboardingStatus:{
        type: String,
        default: 'Pending'
    },
    kitStatus:{
        type: String,
        default: 'Not issued'
    },
    VerificationStatus:{
        type: String,
        default: 'Pending'
    },
    
    Comments: {
        type: String,
        default: 'No Comments'
    }
    
    
}, {
    timestamps: true
});


const Newhire = mongoose.model('Newhire', new_hireSchema);

module.exports = Newhire;