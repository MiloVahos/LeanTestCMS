const SES = require('aws-sdk/clients/ses')
const nodemailer = require('nodemailer')

const ses = new SES()

const sendEmail = async (destination, message) => {
  try {
    const payload = {
      from: process.env.AWS_SENDER_ADDRESS_EMAIL,
      to: destination,
      subject: message
    }
    const transporter = nodemailer.createTransport({ SES: ses })
    const sendResult = await transporter.sendMail(payload)
    if (!sendResult) return false
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = { sendEmail }