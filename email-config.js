const nodemailer = require('nodemailer');

// Mailtrap SMTP Configuration
const mailtrapConfig = {
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '3da72511aa7730',
    pass: 'c3ad33357513bb'
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
    templatePath: './doctor-account-created.ejs',
    subject: 'Welcome to SendScript - Account Created Successfully!'
  },
  pharmacistWithSign: {
    templatePath: './pharmacist-with-sign.ejs',
    subject: 'Private Prescription - Pharmacist Copy'
  },
  pharmacyVerification: {
    templatePath: './pharmacy-verification.ejs',
    subject: 'Your One-Time Password (OTP) - SendScript'
  },
  prescriptionWithSign: {
    templatePath: './prescription-with-sign.ejs',
    subject: 'Private Prescription with Electronic Signature'
  },
  prescriptionWithoutSign: {
    templatePath: './prescription-without-sign.ejs',
    subject: 'Private Prescription for Manual Signature'
  },
  sendToken: {
    templatePath: './send-token.ejs',
    subject: 'Electronic Private Prescription - Prescription ID'
  },
  sendToUnregisterPharmacy: {
    templatePath: './sendto-unregister-pharmacy.ejs',
    subject: 'Electronic Private Prescription from SendScript'
  },
  forgotPassword: {
    templatePath: './forgot-password.ejs',
    subject: 'Reset Your SendScript Password - Verification Code Inside'
  },
  invoiceGenerate: {
    templatePath: './invoice-generate.ejs',
    subject: 'Invoice from SendScript Pharmacy'
  }
};

module.exports = {
  createTransporter,
  emailTemplates,
  mailtrapConfig
}; 