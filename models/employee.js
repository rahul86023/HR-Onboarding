const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    empId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    kitStatus:{
        type: String,
        default: 'Pending'
    },
    resetToken:String,
    expireToken: Date
}, {
    timestamps: true
});

const Emp = mongoose.model('Emp',employeeSchema);

module.exports = Emp;


