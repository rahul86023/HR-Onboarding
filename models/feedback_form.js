const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    Full_Name:{
        type: String,
        required: true
    
    },

    Email_ID: {
        type: String,
        required: true,
        //unique: true
    },
    
    feedback1:{
        type: String,
      //  required: true
    },

    feedback2:{
        type: String,
       // required: true
    },

    feedback3:{
        type: String,
       // required: true
    },

    feedback4:{
        type: String,
        //required: true
    },

    feedback5:{
        type: String,
        //required: true
    },

    feedback6:{
        type: String,
       // required: true
    },

    feedback7:{
        type: String,
       // required: true
    },

    feedback8:{
        type: String,
        //required: true
    },

    feedback9:{
        type: String,
       // required: true
    },

    feedback10:{
        type: String,
      //  required: true
      }
    }, {
        timestamps: true
    });
    
const feedback1 = mongoose.model('feedback',feedbackSchema);

module.exports = feedback1;
