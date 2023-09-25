const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.resetPassword = (email1,token) => {

    let link = 'http://localhost:8000/employees/newPassword/'+token;
    let htmlString = nodeMailer.renderTemplate({link: link, email: email1},'/reset_mailer.ejs');
    
    nodeMailer.transporter.sendMail({
       from: "no-reply@gmail.com",
       to: email1,
       subject: "Password reset request",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}