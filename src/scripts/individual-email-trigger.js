#!/usr/bin/env node

const readline = require('readline');
const EmailService = require('../services/email-service');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const emailService = new EmailService();

// Helper function to prompt user input
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Template configurations with required fields
const templateConfigs = {
  // Account Management Templates
  1: {
    name: 'Account Blocked by Super Admin',
    method: 'sendAccountBlockedBySuperAdminEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'reason', prompt: 'Enter reason for blocking (default: Policy violations): ', required: false, default: 'Policy violations' }
    ]
  },
  2: {
    name: 'Account Rejected by Super Admin',
    method: 'sendAccountRejectedBySuperAdminEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'reason', prompt: 'Enter rejection reason: ', required: true }
    ]
  },
  3: {
    name: 'Doctor Account Created',
    method: 'sendDoctorAccountCreatedEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'loginUrl', prompt: 'Enter login URL: ', required: true }
    ]
  },
  4: {
    name: 'Doctor Account Creation',
    method: 'sendDoctorAccountCreationEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'verificationCode', prompt: 'Enter verification code: ', required: true }
    ]
  },
  5: {
    name: 'Doctor Super Admin Approval',
    method: 'sendDoctorSuperAdminApprovalEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'loginUrl', prompt: 'Enter login URL: ', required: true }
    ]
  },
  6: {
    name: 'Signup',
    method: 'sendSignupEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'otp', prompt: 'Enter OTP: ', required: true }
    ]
  },

  // Clinic Management Templates
  7: {
    name: 'Clinic Join Request',
    method: 'sendClinicJoinRequestEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'clinicName', prompt: 'Enter clinic name: ', required: true }
    ]
  },
  8: {
    name: 'Clinic Registration',
    method: 'sendClinicRegistrationEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'clinicName', prompt: 'Enter clinic name: ', required: true }
    ]
  },
  9: {
    name: 'Clinic Registration Approved',
    method: 'sendClinicRegistrationApprovedEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true }
    ]
  },
  10: {
    name: 'Clinic Registration Unsuccessful',
    method: 'sendClinicRegistrationUnsuccessfulEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'reason', prompt: 'Enter reason: ', required: true }
    ]
  },
  11: {
    name: 'Invite Doctor',
    method: 'sendInviteDoctorEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'inviteeName', prompt: 'Enter invitee name: ', required: true },
      { name: 'invitingDoctorName', prompt: 'Enter inviting doctor name: ', required: true },
      { name: 'acceptInvitationLink', prompt: 'Enter accept invitation link: ', required: true }
    ]
  },

  // Email Verification Templates
  12: {
    name: 'Email Verification Account Creation',
    method: 'sendEmailVerificationAccountCreationEmail',
    fields: [
      { name: 'email', prompt: 'Enter user email: ', required: true },
      { name: 'userName', prompt: 'Enter user name: ', required: true },
      { name: 'verificationCode', prompt: 'Enter verification code: ', required: true }
    ]
  },
  13: {
    name: 'Email Verification Onboarding',
    method: 'sendEmailVerificationOnboardingEmail',
    fields: [
      { name: 'email', prompt: 'Enter user email: ', required: true },
      { name: 'otp', prompt: 'Enter OTP: ', required: true }
    ]
  },
  14: {
    name: 'Update Email Address',
    method: 'sendUpdateEmailAddressEmail',
    fields: [
      { name: 'email', prompt: 'Enter user email: ', required: true },
      { name: 'userName', prompt: 'Enter user name: ', required: true },
      { name: 'verificationCode', prompt: 'Enter verification code: ', required: true }
    ]
  },
  15: {
    name: 'Forgot Password',
    method: 'sendForgotPasswordEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'otp', prompt: 'Enter reset OTP: ', required: true }
    ]
  },
  16: {
    name: 'Reinitiate Onfido Verification',
    method: 'sendReinitiateOnfidoVerificationEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true }
    ]
  },

  // Pharmacy Templates
  17: {
    name: 'Pharmacy Verification',
    method: 'sendPharmacyVerificationEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'otp', prompt: 'Enter OTP (6 digits): ', required: true },
      { name: 'purpose', prompt: 'Enter purpose (default: verification): ', required: false, default: 'verification' },
      { name: 'validity', prompt: 'Enter validity in minutes (default: 10): ', required: false, default: 10 }
    ]
  },
  18: {
    name: 'Pharmacy Owner Blocked',
    method: 'sendPharmacyOwnerBlockedEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'pharmacyOwnerName', prompt: 'Enter pharmacy owner name: ', required: true },
      { name: 'reason', prompt: 'Enter blocking reason: ', required: true }
    ]
  },
  19: {
    name: 'Pharmacy Owner Registration Approved',
    method: 'sendPharmacyOwnerRegistrationApprovedEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'pharmacyOwnerName', prompt: 'Enter pharmacy owner name: ', required: true }
    ]
  },
  20: {
    name: 'Pharmacy Owner Registration Unsuccessful',
    method: 'sendPharmacyOwnerRegistrationUnsuccessfulEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'pharmacyOwnerName', prompt: 'Enter pharmacy owner name: ', required: true },
      { name: 'reason', prompt: 'Enter reason: ', required: true }
    ]
  },

  // Payment Templates
  21: {
    name: 'Payment Link',
    method: 'sendPaymentLinkEmail',
    fields: [
      { name: 'email', prompt: 'Enter recipient email: ', required: true },
      { name: 'link', prompt: 'Enter payment link: ', required: true }
    ]
  },
  22: {
    name: 'Payment For Prescription',
    method: 'sendPaymentForPrescriptionEmail',
    fields: [
      { name: 'email', prompt: 'Enter patient email: ', required: true },
      { name: 'patientName', prompt: 'Enter patient name: ', required: true },
      { name: 'pharmacyName', prompt: 'Enter pharmacy name: ', required: true },
      { name: 'prescriptionId', prompt: 'Enter prescription ID: ', required: true },
      { name: 'amount', prompt: 'Enter amount: ', required: true },
      { name: 'securePaymentLink', prompt: 'Enter secure payment link: ', required: true }
    ]
  },
  35: {
    name: 'Payment Request From Pharmacy',
    method: 'sendPaymentRequestFromPharmacyEmail',
    fields: [
      { name: 'email', prompt: 'Enter patient email: ', required: true },
      { name: 'prescription_url', prompt: 'Enter prescription URL: ', required: true },
      { name: 'pharmacy_name', prompt: 'Enter pharmacy name: ', required: true },
      { name: 'patient_name', prompt: 'Enter patient name: ', required: true },
      { name: 'pharmacy_contact_number', prompt: 'Enter pharmacy contact number: ', required: true },
      { name: 'pharmacy_address_1', prompt: 'Enter pharmacy address line 1: ', required: true },
      { name: 'pharmacy_address_2', prompt: 'Enter pharmacy address line 2: ', required: false },
      { name: 'city', prompt: 'Enter city: ', required: true },
      { name: 'postal_code', prompt: 'Enter postal code: ', required: true },
      { name: 'country', prompt: 'Enter country: ', required: true },
      { name: 'pharmacy_email', prompt: 'Enter pharmacy email: ', required: true }
    ]
  },

  // Patient Data Template
  23: {
    name: 'Patient Data Access',
    method: 'sendPatientDataAccessEmail',
    fields: [
      { name: 'email', prompt: 'Enter patient email: ', required: true },
      { name: 'patientName', prompt: 'Enter patient name: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'clinicName', prompt: 'Enter clinic name: ', required: true }
    ]
  },

  // Send Token Template
  24: {
    name: 'Send Token',
    method: 'sendTokenEmail',
    fields: [
      { name: 'email', prompt: 'Enter patient email: ', required: true },
      { name: 'patientName', prompt: 'Enter patient name: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'clinicName', prompt: 'Enter clinic name: ', required: true },
      { name: 'prescriptionId', prompt: 'Enter prescription ID: ', required: true },
      { name: 'clinicAddress', prompt: 'Enter clinic address: ', required: true },
      { name: 'clinicCity', prompt: 'Enter clinic city: ', required: true },
      { name: 'clinicPostalCode', prompt: 'Enter clinic postal code: ', required: true },
      { name: 'clinicCountry', prompt: 'Enter clinic country: ', required: true },
      { name: 'clinicMobile', prompt: 'Enter clinic mobile: ', required: true },
      { name: 'clinicEmail', prompt: 'Enter clinic email: ', required: true }
    ]
  },

  // Send to Unregister Pharmacy Template
  25: {
    name: 'Send to Unregister Pharmacy',
    method: 'sendToUnregisterPharmacyEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'pharmacyName', prompt: 'Enter pharmacy name: ', required: true },
      { name: 'prescriptionCode', prompt: 'Enter prescription code: ', required: true },
      { name: 'patientName', prompt: 'Enter patient name: ', required: true },
      { name: 'patientDob', prompt: 'Enter patient DOB (YYYY-MM-DD): ', required: true },
      { name: 'patientMobile', prompt: 'Enter patient mobile: ', required: true },
      { name: 'clinicName', prompt: 'Enter clinic name: ', required: true },
      { name: 'clinicAddress1', prompt: 'Enter clinic address line 1: ', required: true },
      { name: 'clinicAddress2', prompt: 'Enter clinic address line 2: ', required: false },
      { name: 'clinicCity', prompt: 'Enter clinic city: ', required: true },
      { name: 'clinicPostalCode', prompt: 'Enter clinic postal code: ', required: true },
      { name: 'clinicCountry', prompt: 'Enter clinic country: ', required: false, default: 'United Kingdom' },
      { name: 'clinicContactNumber', prompt: 'Enter clinic contact number: ', required: true },
      { name: 'clinicEmail', prompt: 'Enter clinic email: ', required: true }
    ]
  },
  32: {
    name: 'Invoice From Pharmacy',
    method: 'sendInvoiceFromPharmacyEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'pharmacyName', prompt: 'Enter pharmacy name: ', required: true },
      { name: 'patientName', prompt: 'Enter patient name: ', required: true },
      { name: 'invoiceUrl', prompt: 'Enter invoice URL: ', required: true },
      { name: 'pharmacyPhoneNumber', prompt: 'Enter pharmacy phone number: ', required: true }
    ]
  }
};

