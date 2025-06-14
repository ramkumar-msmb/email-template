const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// Mailtrap SMTP Configuration
const mailtrapConfig = {
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '3da72511aa7730',
    pass: process.env.SMTP_PASS || 'c3ad33357513bb'
  },
  tls: {
    rejectUnauthorized: false
  }
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport(mailtrapConfig);
};

// Email templates configuration
const emailTemplates = {
  doctorAccountCreated: {
    templatePath: path.join(__dirname, '../templates/doctor-account-created.ejs'),
    subject: 'Welcome to SendScript - Account Created Successfully!'
  },
  pharmacistWithSign: {
    templatePath: path.join(__dirname, '../templates/pharmacist-with-sign.ejs'),
    subject: 'Private Prescription - Pharmacist Copy'
  },
  pharmacyVerification: {
    templatePath: path.join(__dirname, '../templates/pharmacy-verification.ejs'),
    subject: 'Your One-Time Password (OTP) - SendScript'
  },
  prescriptionWithSign: {
    templatePath: path.join(__dirname, '../templates/prescription-with-sign.ejs'),
    subject: 'Private Prescription with Electronic Signature'
  },
  prescriptionWithoutSign: {
    templatePath: path.join(__dirname, '../templates/prescription-without-sign.ejs'),
    subject: 'Private Prescription for Manual Signature'
  },
  sendToken: {
    templatePath: path.join(__dirname, '../templates/send-token.ejs'),
    subject: 'Electronic Private Prescription - Prescription ID'
  },
  sendToUnregisterPharmacy: {
    templatePath: path.join(__dirname, '../templates/sendto-unregister-pharmacy.ejs'),
    subject: 'Electronic Private Prescription from SendScript'
  },
  forgotPassword: {
    templatePath: path.join(__dirname, '../templates/forgot-password.ejs'),
    subject: 'Reset Your SendScript Password - Verification Code Inside'
  },
  invoiceGenerate: {
    templatePath: path.join(__dirname, '../templates/invoice-generate.ejs'),
    subject: 'Invoice from SendScript Pharmacy'
  }
};

module.exports = {
  createTransporter,
  emailTemplates,
  mailtrapConfig
}; 