module.exports = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    method: req.method,
    env: {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      hasRecipient: !!process.env.RECIPIENT_EMAIL,
    },
  });
};