async function showMenu() {
  console.log('\n📧 Individual Email Template Trigger\n');
  console.log('Available Templates:');
  
  // Account Management
  console.log('\n🔐 Account Management:');
  console.log('1.  Account Blocked by Super Admin');
  console.log('2.  Account Rejected by Super Admin');
  console.log('3.  Doctor Account Created');
  console.log('4.  Doctor Account Creation');
  console.log('5.  Doctor Super Admin Approval');
  console.log('6.  Signup');
  
  // Clinic Management
  console.log('\n🏥 Clinic Management:');
  console.log('7.  Clinic Join Request');
  console.log('8.  Clinic Registration');
  console.log('9.  Clinic Registration Approved');
  console.log('10. Clinic Registration Unsuccessful');
  console.log('11. Invite Doctor');
  
  // Email Verification
  console.log('\n📧 Email Verification:');
  console.log('12. Email Verification Account Creation');
  console.log('13. Email Verification Onboarding');
  console.log('14. Update Email Address');
  console.log('15. Forgot Password');
  console.log('16. Reinitiate Onfido Verification');
  
  // Pharmacy
  console.log('\n💊 Pharmacy:');
  console.log('17. Pharmacy Verification');
  console.log('18. Pharmacy Owner Blocked');
  console.log('19. Pharmacy Owner Registration Approved');
  console.log('20. Pharmacy Owner Registration Unsuccessful');
  
  // Payment
  console.log('\n💳 Payment:');
  console.log('21. Payment Link');
  console.log('22. Payment For Prescription');
  console.log('35. Payment Request From Pharmacy');
  
  // Other
  console.log('\n📋 Other:');
  console.log('23. Patient Data Access');
  console.log('24. Send Token');
  console.log('25. Send to Unregister Pharmacy');
  
  // Complex Templates (with sample data)
  console.log('\n🔬 Complex Templates (uses sample data):');
  console.log('26. Prescription With Sign');
  console.log('27. Prescription Without Sign');
  console.log('28. Pharmacist With Sign');
  console.log('29. Invoice Generate');
  console.log('30. Prescription From Pharmacy');
  console.log('31. Pharmacy Via Prescription');
  console.log('32. Invoice From Pharmacy');
  console.log('33. Payment Confirmed');
  console.log('34. LEH Email Template');
  
  console.log('\n0.  Exit');
  console.log('\nNote: Templates 26-34 use predefined sample data for complex structures');
}

