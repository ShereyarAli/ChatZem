const nodemailer = require('nodemailer')

const transport = async(email,subject,text) => {
  try {
    const transporter = nodemailer.createTransport({
      host:process.env.HOST,
      service:process.env.SERVICE,
      post:Number(process.env.EMAIL_PORT),
      secure:Boolean(process.env.SECURE),
      auth:{
        user: process.env.USER,
        pass: process.env.PASS
      }
    })
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject:subject,
      text:text
    });
    console.log('Email sent Sucessfully')
  } 
  catch (error) {
    console.log(error)
  } 
}
module.exports = transport