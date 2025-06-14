# 📧 Complete Email Templates Guide

This guide covers all 9 email templates integrated with Mailtrap SMTP for testing and development.

## 📋 Available Templates

### 1. **Doctor Account Created** (`doctor-account-created.ejs`)
Welcome email sent when a doctor account is created.

**Variables:**
- `doctor_name` - Doctor's full name
- `login_url` - Platform login URL

**Usage:**
```javascript
await emailService.sendDoctorAccountCreatedEmail(
  'doctor@example.com',
  'Dr. John Smith',
  'https://app.sendscript.com/login'
);
```

**API Endpoint:** `POST /api/send-doctor-email`
```json
{
  "email": "doctor@example.com",
  "doctorName": "Dr. John Smith",
  "loginUrl": "https://app.sendscript.com/login"
}
```

---

### 2. **Pharmacy Verification** (`pharmacy-verification.ejs`)
OTP verification email for pharmacy accounts.

**Variables:**
- `otp` - One-time password
- `purpose` - Purpose of verification (default: 'verification')
- `validity` - OTP validity period in minutes (default: 10)

**Usage:**
```javascript
await emailService.sendPharmacyVerificationEmail(
  'pharmacy@example.com',
  '123456',
  'account verification',
  10
);
```

**API Endpoint:** `POST /api/send-pharmacy-verification`
```json
{
  "email": "pharmacy@example.com",
  "otp": "123456",
  "purpose": "account verification",
  "validity": 10
}
```

---

### 3. **Forgot Password** (`forgot-password.ejs`)
Password reset email with verification code.

**Variables:**
- `doctor_name` - Doctor's full name
- `otp` - Password reset OTP

**Usage:**
```javascript
await emailService.sendForgotPasswordEmail(
  'doctor@example.com',
  'Dr. John Smith',
  '789012'
);
```

**API Endpoint:** `POST /api/send-forgot-password`
```json
{
  "email": "doctor@example.com",
  "doctorName": "Dr. John Smith",
  "otp": "789012"
}
```

---

### 4. **Send Token** (`send-token.ejs`)
Electronic prescription token sent to patients.

**Variables:**
- `patient_name` - Patient's full name
- `doctor_name` - Prescribing doctor's name
- `clinic_name` - Clinic name
- `prescription_id` - Unique prescription ID
- `clinic_address` - Clinic address
- `clinic_city` - Clinic city
- `clinic_postal_code` - Clinic postal code
- `clinic_country` - Clinic country
- `clinic_mobile` - Clinic phone number
- `clinic_email` - Clinic email

**Usage:**
```javascript
await emailService.sendTokenEmail(
  'patient@example.com',
  'John Doe',
  'Dr. Jane Smith',
  'SendScript Clinic',
  'RX123456789',
  {
    address: '123 Medical Street',
    city: 'London',
    postal_code: 'SW1A 1AA',
    country: 'United Kingdom',
    mobile: '+44 20 1234 5678',
    email: 'clinic@sendscript.com'
  }
);
```

**API Endpoint:** `POST /api/send-token`
```json
{
  "email": "patient@example.com",
  "patientName": "John Doe",
  "doctorName": "Dr. Jane Smith",
  "clinicName": "SendScript Clinic",
  "prescriptionId": "RX123456789",
  "clinicData": {
    "address": "123 Medical Street",
    "city": "London",
    "postal_code": "SW1A 1AA",
    "country": "United Kingdom",
    "mobile": "+44 20 1234 5678",
    "email": "clinic@sendscript.com"
  }
}
```

---

### 5. **Send to Unregister Pharmacy** (`sendto-unregister-pharmacy.ejs`)
Prescription sent to unregistered pharmacies.

**Variables:**
- `pharmacyName` - Pharmacy name
- `prescriptionCode` - Prescription code
- `patientDob` - Patient date of birth
- `patientName` - Patient name
- `patientMobileNumber` - Patient mobile number
- `clinic` - Clinic information object

**Usage:**
```javascript
await emailService.sendToUnregisterPharmacyEmail(
  'pharmacy@example.com',
  'Local Pharmacy',
  'RX123456789',
  {
    dob: '1990-01-15',
    name: 'John Doe',
    mobile: '+44 7123 456789'
  },
  {
    name: 'SendScript Clinic',
    address_line_1: '123 Medical Street',
    city: 'London',
    // ... other clinic details
  }
);
```

---

### 6. **Prescription With Sign** (`prescription-with-sign.ejs`)
Complete prescription with electronic signature.

**Variables:** Complex prescription object with clinic, doctor, patient, and medication details.

**Usage:**
```javascript
await emailService.sendPrescriptionWithSignEmail(
  'patient@example.com',
  prescriptionData
);
```

**API Endpoint:** `POST /api/send-prescription`
```json
{
  "email": "patient@example.com",
  "prescriptionData": { /* complex prescription object */ },
  "withSign": true
}
```

---

### 7. **Prescription Without Sign** (`prescription-without-sign.ejs`)
Prescription requiring manual signature.

**Variables:** Same as prescription with sign, but formatted for manual signing.

**Usage:**
```javascript
await emailService.sendPrescriptionWithoutSignEmail(
  'patient@example.com',
  prescriptionData
);
```