async function collectUserInput(template) {
  const data = {};
  
  console.log(`\n📝 Collecting data for: ${template.name}\n`);
  
  for (const field of template.fields) {
    let value = await question(field.prompt);
    
    if (!value && field.required) {
      console.log('❌ This field is required!');
      value = await question(field.prompt);
    }
    
    if (!value && field.default) {
      value = field.default;
    }
    
    data[field.name] = value;
  }
  
  return data;
}

async function sendEmail(templateChoice, userData) {
  try {
    await emailService.testConnection();
    
    let result;
    
    if (templateChoice >= 1 && templateChoice <= 25) {
      const template = templateConfigs[templateChoice];
      
      // Handle different template parameter structures
      switch (templateChoice) {
        case 17: // Pharmacy Verification
          result = await emailService.sendPharmacyVerificationEmail(
            userData.email,
            userData.otp,
            userData.purpose,
            parseInt(userData.validity)
          );
          break;
          
        case 22: // Payment For Prescription
          result = await emailService.sendPaymentForPrescriptionEmail(
            userData.email,
            {
              patient_name: userData.patientName,
              pharmacy_name: userData.pharmacyName,
              prescription_id: userData.prescriptionId,
              amount: userData.amount,
              secure_payment_link: userData.securePaymentLink
            }
          );
          break;
          
        case 23: // Patient Data Access
          result = await emailService.sendPatientDataAccessEmail(
            userData.email,
            {
              patient_name: userData.patientName,
              doctor_name: userData.doctorName,
              clinic_name: userData.clinicName
            }
          );
          break;
          
        case 24: // Send Token
          result = await emailService.sendTokenEmail(
            userData.email,
            userData.patientName,
            userData.doctorName,
            userData.clinicName,
            userData.prescriptionId,
            {
              address: userData.clinicAddress,
              city: userData.clinicCity,
              postal_code: userData.clinicPostalCode,
              country: userData.clinicCountry,
              mobile: userData.clinicMobile,
              email: userData.clinicEmail
            }
          );
          break;
          
        case 25: // Send to Unregister Pharmacy
          result = await emailService.sendToUnregisterPharmacyEmail(
            userData.email,
            userData.pharmacyName,
            userData.prescriptionCode,
            {
              dob: userData.patientDob,
              name: userData.patientName,
              mobile: userData.patientMobile
            },
            {
              name: userData.clinicName,
              address_line_1: userData.clinicAddress1,
              address_line_2: userData.clinicAddress2,
              city: userData.clinicCity,
              postal_code: userData.clinicPostalCode,
              country: userData.clinicCountry,
              contact_number: userData.clinicContactNumber,
              email: userData.clinicEmail
            }
          );
          break;
          
        case 11: // Invite Doctor
          result = await emailService.sendInviteDoctorEmail(
            userData.email,
            userData.inviteeName,
            {
              invitee_name: userData.inviteeName,
              inviting_doctor_name: userData.invitingDoctorName,
              accept_invitation_link: userData.acceptInvitationLink,
              accept_invitation_button_link: userData.acceptInvitationLink,
              button_text: 'Accept Invitation'
            }
          );
          break;
          
        case 4: // Doctor Account Creation
          result = await emailService.sendDoctorAccountCreationEmail(
            userData.email,
            userData.doctorName,
            userData.verificationCode
          );
          break;
          
        default:
          // For simpler templates, call the method with the userData object spread
          const method = emailService[template.method];
          if (method) {
            result = await method.call(emailService, userData.email, ...Object.values(userData).slice(1));
          }
          break;
      }
    } else if (templateChoice === 35) {
      // Payment Request From Pharmacy
      result = await emailService.sendPaymentRequestFromPharmacyEmail(
        userData.email,
        {
          prescription_url: userData.prescription_url,
          pharmacy_name: userData.pharmacy_name,
          patient_name: userData.patient_name,
          pharmacy_contact_number: userData.pharmacy_contact_number,
          pharmacy_address_1: userData.pharmacy_address_1,
          pharmacy_address_2: userData.pharmacy_address_2,
          city: userData.city,
          postal_code: userData.postal_code,
          country: userData.country,
          pharmacy_email: userData.pharmacy_email
        }
      );
    } else {
      // Handle complex templates with sample data
      const email = await question('Enter recipient email: ');
      
      switch (templateChoice) {
        case 26: // Prescription with sign
          result = await emailService.sendPrescriptionWithSignEmail(email, getSamplePrescriptionData());
          break;
        case 27: // Prescription without sign
          result = await emailService.sendPrescriptionWithoutSignEmail(email, getSamplePrescriptionData());
          break;
        case 28: // Pharmacist with sign
          result = await emailService.sendPharmacistWithSignEmail(email, getSamplePrescriptionData());
          break;
        case 29: // Invoice generate
          result = await emailService.sendInvoiceEmail(email, getSampleInvoiceData());
          break;
        case 30: // Prescription from pharmacy
          result = await emailService.sendPrescriptionFromPharmacyEmail(email, getSamplePharmacyData());
          break;
        case 31: // Pharmacy via prescription
          result = await emailService.sendPharmacyViaPrescriptionEmail(email, getSamplePrescriptionData());
          break;
        case 32: // Invoice from pharmacy
          result = await emailService.sendInvoiceFromPharmacyEmail(email, getSampleInvoiceFromPharmacyData());
          break;
        case 33: // Payment confirmed
          result = await emailService.sendPaymentConfirmedEmail(email, getSamplePaymentData());
          break;
        case 34: // LEH Email Template
          result = await emailService.sendLehEmailTemplateEmail(email, getSampleLehData());
          break;
        default:
          console.log('❌ Invalid template choice');
          return;
      }
    }
    
    console.log(`\n✅ Email sent successfully!`);
    console.log(`📧 Message ID: ${result.messageId}`);
    console.log(`🌐 Check your Mailtrap inbox: https://mailtrap.io/inboxes`);
    
  } catch (error) {
    console.error(`\n❌ Error sending email: ${error.message}`);
  }
}
function getSampleInvoiceFromPharmacyData() {
  return {
    pharmacy_name: 'SendScript Pharmacy',
    patient_name: 'John Doe',
    invoice_url: 'https://sendscript.com/invoice/12345',
    pharmacy_phone_number: '+44 20 9876 5432',
  };
}
function getSamplePrescriptionData() {
  return {
    prescription: {
      clinic_name: 'SendScript Medical Centre',
      clinic_address_line_1: '123 Medical Street',
      clinic_address_line_2: 'Suite 100',
      clinic_city: 'London',
      clinic_postal_code: 'SW1A 1AA',
      clinic_contact_number: '+44 20 1234 5678',
      clinic_email: 'clinic@sendscript.com',
      doctor_title: 'Dr.',
      doctor_first_name: 'Jane',
      doctor_sur_name: 'Smith',
      doctor_gmc_number: '1234567',
      doctor_qualification: 'MBBS, MD',
      doctor_signature: 'Dr. Jane Smith',
      pharmacy_name: 'Local Pharmacy',
      pharmacy_address_line_1: '456 Pharmacy Road',
      pharmacy_address_line_2: 'Ground Floor',
      pharmacy_city: 'London',
      pharmacy_postal_code: 'SW2B 2BB',
      pharmacy_contact_number: '+44 20 9876 5432',
      pharmacy_email: 'pharmacy@local.com',
      pharmacist_first_name: 'John',
      pharmacist_sur_name: 'Pharmacist',
      pharmacist_gphc: 'GP123456',
      pharmacist_signature: 'John Pharmacist'
    },
    patient_details: {
      patient_first_name: 'John',
      patient_sur_name: 'Doe',
      patient_dob: '1990-01-15',
      patient_mobile: '+44 7123 456789',
      patient_address_line_1: '789 Patient Avenue',
      patient_address_line_2: 'Apt 10',
      patient_city: 'London',
      patient_postal_code: 'SW3C 3CC',
      patient_country: 'United Kingdom'
    },
    prescription_id: 'RX' + Date.now(),
    prescription_date: new Date().toISOString().split('T')[0],
    prescription_type: 'Private',
    prescription_created_at: new Date().toISOString(),
    prescription_items: [
      {
        name: 'Paracetamol 500mg Tablets',
        dosage_note: 'Take 1-2 tablets every 4-6 hours as needed',
        duration: '7',
        duration_type: 'days',
        method: 'Oral',
        quantity: '16',
        unit: 'tablets',
        price: '3.50'
      },
      {
        name: 'Ibuprofen 400mg Tablets',
        dosage_note: 'Take 1 tablet every 6-8 hours with food',
        duration: '5',
        duration_type: 'days',
        method: 'Oral',
        quantity: '10',
        unit: 'tablets',
        price: '5.20'
      }
    ]
  };
}

