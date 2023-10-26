const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  /*tls: {
    secure: true,
    ignoreTLS: true,
    rejectUnauthorized: false,
    ciphers:'SSLv3'
}*/
});


module.exports ={ enviarEmail :(mailOptions) => { 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
 }}