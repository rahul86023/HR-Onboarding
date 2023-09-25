const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const DOCUMENT_PATH = path.join('/uploads/employees/documents');

const uploadSchema = new mongoose.Schema({
   
    Upload_Photograph: {
        type: String
    },
    Upload_Signature: {
       type: String
    },
    PAN_Card_Front: {
        type: String
    },
    Aadhar_Card_Front: {
        type: String
    },
    Aadhar_Card_Back: {
       type: String
    },
    Upload_front_page_of_your_Passbook: {
        type: String
    }, 
    Upload_your_pay_slip_from_last_organization: {
        type: String
   }

}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', DOCUMENT_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  });

  uploadSchema.statics.FilesPath = DOCUMENT_PATH;

// static
/*uploadSchema.statics.document1Upload_Photograph = multer({storage:  storage}).single('Upload_Photograph');
uploadSchema.statics.Upload_PhotographPath = DOCUMENT_PATH;

uploadSchema.statics.document2Upload_Signature = multer({storage:  storage}).single('Upload_Signature');
uploadSchema.statics.Upload_SignaturePath = DOCUMENT_PATH;

uploadSchema.statics.document3PAN_Card_Front = multer({storage:  storage}).single('PAN_Card_Front');
uploadSchema.statics.PAN_Card_FrontPath = DOCUMENT_PATH;

uploadSchema.statics.document4Aadhar_Card_Front = multer({storage:  storage}).single('Aadhar_Card_Front');
uploadSchema.statics.Aadhar_Card_FrontPath = DOCUMENT_PATH;

uploadSchema.statics.document5Aadhar_Card_Back = multer({storage:  storage}).single('Aadhar_Card_Back');
uploadSchema.statics.Aadhar_Card_BackPath = DOCUMENT_PATH;

uploadSchema.statics.document6Upload_front_page_of_your_Passbook = multer({storage:  storage}).single('Upload_front_page_of_your_Passbook');
uploadSchema.statics.Upload_front_page_of_your_PassbookPath = DOCUMENT_PATH;

uploadSchema.statics.document7Upload_your_pay_slip_from_last_organization = multer({storage:  storage}).single('Upload_your_pay_slip_from_last_organization');
uploadSchema.statics.Upload_your_pay_slip_from_last_organizationPath = DOCUMENT_PATH;
*/

var upload = multer({ storage: storage });
uploadSchema.statics.uploadMultiple = upload.fields([{ name: 'Upload_Photograph' }, { name: 'Upload_Signature' },{ name: 'PAN_Card_Front' },{ name: 'Aadhar_Card_Front' },{ name: 'Aadhar_Card_Back'},{ name: 'Upload_front_page_of_your_Passbook'},{ name: 'Upload_your_pay_slip_from_last_organization'}])


const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;