function getSampleInvoiceData() {
  return {
    pharmacy: {
      name: 'SendScript Pharmacy',
      address_line_1: '456 Pharmacy Road',
      address_line_2: 'Ground Floor',
      address_line_3: '',
      city: 'London',
      county: 'Greater London',
      country: 'United Kingdom',
      postal_code: 'SW2B 2BB',
      contact_number: '+44 20 9876 5432',
      email: 'pharmacy@sendscript.com'
    },
    patient_details: {
      patient_title: 'Mr.',
      patient_first_name: 'John',
      patient_sur_name: 'Doe',
      patient_dob: '1990-01-15',
      patient_address_line_1: '789 Patient Avenue',
      patient_address_line_2: 'Apt 10',
      patient_city: 'London',
      patient_country: 'United Kingdom',
      patient_postal_code: 'SW3C 3CC',
      patient_mobile: '+44 7123 456789'
    },
    invoice_id: 'INV-' + Date.now(),
    invoice_date: new Date().toISOString().split('T')[0],
    prescription_items: [
      {
        name: 'Paracetamol 500mg Tablets',
        quantity: '16',
        unit: 'tablets',
        price: '3.50'
      },
      {
        name: 'Ibuprofen 400mg Tablets',
        quantity: '10',
        unit: 'tablets',
        price: '5.20'
      }
    ],
    total_price: 10.70,
    delivery_charge: 2.00,
  };
}

