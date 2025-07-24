#!/usr/bin/env node

const EmailService = require('../services/email-service');

// Sample data for different templates
const sampleData = {
  // Account Management
  accountBlocked: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    reason: 'Repeated policy violations'
  },

  accountRejected: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    reason: 'Incomplete documentation'
  },

  doctorAccountCreated: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    loginUrl: 'https://app.sendscript.com/login'
  },

  doctorAccountCreation: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    verificationCode: 'ABC123456'
  },

  doctorSuperAdminApproval: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    loginUrl: 'https://app.sendscript.com/login'
  },

  signup: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    otp: '123456'
  },

  // Clinic Management
  clinicJoinRequest: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    clinicName: 'SendScript Clinic'
  },

  clinicRegistration: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    clinicName: 'SendScript Clinic'
  },

  clinicRegistrationApproved: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith'
  },

  clinicRegistrationUnsuccessful: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    reason: 'Missing required documentation'
  },

  inviteDoctor: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    invitationCode: 'INV123456'
  },

  // Email Verification
  emailVerificationAccountCreation: {
    email: 'user@example.com',
    userName: 'John Doe',
    verificationCode: 'VER123456'
  },

  emailVerificationOnboarding: {
    email: 'user@example.com',
    otp: '123456'
  },

  updateEmailAddress: {
    email: 'user@example.com',
    userName: 'John Doe',
    verificationCode: 'UPD123456'
  },

  forgotPassword: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    otp: '789012'
  },

  reinitiateOnfidoVerification: {
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith'
  },

  // Pharmacy
  pharmacyVerification: {
    email: 'pharmacy@example.com',
    otp: '123456',
    purpose: 'account verification',
    validity: 10
  },

  pharmacyOwnerBlocked: {
    email: 'pharmacy@example.com',
    pharmacyOwnerName: 'John Pharmacy',
    reason: 'License expired'
  },

  pharmacyOwnerRegistrationApproved: {
    email: 'pharmacy@example.com',
    pharmacyOwnerName: 'John Pharmacy'
  },

  pharmacyOwnerRegistrationUnsuccessful: {
    email: 'pharmacy@example.com',
    pharmacyOwnerName: 'John Pharmacy',
    reason: 'Invalid license number'
  },

  // Payment
  paymentLink: {
    email: 'patient@example.com',
    link: 'https://payments.sendscript.com/pay/12345'
  },

  paymentForPrescription: {
    email: 'patient@example.com',
    paymentData: {
      patient_name: 'John Doe',
      pharmacy_name: 'SendScript Pharmacy',
      prescription_id: 'RX123456',
      amount: '25.50',
      secure_payment_link: 'https://payments.sendscript.com/secure/12345'
    }
  },

  // Patient Data
  patientDataAccess: {
    email: 'patient@example.com',
    accessData: {
      patient_name: 'John Doe',
      doctor_name: 'Dr. Jane Smith',
      clinic_name: 'SendScript Clinic'
    }
  },

  sendToken: {
    email: 'patient@example.com',
    patientName: 'John Doe',
    doctorName: 'Dr. Jane Smith',
    clinicName: 'SendScript Clinic',
    prescriptionId: 'RX123456789',
    clinicData: {
      address: '123 Medical Street',
      city: 'London',
      postal_code: 'SW1A 1AA',
      country: 'United Kingdom',
      mobile: '+44 20 1234 5678',
      email: 'clinic@sendscript.com'
    }
  },

  sendToUnregisterPharmacy: {
    email: 'pharmacy@example.com',
    pharmacyName: 'Local Pharmacy',
    prescriptionCode: 'RX123456789',
    patientData: {
      dob: '1990-01-15',
      name: 'John Doe',
      mobile: '+44 7123 456789'
    },
    clinicData: {
      name: 'SendScript Clinic',
      address_line_1: '123 Medical Street',
      address_line_2: 'Suite 100',
      city: 'London',
      postal_code: 'SW1A 1AA',
      country: 'United Kingdom',
      contact_number: '+44 20 1234 5678',
      email: 'clinic@sendscript.com'
    }
  },

  // Complex prescription data for prescription templates
  prescriptionData: {
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
    prescription_id: 'RX123456789',
    prescription_date: '2024-01-15',
    prescription_type: 'Private',
    prescription_created_at: '2024-01-15T10:30:00Z',
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
  },

  // Pharmacy data for prescription from pharmacy
  pharmacyData: {
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
  },

  // Invoice data
  invoiceData: {
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
    invoice_id: 'INV-2024-001',
    invoice_date: '2024-01-15',
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
    delivery_charge: 2.00
  },

  // Payment data
  paymentData: {
    patient_name: 'John Doe',
    pharmacy_name: 'SendScript Pharmacy',
    amount: '25.50',
    transaction_id: 'TXN123456',
    payment_date: '2024-01-15'
  },

  // LEH data
  lehData: {
    recipient_name: 'Ms. Amelia Johnson',
    consent_form_url: 'https://forms.londonelitehealth.com/patient-registration/12345',
    notice_title: 'Patient Registration Form',
    notice_content: 'Please complete your patient registration form.',
    reference_number: 'PNT456738'
  }
};

