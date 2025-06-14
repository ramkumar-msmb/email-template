#!/usr/bin/env node

const EmailService = require('../services/email-service');

// Sample data for different templates
const sampleData = {
  doctorAccountCreated: {
    email: 'doctor@example.com',
    data: {
      doctor_name: 'Dr. John Smith',
      login_url: 'https://app.sendscript.com/login'
    }
  },

  pharmacyVerification: {
    email: 'pharmacy@example.com',
    data: {
      otp: '123456',
      purpose: 'account verification',
      validity: 10
    }
  },

  forgotPassword: {
    email: 'doctor@example.com',
    data: {
      doctor_name: 'Dr. John Smith',
      otp: '789012'
    }
  },

  sendToken: {
    email: 'patient@example.com',
    data: {
      patient_name: 'John Doe',
      doctor_name: 'Dr. Jane Smith',
      clinic_name: 'SendScript Clinic',
      prescription_id: 'RX123456789',
      clinic_address: '123 Medical Street',
      clinic_city: 'London',
      clinic_postal_code: 'SW1A 1AA',
      clinic_country: 'United Kingdom',
      clinic_mobile: '+44 20 1234 5678',
      clinic_email: 'clinic@sendscript.com'
    }
  },

  sendToUnregisterPharmacy: {
    email: 'pharmacy@example.com',
    data: {
      pharmacyName: 'Local Pharmacy',
      prescriptionCode: 'RX123456789',
      patientDob: '1990-01-15',
      patientName: 'John Doe',
      patientMobileNumber: '+44 7123 456789',
      clinic: {
        name: 'SendScript Clinic',
        address_line_1: '123 Medical Street',
        address_line_2: 'Suite 100',
        city: 'London',
        postal_code: 'SW1A 1AA',
        country: 'United Kingdom',
        contact_number: '+44 20 1234 5678',
        email: 'clinic@sendscript.com'
      }
    }
  },

  // Complex prescription data for prescription templates
  prescriptionData: {
    email: 'patient@example.com',
    data: {
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
    }
  },

  // Invoice data
  invoiceData: {
    email: 'patient@example.com',
    data: {
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
    }
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
      {
        name: 'Doctor Account Created',
        method: 'sendDoctorAccountCreatedEmail',
        args: [sampleData.doctorAccountCreated.email, sampleData.doctorAccountCreated.data.doctor_name, sampleData.doctorAccountCreated.data.login_url]
      },
      {
        name: 'Pharmacy Verification',
        method: 'sendPharmacyVerificationEmail',
        args: [sampleData.pharmacyVerification.email, sampleData.pharmacyVerification.data.otp, sampleData.pharmacyVerification.data.purpose, sampleData.pharmacyVerification.data.validity]
      },
      {
        name: 'Forgot Password',
        method: 'sendForgotPasswordEmail',
        args: [sampleData.forgotPassword.email, sampleData.forgotPassword.data.doctor_name, sampleData.forgotPassword.data.otp]
      },
      {
        name: 'Send Token',
        method: 'sendTokenEmail',
        args: [sampleData.sendToken.email, sampleData.sendToken.data.patient_name, sampleData.sendToken.data.doctor_name, sampleData.sendToken.data.clinic_name, sampleData.sendToken.data.prescription_id, {
          address: sampleData.sendToken.data.clinic_address,
          city: sampleData.sendToken.data.clinic_city,
          postal_code: sampleData.sendToken.data.clinic_postal_code,
          country: sampleData.sendToken.data.clinic_country,
          mobile: sampleData.sendToken.data.clinic_mobile,
          email: sampleData.sendToken.data.clinic_email
        }]
      },
      {
        name: 'Send to Unregister Pharmacy',
        method: 'sendToUnregisterPharmacyEmail',
        args: [sampleData.sendToUnregisterPharmacy.email, sampleData.sendToUnregisterPharmacy.data.pharmacyName, sampleData.sendToUnregisterPharmacy.data.prescriptionCode, {
          dob: sampleData.sendToUnregisterPharmacy.data.patientDob,
          name: sampleData.sendToUnregisterPharmacy.data.patientName,
          mobile: sampleData.sendToUnregisterPharmacy.data.patientMobileNumber
        }, sampleData.sendToUnregisterPharmacy.data.clinic]
      },
      {
        name: 'Prescription With Sign',
        method: 'sendPrescriptionWithSignEmail',
        args: [sampleData.prescriptionData.email, sampleData.prescriptionData.data]
      },
      {
        name: 'Prescription Without Sign',
        method: 'sendPrescriptionWithoutSignEmail',
        args: [sampleData.prescriptionData.email, sampleData.prescriptionData.data]
      },
      {
        name: 'Pharmacist With Sign',
        method: 'sendPharmacistWithSignEmail',
        args: [sampleData.prescriptionData.email, sampleData.prescriptionData.data]
      },
      {
        name: 'Invoice Generate',
        method: 'sendInvoiceEmail',
        args: [sampleData.invoiceData.email, sampleData.invoiceData.data]
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
    console.log('\n💡 Check your Mailtrap inbox to see all the emails!');
    console.log('🌐 Visit: https://mailtrap.io/inboxes');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Function to test specific template
async function testSpecificTemplate(templateName) {
  console.log(`🚀 Testing specific template: ${templateName}...\n`);

  const emailService = new EmailService();

  try {
    await emailService.testConnection();

    switch (templateName.toLowerCase()) {
      case 'doctor':
        await emailService.sendDoctorAccountCreatedEmail(
          sampleData.doctorAccountCreated.email,
          sampleData.doctorAccountCreated.data.doctor_name,
          sampleData.doctorAccountCreated.data.login_url
        );
        break;
      case 'pharmacy':
        await emailService.sendPharmacyVerificationEmail(
          sampleData.pharmacyVerification.email,
          sampleData.pharmacyVerification.data.otp,
          sampleData.pharmacyVerification.data.purpose,
          sampleData.pharmacyVerification.data.validity
        );
        break;
      case 'forgot':
        await emailService.sendForgotPasswordEmail(
          sampleData.forgotPassword.email,
          sampleData.forgotPassword.data.doctor_name,
          sampleData.forgotPassword.data.otp
        );
        break;
      case 'token':
        await emailService.sendTokenEmail(
          sampleData.sendToken.email,
          sampleData.sendToken.data.patient_name,
          sampleData.sendToken.data.doctor_name,
          sampleData.sendToken.data.clinic_name,
          sampleData.sendToken.data.prescription_id,
          {
            address: sampleData.sendToken.data.clinic_address,
            city: sampleData.sendToken.data.clinic_city,
            postal_code: sampleData.sendToken.data.clinic_postal_code,
            country: sampleData.sendToken.data.clinic_country,
            mobile: sampleData.sendToken.data.clinic_mobile,
            email: sampleData.sendToken.data.clinic_email
          }
        );
        break;
      case 'prescription':
        await emailService.sendPrescriptionWithSignEmail(
          sampleData.prescriptionData.email,
          sampleData.prescriptionData.data
        );
        break;
      case 'invoice':
        await emailService.sendInvoiceEmail(
          sampleData.invoiceData.email,
          sampleData.invoiceData.data
        );
        break;
      default:
        console.log('❌ Unknown template name. Available templates: doctor, pharmacy, forgot, token, prescription, invoice');
        return;
    }

    console.log(`✅ ${templateName} template sent successfully!`);
  } catch (error) {
    console.error(`❌ Failed to send ${templateName} template:`, error.message);
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.length === 1) {
  // Test specific template
  testSpecificTemplate(args[0]);
} else if (args.length === 0) {
  // Test all templates
  testAllTemplates();
} else {
  console.log('📖 Usage:');
  console.log('  node test-all-templates.js                    # Test all templates');
  console.log('  node test-all-templates.js <template_name>    # Test specific template');
  console.log('\n📝 Available templates:');
  console.log('  doctor      - Doctor account created');
  console.log('  pharmacy    - Pharmacy verification');
  console.log('  forgot      - Forgot password');
  console.log('  token       - Send token');
  console.log('  prescription - Prescription with sign');
  console.log('  invoice     - Invoice generation');
} 