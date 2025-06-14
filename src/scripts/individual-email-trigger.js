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
  1: {
    name: 'Doctor Account Created',
    method: 'sendDoctorAccountCreatedEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'loginUrl', prompt: 'Enter login URL: ', required: true }
    ]
  },
  2: {
    name: 'Pharmacy Verification',
    method: 'sendPharmacyVerificationEmail',
    fields: [
      { name: 'email', prompt: 'Enter pharmacy email: ', required: true },
      { name: 'otp', prompt: 'Enter OTP (6 digits): ', required: true },
      { name: 'purpose', prompt: 'Enter purpose (default: verification): ', required: false, default: 'verification' },
      { name: 'validity', prompt: 'Enter validity in minutes (default: 10): ', required: false, default: 10 }
    ]
  },
  3: {
    name: 'Forgot Password',
    method: 'sendForgotPasswordEmail',
    fields: [
      { name: 'email', prompt: 'Enter doctor email: ', required: true },
      { name: 'doctorName', prompt: 'Enter doctor name: ', required: true },
      { name: 'otp', prompt: 'Enter reset OTP: ', required: true }
    ]
  },
  4: {
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
  5: {
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
  }
};

async function showMenu() {
  console.log('\n📧 Individual Email Template Trigger\n');
  console.log('Available Templates:');
  console.log('1. Doctor Account Created');
  console.log('2. Pharmacy Verification');
  console.log('3. Forgot Password');
  console.log('4. Send Token');
  console.log('5. Send to Unregister Pharmacy');
  console.log('6. Prescription With Sign (uses sample data)');
  console.log('7. Prescription Without Sign (uses sample data)');
  console.log('8. Pharmacist With Sign (uses sample data)');
  console.log('9. Invoice Generate (uses sample data)');
  console.log('0. Exit');
  console.log('\nNote: Templates 6-9 use predefined sample data for complex structures');
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
    
    switch (templateChoice) {
      case '1':
        result = await emailService.sendDoctorAccountCreatedEmail(
          userData.email,
          userData.doctorName,
          userData.loginUrl
        );
        break;
        
      case '2':
        result = await emailService.sendPharmacyVerificationEmail(
          userData.email,
          userData.otp,
          userData.purpose,
          parseInt(userData.validity)
        );
        break;
        
      case '3':
        result = await emailService.sendForgotPasswordEmail(
          userData.email,
          userData.doctorName,
          userData.otp
        );
        break;
        
      case '4':
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
        
      case '5':
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
        
      case '6':
        // Prescription with sign - using sample data
        result = await emailService.sendPrescriptionWithSignEmail(
          await question('Enter recipient email: '),
          getSamplePrescriptionData()
        );
        break;
        
      case '7':
        // Prescription without sign - using sample data
        result = await emailService.sendPrescriptionWithoutSignEmail(
          await question('Enter recipient email: '),
          getSamplePrescriptionData()
        );
        break;
        
      case '8':
        // Pharmacist with sign - using sample data
        result = await emailService.sendPharmacistWithSignEmail(
          await question('Enter pharmacist email: '),
          getSamplePrescriptionData()
        );
        break;
        
      case '9':
        // Invoice generate - using sample data
        result = await emailService.sendInvoiceEmail(
          await question('Enter patient email: '),
          getSampleInvoiceData()
        );
        break;
        
      default:
        console.log('❌ Invalid template choice');
        return;
    }
    
    console.log(`\n✅ Email sent successfully!`);
    console.log(`📧 Message ID: ${result.messageId}`);
    console.log(`🌐 Check your Mailtrap inbox: https://mailtrap.io/inboxes`);
    
  } catch (error) {
    console.error(`\n❌ Error sending email: ${error.message}`);
  }
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
    delivery_charge: 2.00
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
    
    if (choice >= '1' && choice <= '5') {
      const template = templateConfigs[choice];
      const userData = await collectUserInput(template);
      await sendEmail(choice, userData);
    } else if (choice >= '6' && choice <= '9') {
      await sendEmail(choice, {});
    } else {
      console.log('\n❌ Invalid choice. Please select 0-9.');
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