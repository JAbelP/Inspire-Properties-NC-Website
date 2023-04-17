import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { clientEmail, clientPhone, clientAddress } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const info = await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'destination-email@example.com',
    subject: 'New form submission',
    text: `Client Email: ${clientEmail}\nClient Phone: ${clientPhone}\nClient Address: ${clientAddress}`,
  });

  res.status(200).json({ message: 'Form submitted successfully!' });
}