**API Endpoint:** `POST /api/send-prescription`
```json
{
  "email": "patient@example.com",
  "prescriptionData": { /* complex prescription object */ },
  "withSign": false
}
```

---

### 8. **Pharmacist With Sign** (`pharmacist-with-sign.ejs`)
Pharmacist copy of prescription with electronic signature.

**Variables:** Same prescription data structure as above.

**Usage:**
```javascript
await emailService.sendPharmacistWithSignEmail(
  'pharmacist@example.com',
  prescriptionData
);
```

---

### 9. **Invoice Generate** (`invoice-generate.ejs`)
Invoice email sent to patients after medication dispensing.

**Variables:**
- `pharmacy` - Pharmacy information
- `patient_details` - Patient information
- `invoice_id` - Unique invoice ID
- `invoice_date` - Invoice date
- `prescription_items` - Array of medications
- `total_price` - Total cost
- `delivery_charge` - Delivery fee

**Usage:**
```javascript
await emailService.sendInvoiceEmail(
  'patient@example.com',
  invoiceData
);
```

**API Endpoint:** `POST /api/send-invoice`
```json
{
  "email": "patient@example.com",
  "invoiceData": {
    "pharmacy": { /* pharmacy details */ },
    "patient_details": { /* patient details */ },
    "invoice_id": "INV-2024-001",
    "prescription_items": [ /* medication items */ ],
    "total_price": 10.70
  }
}
```

## 🚀 Testing Commands

### Command Line Testing
```bash
# Test all templates
npm run test-all

# Test specific template
node test-all-templates.js doctor
node test-all-templates.js pharmacy
node test-all-templates.js forgot
node test-all-templates.js token
node test-all-templates.js prescription
node test-all-templates.js invoice

# Test original doctor template
npm test
```

### Web Interface Testing
```bash
# Start server
npm start

# Access testing interface
# http://localhost:3000/test-form
```

## 📊 Email Template Data Structures

### Prescription Data Structure
```javascript
{
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
    }
  ]
}
```

### Invoice Data Structure
```javascript
{
  pharmacy: {
    name: 'SendScript Pharmacy',
    address_line_1: '456 Pharmacy Road',
    address_line_2: 'Ground Floor',
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
    }
  ],
  total_price: 10.70,
  delivery_charge: 2.00
}
```

## 🔧 Integration Guide

### 1. Basic Integration
```javascript
const EmailService = require('./email-service');
const emailService = new EmailService();

// Send any template
await emailService.sendDoctorAccountCreatedEmail(email, name, url);
await emailService.sendPharmacyVerificationEmail(email, otp);
await emailService.sendForgotPasswordEmail(email, name, otp);
// ... etc
```

### 2. Express.js Integration
```javascript
const express = require('express');
const EmailService = require('./email-service');

const app = express();
const emailService = new EmailService();

app.post('/send-email', async (req, res) => {
  try {
    const result = await emailService.sendDoctorAccountCreatedEmail(
      req.body.email,
      req.body.doctorName,
      req.body.loginUrl
    );
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### 3. Error Handling
```javascript
try {
  await emailService.sendDoctorAccountCreatedEmail(email, name, url);
  console.log('Email sent successfully');
} catch (error) {
  console.error('Email failed:', error.message);
  // Handle error appropriately
}
```

## 📈 Best Practices

1. **Always Test Connection First**
   ```javascript
   const connectionOk = await emailService.testConnection();
   if (!connectionOk) {
     throw new Error('SMTP connection failed');
   }
   ```

2. **Validate Data Before Sending**
   ```javascript
   if (!email || !doctorName || !loginUrl) {
     throw new Error('Missing required fields');
   }
   ```

3. **Use Appropriate Templates**
   - Use signed versions for electronic prescriptions
   - Use unsigned versions when manual signature is required
   - Use pharmacist copies for pharmacy records

4. **Monitor Email Delivery**
   - Check Mailtrap inbox for test emails
   - Monitor message IDs for tracking
   - Handle errors gracefully

5. **Secure Configuration**
   - Keep SMTP credentials secure
   - Use environment variables in production
   - Never commit credentials to version control

## 🔍 Troubleshooting

### Common Issues:
1. **Template Not Found**: Check file paths in `email-config.js`
2. **Missing Variables**: Ensure all required template variables are provided
3. **SMTP Errors**: Verify Mailtrap credentials and connection
4. **Large Attachments**: Email size limits may apply

### Debug Mode:
Add console logs to `email-service.js` for detailed debugging:
```javascript
console.log('Sending email with data:', templateData);
console.log('Email result:', result);
```

## 🎯 Next Steps

1. **Production Setup**: Configure real SMTP for production
2. **Template Customization**: Modify EJS templates for your needs
3. **Automation**: Integrate with your application workflow
4. **Monitoring**: Add email delivery tracking
5. **Scaling**: Consider email queue systems for high volume

## 📚 Resources

- [Mailtrap Documentation](https://mailtrap.io/docs/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [EJS Template Engine](https://ejs.co/)
- [Express.js Documentation](https://expressjs.com/)

---

All templates are now fully configured and tested with Mailtrap SMTP! 🎉 