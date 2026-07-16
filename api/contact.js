const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (name.length > 100 || message.length > 5000) {
    return res.status(400).json({ error: 'Name or message too long.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name.replace(/</g, '&lt;')}</p>
        <p><strong>Email:</strong> ${email.replace(/</g, '&lt;')}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/</g, '&lt;').replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};