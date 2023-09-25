const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.itList = (email1) => {

    let link="http://localhost:8000/HRs/itList";
    let htmlString = nodeMailer.renderTemplate({link: link},'/it_mailer.ejs');

    nodeMailer.transporter.sendMail({
       from: "no-reply@gmail.com",
       to: email1,
       subject: "Employee List for arranging welcome kit",
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