import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.load();

/**
 * @description - Mail sender
 *
 * @param {Object} req - Object
 *
 * @param {Object} res - Object
 *
 * @return {Boolean} - Boolean - true or false
 */
export default function sendMail(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'no-reply@hellobooks.com', // sender address
    to: 'nosisky@gmail.com', // list of receivers
    subject: req.body.subject, // Subject line
    html: `<p>${req.body.message}</p>` // plain text body
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.status(400).send(false);
    } else {
      res.status(200).send(true);
    }
  });
}
