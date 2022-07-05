
const nodemailer = require("nodemailer");


const enviarEmail= async (mailOptions) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PSSWRD_MAIL
        }
    });

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
}


module.exports = {enviarEmail};

 