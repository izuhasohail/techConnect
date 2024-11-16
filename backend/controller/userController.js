import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import nodemailer from 'nodemailer';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('the body is ', req.body)
  try {
    const user = new User({ name, email, password });
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.verificationToken = verificationToken;

    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });
    

    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${process.env.BASE_URL}/user/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: 'hoooooo Error sending email' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ msg: 'Verification email sent' });
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error signing up' });
  }
};



export const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid token' });
      }
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.status(200).json({ msg: 'Email verified successfully' });
    } catch (error) {
      res.status(400).json({ msg: 'Invalid or expired token' });
    }
  };

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ msg: 'Invalid email or password' });
      }
  
      if (!user.isVerified) {
        return res.status(401).json({ msg: 'Please verify your email first' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ msg: 'Error logging in' });
    }
  };