const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.welcomeMail = (email,employeeId) => {
    let link="http://localhost:8000/";
    let htmlString = nodeMailer.renderTemplate({link: link, ID: employeeId},'/welcome_mailer.ejs');
    nodeMailer.transporter.sendMail({
       from: 'no-replay@gmail.com',
       to: email,
       subject: "Welcome Mail!",
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