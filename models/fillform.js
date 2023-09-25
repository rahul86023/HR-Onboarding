const mongoose = require('mongoose');

const fillformSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
	lname: {
        type: String,
        required: true,
    
    },
    empId:{
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    }, 
    marital_status: {
        type: String,
        required: true
    }, 
    nationality: {
        type: String,
        required: true
    }, 
    bloodgrp: {
        type: String,
        required: true
    }, 
    aadhar: {
        type: Number,
    }, 
    pan: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number,
        required: true
    }, 
    size: {
        type: String,
        required: true
    },

        line1:{
            type:String,
            required: true
        },
        line2:{
            type:String,
            required: true
        },
        pin:{
            type:Number,
            required: true
        },
        city:{
            type:String,
            required: true
        },
        state:{
            type:String,
            required: true
        },
        country:{
            type:String,
            required: true
        },
    family:[{
        mother:[{
            Mname: {
                type: String,
                required: true
            },
            Mdob: {
                type: String,
                required: true
            },
            Mgender: {
                type: String,
                required: true
            },
            Moccupation: {
                type: String,
                required: true
            }
        }],
        father:[{
            Fname: {
                type: String,
                required: true
            },
            Fdob: {
                type: String,
                required: true
            },
            Fgender: {
                type: String,
                required: true
            },
            Foccupation: {
                type: String,
                required: true
            }
        }],
        spouse:[{
            Sname: {
                type: String
            },
            Sdob: {
                type: String
            },
            Sgender: {
                type: String
            },
            Soccupation: {
                type: String
            }
        }],
    }],
    education:[{
        X:[{
            Xyear: {
                type: String,
                required: true
            },
            Xcollege: {
                type: String,
                required: true
            },
            Xboard: {
                type: String,
                required: true
            },
            Xpercent: {
                type: String,
                required: true
            }
        }],
        X:[{
            Xyear: {
                type: String,
                required: true
            },
            Xcollege: {
                type: String,
                required: true
            },
            Xboard: {
                type: String,
                required: true
            },
            Xpercent: {
                type: String,
                required: true
            }
        }],
        XII:[{
            XIIyear: {
                type: String,
                required: true
            },
            XIIcollege: {
                type: String,
                required: true
            },
            XIIboard: {
                type: String,
                required: true
            },
            XIIpercent: {
                type: String,
                required: true
            }
        }],
        Graduation:[{
            Gyear: {
                type: String
            },
            Gcollege: {
                type: String
            },
            Gboard: {
                type: String
            },
            Gpercent: {
                type: String
            }
        }],
        PostGraduation:[{
            PGyear: {
                type: String
            },
            PGcollege: {
                type: String
            },
            PGboard: {
                type: String
            },
            PGpercent: {
                type: String
            }
        }]
    }],
    awards:{
        type: String,
        required: true
    },
    lang1:{
        type: String,
        required: true
    },
    read1:{
        type: String,
        required: true
    },
    write1:{
        type: String,
        required: true
    },
    speak1:{
        type: String,
        required: true
    },
    fluent1:{
        type: String,
        required: true
    },
    lang2:{
        type: String,
    },
    read2:{
        type: String,
    },
    write2:{
        type: String,
    },
    speak2:{
        type: String,
    },
    fluent2:{
        type: String,
    },
    lang3:{
        type: String,
    },
    read3:{
        type: String,
    },
    write3:{
        type: String,
    },
    speak3:{
        type: String,
    },
    fluent3:{
        type: String,
    },
    org1:{
        type: String,
    },
    state1:{
        type: String,
    },
    period1:{
        type: String,
    },
    desig1:{
        type: String,
    },
    rsn1:{
        type: String,
    },
    org2:{
        type: String,
    },
    state2:{
        type: String,
    },
    period2:{
        type: String,
    },
    desig2:{
        type: String,
    },
    rsn2:{
        type: String,
    },         
    strength:{
        type: String,
    },
    hobbies:{
        type: String,
    }
}, {
    timestamps: true
});


const fillForm = mongoose.model('fillForm',fillformSchema);

module.exports = fillForm;