async function testAllTemplates() {
  console.log('🚀 Starting All Email Templates Test...\n');

  const emailService = new EmailService();

  // Test SMTP connection first
  console.log('📡 Testing SMTP connection...');
  const connectionTest = await emailService.testConnection();
  
  if (!connectionTest) {
    console.log('❌ SMTP connection failed. Please check your credentials.');
    process.exit(1);
  }

  console.log('\n📨 Testing all email templates...\n');

  try {
    // Test each template
    const templates = [
      // Account Management Templates
      {
        name: 'Account Blocked by Super Admin',
        method: 'sendAccountBlockedBySuperAdminEmail',
        args: [sampleData.accountBlocked.email, sampleData.accountBlocked.doctorName, sampleData.accountBlocked.reason]
      },
      {
        name: 'Account Rejected by Super Admin',
        method: 'sendAccountRejectedBySuperAdminEmail',
        args: [sampleData.accountRejected.email, sampleData.accountRejected.doctorName, sampleData.accountRejected.reason]
      },
      {
        name: 'Doctor Account Created',
        method: 'sendDoctorAccountCreatedEmail',
        args: [sampleData.doctorAccountCreated.email, sampleData.doctorAccountCreated.doctorName, sampleData.doctorAccountCreated.loginUrl]
      },
      {
        name: 'Doctor Account Creation',
        method: 'sendDoctorAccountCreationEmail',
        args: [sampleData.doctorAccountCreation.email, sampleData.doctorAccountCreation.doctorName, sampleData.doctorAccountCreation.verificationCode]
      },
      {
        name: 'Doctor Super Admin Approval',
        method: 'sendDoctorSuperAdminApprovalEmail',
        args: [sampleData.doctorSuperAdminApproval.email, sampleData.doctorSuperAdminApproval.doctorName, sampleData.doctorSuperAdminApproval.loginUrl]
      },
      {
        name: 'Signup',
        method: 'sendSignupEmail',
        args: [sampleData.signup.email, sampleData.signup.doctorName, sampleData.signup.otp]
      },

      // Clinic Management Templates
      {
        name: 'Clinic Join Request',
        method: 'sendClinicJoinRequestEmail',
        args: [sampleData.clinicJoinRequest.email, sampleData.clinicJoinRequest.doctorName, sampleData.clinicJoinRequest.clinicName]
      },
      {
        name: 'Clinic Registration',
        method: 'sendClinicRegistrationEmail',
        args: [sampleData.clinicRegistration.email, sampleData.clinicRegistration.doctorName, { clinic_name: sampleData.clinicRegistration.clinicName }]
      },
      {
        name: 'Clinic Registration Approved',
        method: 'sendClinicRegistrationApprovedEmail',
        args: [sampleData.clinicRegistrationApproved.email, sampleData.clinicRegistrationApproved.doctorName]
      },
      {
        name: 'Clinic Registration Unsuccessful',
        method: 'sendClinicRegistrationUnsuccessfulEmail',
        args: [sampleData.clinicRegistrationUnsuccessful.email, sampleData.clinicRegistrationUnsuccessful.doctorName, sampleData.clinicRegistrationUnsuccessful.reason]
      },
      {
        name: 'Invite Doctor',
        method: 'sendInviteDoctorEmail',
        args: [sampleData.inviteDoctor.email, sampleData.inviteDoctor.doctorName, {invitee_name: sampleData.inviteDoctor.inviteeName, inviting_doctor_name: sampleData.inviteDoctor.invitingDoctorName, accept_invitation_button_link: sampleData.inviteDoctor.acceptInvitationLink}]
      },

      // Email Verification Templates
      {
        name: 'Email Verification Account Creation',
        method: 'sendEmailVerificationAccountCreationEmail',
        args: [sampleData.emailVerificationAccountCreation.email, sampleData.emailVerificationAccountCreation.userName, sampleData.emailVerificationAccountCreation.verificationCode]
      },
      {
        name: 'Email Verification Onboarding',
        method: 'sendEmailVerificationOnboardingEmail',
        args: [sampleData.emailVerificationOnboarding.email, sampleData.emailVerificationOnboarding.otp]
      },
      {
        name: 'Update Email Address',
        method: 'sendUpdateEmailAddressEmail',
        args: [sampleData.updateEmailAddress.email, sampleData.updateEmailAddress.userName, sampleData.updateEmailAddress.verificationCode]
      },
      {
        name: 'Forgot Password',
        method: 'sendForgotPasswordEmail',
        args: [sampleData.forgotPassword.email, sampleData.forgotPassword.doctorName, sampleData.forgotPassword.otp]
      },
      {
        name: 'Reinitiate Onfido Verification',
        method: 'sendReinitiateOnfidoVerificationEmail',
        args: [sampleData.reinitiateOnfidoVerification.email, sampleData.reinitiateOnfidoVerification.doctorName]
      },

      // Pharmacy Templates
      {
        name: 'Pharmacy Verification',
        method: 'sendPharmacyVerificationEmail',
        args: [sampleData.pharmacyVerification.email, sampleData.pharmacyVerification.otp, sampleData.pharmacyVerification.purpose, sampleData.pharmacyVerification.validity]
      },
      {
        name: 'Pharmacy Owner Blocked',
        method: 'sendPharmacyOwnerBlockedEmail',
        args: [sampleData.pharmacyOwnerBlocked.email, sampleData.pharmacyOwnerBlocked.pharmacyOwnerName, sampleData.pharmacyOwnerBlocked.reason]
      },
      {
        name: 'Pharmacy Owner Registration Approved',
        method: 'sendPharmacyOwnerRegistrationApprovedEmail',
        args: [sampleData.pharmacyOwnerRegistrationApproved.email, sampleData.pharmacyOwnerRegistrationApproved.pharmacyOwnerName]
      },
      {
        name: 'Pharmacy Owner Registration Unsuccessful',
        method: 'sendPharmacyOwnerRegistrationUnsuccessfulEmail',
        args: [sampleData.pharmacyOwnerRegistrationUnsuccessful.email, sampleData.pharmacyOwnerRegistrationUnsuccessful.pharmacyOwnerName, sampleData.pharmacyOwnerRegistrationUnsuccessful.reason]
      },

      // Payment Templates
      {
        name: 'Payment Link',
        method: 'sendPaymentLinkEmail',
        args: [sampleData.paymentLink.email, sampleData.paymentLink.link]
      },
      {
        name: 'Payment For Prescription',
        method: 'sendPaymentForPrescriptionEmail',
        args: [sampleData.paymentForPrescription.email, sampleData.paymentForPrescription.paymentData]
      },

      // Patient Data Templates
      {
        name: 'Patient Data Access',
        method: 'sendPatientDataAccessEmail',
        args: [sampleData.patientDataAccess.email, sampleData.patientDataAccess.accessData]
      },

      // Token Templates
      {
        name: 'Send Token',
        method: 'sendTokenEmail',
        args: [sampleData.sendToken.email, sampleData.sendToken.patientName, sampleData.sendToken.doctorName, sampleData.sendToken.clinicName, sampleData.sendToken.prescriptionId, sampleData.sendToken.clinicData]
      },
      {
        name: 'Send to Unregister Pharmacy',
        method: 'sendToUnregisterPharmacyEmail',
        args: [sampleData.sendToUnregisterPharmacy.email, sampleData.sendToUnregisterPharmacy.pharmacyName, sampleData.sendToUnregisterPharmacy.prescriptionCode, sampleData.sendToUnregisterPharmacy.patientData, sampleData.sendToUnregisterPharmacy.clinicData]
      },

      // Prescription Templates
      {
        name: 'Prescription With Sign',
        method: 'sendPrescriptionWithSignEmail',
        args: ['patient@example.com', sampleData.prescriptionData]
      },
      {
        name: 'Prescription Without Sign',
        method: 'sendPrescriptionWithoutSignEmail',
        args: ['patient@example.com', sampleData.prescriptionData]
      },
      {
        name: 'Prescription From Pharmacy',
        method: 'sendPrescriptionFromPharmacyEmail',
        args: ['patient@example.com', sampleData.pharmacyData]
      },
      {
        name: 'Pharmacist With Sign',
        method: 'sendPharmacistWithSignEmail',
        args: ['pharmacist@example.com', sampleData.prescriptionData]
      },
      {
        name: 'Pharmacy Via Prescription',
        method: 'sendPharmacyViaPrescriptionEmail',
        args: ['pharmacy@example.com', sampleData.prescriptionData]
      },

      // Invoice Templates
      {
        name: 'Invoice Generate',
        method: 'sendInvoiceEmail',
        args: ['patient@example.com', sampleData.invoiceData]
      },
      {
        name: 'Invoice From Pharmacy',
        method: 'sendInvoiceFromPharmacyEmail',
        args: ['patient@example.com', sampleData.invoiceData]
      },

      // Payment Confirmation Template
      {
        name: 'Payment Confirmed',
        method: 'sendPaymentConfirmedEmail',
        args: ['patient@example.com', sampleData.paymentData]
      },

      // Special Templates
      {
        name: 'LEH Email Template',
        method: 'sendLehEmailTemplateEmail',
        args: ['patient@example.com', sampleData.lehData]
      }
    ];

    for (const template of templates) {
      console.log(`\n📧 Testing: ${template.name}...`);
      try {
        const result = await emailService[template.method](...template.args);
        console.log(`✅ ${template.name} sent successfully! Message ID: ${result.messageId}`);
      } catch (error) {
        console.error(`❌ ${template.name} failed:`, error.message);
      }
    }

    console.log('\n🎉 All template tests completed!');
    console.log(`\n💡 Tested ${templates.length} email templates!`);
    console.log('🌐 Visit: https://mailtrap.io/inboxes');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Function to test specific template category
async function testSpecificCategory(categoryName) {
  console.log(`🚀 Testing category: ${categoryName}...\n`);

  const emailService = new EmailService();

  try {
    await emailService.testConnection();

    switch (categoryName.toLowerCase()) {
      case 'account':
        await testAccountTemplates(emailService);
        break;
      case 'clinic':
        await testClinicTemplates(emailService);
        break;
      case 'email':
        await testEmailVerificationTemplates(emailService);
        break;
      case 'pharmacy':
        await testPharmacyTemplates(emailService);
        break;
      case 'payment':
        await testPaymentTemplates(emailService);
        break;
      case 'prescription':
        await testPrescriptionTemplates(emailService);
        break;
      case 'invoice':
        await testInvoiceTemplates(emailService);
        break;
      default:
        console.log('❌ Unknown category. Available categories: account, clinic, email, pharmacy, payment, prescription, invoice');
        return;
    }

    console.log(`✅ ${categoryName} category tests completed!`);
  } catch (error) {
    console.error(`❌ Failed to test ${categoryName} category:`, error.message);
  }
}

async function testAccountTemplates(emailService) {
  console.log('Testing Account Management Templates...');
  
  const templates = [
    { method: 'sendAccountBlockedBySuperAdminEmail', args: [sampleData.accountBlocked.email, sampleData.accountBlocked.doctorName, sampleData.accountBlocked.reason] },
    { method: 'sendAccountRejectedBySuperAdminEmail', args: [sampleData.accountRejected.email, sampleData.accountRejected.doctorName, sampleData.accountRejected.reason] },
    { method: 'sendDoctorAccountCreatedEmail', args: [sampleData.doctorAccountCreated.email, sampleData.doctorAccountCreated.doctorName, sampleData.doctorAccountCreated.loginUrl] },
    { method: 'sendDoctorAccountCreationEmail', args: [sampleData.doctorAccountCreation.email, sampleData.doctorAccountCreation.doctorName, sampleData.doctorAccountCreation.verificationCode] },
    { method: 'sendDoctorSuperAdminApprovalEmail', args: [sampleData.doctorSuperAdminApproval.email, sampleData.doctorSuperAdminApproval.doctorName, sampleData.doctorSuperAdminApproval.loginUrl] },
    { method: 'sendSignupEmail', args: [sampleData.signup.email, sampleData.signup.doctorName, sampleData.signup.otp] }
  ];

  for (const template of templates) {
    try {
      await emailService[template.method](...template.args);
      console.log(`✅ ${template.method} sent successfully!`);
    } catch (error) {
      console.error(`❌ ${template.method} failed:`, error.message);
    }
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.length === 1) {
  if (args[0] === '--help' || args[0] === '-h') {
    // Show help information
    console.log('📖 Usage:');
    console.log('  node test-all-templates.js                    # Test all templates');
    console.log('  node test-all-templates.js <category_name>    # Test specific category');
    console.log('  node test-all-templates.js --help             # Show this help message');
    console.log('\n📝 Available categories:');
    console.log('  account      - Account management templates (6 templates)');
    console.log('  clinic       - Clinic management templates (5 templates)');
    console.log('  email        - Email verification templates (5 templates)');
    console.log('  pharmacy     - Pharmacy related templates (4 templates)');
    console.log('  payment      - Payment related templates (3 templates)');
    console.log('  prescription - Prescription templates (5 templates)');
    console.log('  invoice      - Invoice templates (2 templates)');
    console.log('\n📧 Total: 34 email templates available for testing');
    console.log('🌐 Test emails will be sent to Mailtrap for safe testing');
  } else {
    // Test specific category
    testSpecificCategory(args[0]);
  }
} else if (args.length === 0) {
  // Test all templates
  testAllTemplates();
} else {
  console.log('📖 Usage:');
  console.log('  node test-all-templates.js                    # Test all templates');
  console.log('  node test-all-templates.js <category_name>    # Test specific category');
  console.log('  node test-all-templates.js --help             # Show this help message');
  console.log('\n📝 Available categories:');
  console.log('  account      - Account management templates');
  console.log('  clinic       - Clinic management templates');
  console.log('  email        - Email verification templates');
  console.log('  pharmacy     - Pharmacy related templates');
  console.log('  payment      - Payment related templates');
  console.log('  prescription - Prescription templates');
  console.log('  invoice      - Invoice templates');
} 