const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// Mailtrap SMTP Configuration
const mailtrapConfig = {
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '789288e866ee95',
    pass: process.env.SMTP_PASS || '4b499241a7bf76'
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
  // Account Management Templates
  accountBlockedBySuperAdmin: {
    templatePath: path.join(__dirname, '../templates/account-blocked-by-super-admin.ejs'),
    subject: 'Sendscript Account Access Restricted'
  },
  accountRejectedBySuperAdmin: {
    templatePath: path.join(__dirname, '../templates/account-rejected-by-super-admin.ejs'),
    subject: 'Sendscript Account Verification Unsuccessful'
  },
  doctorAccountCreated: {
    templatePath: path.join(__dirname, '../templates/doctor-account-created.ejs'),
    subject: 'Welcome to SendScript - Account Created Successfully!'
  },
  doctorAccountCreation: {
    templatePath: path.join(__dirname, '../templates/doctor-account-creation.ejs'),
    subject: 'Complete Your SendScript Registration'
  },
  doctorSuperAdminApproval: {
    templatePath: path.join(__dirname, '../templates/doctor-super-admin-approval.ejs'),
    subject: 'SendScript Account Approved - Welcome Aboard!'
  },
  signup: {
    templatePath: path.join(__dirname, '../templates/signup.ejs'),
    subject: 'Complete Your SendScript Registration - Verification Code Inside'
  },
  
  // Clinic Management Templates
  clinicJoinRequest: {
    templatePath: path.join(__dirname, '../templates/clinic-join-request.ejs'),
    subject: 'Clinic Join Request Submitted Successfully'
  },
  clinicRegistration: {
    templatePath: path.join(__dirname, '../templates/clinic-registration.ejs'),
    subject: 'Clinic Registration Request Submitted'
  },
  clinicRegistrationApproved: {
    templatePath: path.join(__dirname, '../templates/clinic-registration-approved.ejs'),
    subject: 'Clinic Registration Approved'
  },
  clinicRegistrationUnsuccessful: {
    templatePath: path.join(__dirname, '../templates/clinic-registration-unsuccessful.ejs'),
    subject: 'Clinic Registration Update Required'
  },
  inviteDoctor: {
    templatePath: path.join(__dirname, '../templates/invite-doctor.ejs'),
    subject: 'Invitation to Join SendScript Clinic'
  },
  
  // Email Verification Templates
  emailVerificationAccountCreation: {
    templatePath: path.join(__dirname, '../templates/email-verification-account-creation.ejs'),
    subject: 'Verify Your Email Address - SendScript'
  },
  emailVerificationOnboarding: {
    templatePath: path.join(__dirname, '../templates/email-verification-onboarding.ejs'),
    subject: 'Email Verification Required - SendScript'
  },
  updateEmailAddress: {
    templatePath: path.join(__dirname, '../templates/update-email-address.ejs'),
    subject: 'Confirm Your New Email Address - SendScript'
  },
  forgotPassword: {
    templatePath: path.join(__dirname, '../templates/forgot-password.ejs'),
    subject: 'Reset Your SendScript Password - Verification Code Inside'
  },
  reinitiateOnfidoVerification: {
    templatePath: path.join(__dirname, '../templates/reinitiate-onfido-verification.ejs'),
    subject: 'Complete Your Identity Verification - SendScript'
  },
  
  // Pharmacy Templates
  pharmacyVerification: {
    templatePath: path.join(__dirname, '../templates/pharmacy-verification.ejs'),
    subject: 'Your One-Time Password (OTP) - SendScript'
  },
  pharmacyOwnerBlocked: {
    templatePath: path.join(__dirname, '../templates/pharmacy-owner-blocked.ejs'),
    subject: 'Pharmacy Account Access Restricted'
  },
  pharmacyOwnerRegistrationApproved: {
    templatePath: path.join(__dirname, '../templates/pharmacy-owner-registration-approved.ejs'),
    subject: 'Pharmacy Registration Approved - Welcome to SendScript'
  },
  pharmacyOwnerRegistrationUnsuccessful: {
    templatePath: path.join(__dirname, '../templates/pharmacy-owner-registration-unsuccessful.ejs'),
    subject: 'Pharmacy Registration Update Required'
  },
  pharmacyViaPrescription: {
    templatePath: path.join(__dirname, '../templates/pharmacy-via-prescription.ejs'),
    subject: 'New Prescription Available - SendScript'
  },
  
  // Prescription Templates
  prescriptionWithSign: {
    templatePath: path.join(__dirname, '../templates/prescription-with-sign.ejs'),
    subject: 'Private Prescription with Electronic Signature'
  },
  prescriptionWithoutSign: {
    templatePath: path.join(__dirname, '../templates/prescription-without-sign.ejs'),
    subject: 'Private Prescription for Manual Signature'
  },
  prescriptionFromPharmacy: {
    templatePath: path.join(__dirname, '../templates/prescription-from-pharmacy.ejs'),
    subject: 'Your Prescription from Pharmacy via SendScript'
  },
  pharmacistWithSign: {
    templatePath: path.join(__dirname, '../templates/pharmacist-with-sign.ejs'),
    subject: 'Private Prescription - Pharmacist Copy'
  },
  sendToken: {
    templatePath: path.join(__dirname, '../templates/send-token.ejs'),
    subject: 'Electronic Private Prescription - Prescription ID'
  },
  sendToUnregisterPharmacy: {
    templatePath: path.join(__dirname, '../templates/sendto-unregister-pharmacy.ejs'),
    subject: 'Electronic Private Prescription from SendScript'
  },
  
  // Payment Templates
  paymentConfirmed: {
    templatePath: path.join(__dirname, '../templates/payment-confirmed.ejs'),
    subject: 'Payment Confirmation - SendScript'
  },
  paymentForPrescription: {
    templatePath: path.join(__dirname, '../templates/payment-for-prescription.ejs'),
    subject: 'Complete Your Prescription Payment'
  },
  paymentLink: {
    templatePath: path.join(__dirname, '../templates/payment-link.ejs'),
    subject: 'Payment Link - Complete Your Transaction'
  },
  paymentRequestFromPharmacy: {
    templatePath: path.join(__dirname, '../templates/payment-request-from-pharmacy.ejs'),
    subject: 'Payment Request From Pharmacy - SendScript'
  },
  
  // Invoice Templates
  invoiceGenerate: {
    templatePath: path.join(__dirname, '../templates/invoice-generate.ejs'),
    subject: 'Invoice from SendScript Pharmacy'
  },
  invoiceFromPharmacy: {
    templatePath: path.join(__dirname, '../templates/invoice-from-pharmacy.ejs'),
    subject: 'Invoice from Pharmacy via SendScript'
  },
  
  // Patient & Data Templates
  patientDataAccess: {
    templatePath: path.join(__dirname, '../templates/patient-data-access.ejs'),
    subject: 'Patient Data Access Request - SendScript'
  },
  
  // Special Templates
  lehEmailTemplate: {
    templatePath: path.join(__dirname, '../templates/leh-email-template.ejs'),
    subject: 'Important Notice from LEH - SendScript'
  }
};

module.exports = {
  createTransporter,
  emailTemplates,
  mailtrapConfig
}; 