function getSamplePharmacyData() {
  return {
    patient_name: 'John Doe',
    pharmacy_name: 'SendScript Pharmacy',
    pharmacy_email: 'pharmacy@sendscript.com',
    pharmacy_address_1: '456 Pharmacy Road',
    pharmacy_address_2: 'Ground Floor',
    city: 'London',
    postal_code: 'SW2B 2BB',
    country: 'United Kingdom',
    pharmacy_contact_number: '+44 20 9876 5432',
    prescription_url: 'https://sendscript.com/prescription/12345'
  };
}

function getSamplePaymentData() {
  return {
    patient_name: 'John Doe',
    pharmacy_name: 'SendScript Pharmacy',
    amount: '25.50',
    transaction_id: 'TXN' + Date.now(),
    payment_date: new Date().toISOString().split('T')[0]
  };
}

function getSampleLehData() {
  return {
    recipient_name: 'John Doe',
    notice_title: 'Important Health Notice',
    notice_content: 'This is a sample health notice from LEH.',
    reference_number: 'LEH' + Date.now()
  };
}

async function main() {
  console.log('🚀 Welcome to Individual Email Template Trigger!\n');
  
  // Test connection first
  console.log('📡 Testing SMTP connection...');
  const connectionTest = await emailService.testConnection();
  
  if (!connectionTest) {
    console.log('❌ SMTP connection failed. Please check your credentials.');
    rl.close();
    return;
  }
  
  while (true) {
    await showMenu();
    const choice = await question('\nSelect a template (0 to exit): ');
    
    if (choice === '0') {
      console.log('\n👋 Goodbye!');
      break;
    }
    
    const choiceNum = parseInt(choice);
    if (choiceNum >= 1 && choiceNum <= 34) {
      if (choiceNum >= 1 && choiceNum <= 25) {
        const template = templateConfigs[choiceNum];
        const userData = await collectUserInput(template);
        await sendEmail(choiceNum, userData);
      } else {
        await sendEmail(choiceNum, {});
      }
    } else if (choiceNum === 35) {
      const template = templateConfigs[35];
      const userData = await collectUserInput(template);
      await sendEmail(35, userData);
    } else {
      console.log('\n❌ Invalid choice. Please select 0-34.');
    }
    
    const continueChoice = await question('\nWould you like to send another email? (y/n): ');
    if (continueChoice.toLowerCase() !== 'y') {
      console.log('\n👋 Goodbye!');
      break;
    }
  }
  
  rl.close();
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye!');
  rl.close();
  process.exit(0);
});

main().catch(console.error); 