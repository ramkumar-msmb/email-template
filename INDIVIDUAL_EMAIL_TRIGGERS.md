# 🎯 Individual Email Triggers Guide

Complete guide for triggering individual email templates with custom data using multiple methods.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Available Methods](#available-methods)
3. [Command Line Triggers](#command-line-triggers)
4. [Interactive Menu System](#interactive-menu-system)
5. [JavaScript/Node.js Usage](#javascriptnodejs-usage)
6. [REST API Endpoints](#rest-api-endpoints)
7. [Web Interface](#web-interface)
8. [Template Reference](#template-reference)
9. [Examples & Use Cases](#examples--use-cases)
10. [Best Practices](#best-practices)

## 📖 Overview

Your email template system supports **5 different methods** to trigger individual emails:

✅ **Command Line** - Quick testing with preset data  
✅ **Interactive Menu** - Custom data input with guided prompts  
✅ **JavaScript Code** - Programmatic integration  
✅ **REST API** - Web service integration  
✅ **Web Interface** - Browser-based testing  

All methods use **Mailtrap SMTP** for safe testing without sending real emails to users.

## 🚀 Available Methods

### Method Comparison

| Method | Complexity | Customization | Best For |
|--------|------------|---------------|----------|
| Command Line | ⭐ | ⭐⭐ | Quick tests |
| Interactive Menu | ⭐⭐ | ⭐⭐⭐⭐⭐ | Custom data |
| JavaScript Code | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Integration |
| REST API | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Web services |
| Web Interface | ⭐⭐ | ⭐⭐⭐ | Visual testing |

## 💻 Command Line Triggers

### Quick Individual Tests
```bash
# Test specific templates with preset data
node test-all-templates.js doctor      # Doctor account created
node test-all-templates.js pharmacy    # Pharmacy verification
node test-all-templates.js forgot      # Forgot password
node test-all-templates.js token       # Send token
node test-all-templates.js prescription # Prescription with sign
node test-all-templates.js invoice     # Invoice generation
```

### Example Output
```bash
$ node test-all-templates.js doctor
🚀 Testing specific template: doctor...
✅ SMTP connection successful!
✅ Email sent successfully!
📧 Message ID: <18c755f2-2d12-5d6c-4ba6-9fcc59fb2da5@sendscript.com>
✅ doctor template sent successfully!
```

### All Available Templates
```bash
node test-all-templates.js doctor       # Doctor Account Created
node test-all-templates.js pharmacy     # Pharmacy Verification
node test-all-templates.js forgot       # Forgot Password
node test-all-templates.js token        # Send Token
node test-all-templates.js prescription # Prescription With Sign
node test-all-templates.js invoice      # Invoice Generate
```

## 🎮 Interactive Menu System

### Launch Interactive Menu
```bash
# Using npm script
npm run individual

# Or directly
node individual-email-trigger.js
```

### Interactive Features
- ✅ **Custom Data Input** - Enter your own email addresses, names, etc.
- ✅ **Field Validation** - Required fields are enforced
- ✅ **Default Values** - Smart defaults for optional fields
- ✅ **Multiple Sends** - Send multiple emails in one session
- ✅ **Real-time Testing** - SMTP connection tested before sending

### Sample Interactive Session
```
🚀 Welcome to Individual Email Template Trigger!
📡 Testing SMTP connection...
✅ SMTP connection successful!

📧 Individual Email Template Trigger

Available Templates:
1. Doctor Account Created
2. Pharmacy Verification
3. Forgot Password
4. Send Token
5. Send to Unregister Pharmacy
6. Prescription With Sign (uses sample data)
7. Prescription Without Sign (uses sample data)
8. Pharmacist With Sign (uses sample data)
9. Invoice Generate (uses sample data)
0. Exit

Select a template (0 to exit): 1

📝 Collecting data for: Doctor Account Created

Enter doctor email: ramkumar@gmail.com
Enter doctor name: Dr. Ramkumar
Enter login URL: https://app.sendscript.com/login

✅ Email sent successfully!
📧 Message ID: <5a3c757c-5fb0-71b6-a01f-800eb96d0727@sendscript.com>
🌐 Check your Mailtrap inbox: https://mailtrap.io/inboxes

Would you like to send another email? (y/n): n
👋 Goodbye!
```

### Templates with Custom Input (1-5)
These templates allow full custom data input:

**1. Doctor Account Created**
- Doctor email
- Doctor name  
- Login URL

**2. Pharmacy Verification**
- Pharmacy email
- OTP (6 digits)
- Purpose (default: verification)
- Validity in minutes (default: 10)

**3. Forgot Password**
- Doctor email
- Doctor name
- Reset OTP

**4. Send Token**
- Patient email
- Patient name
- Doctor name
- Clinic name
- Prescription ID
- Complete clinic details (address, city, postal code, etc.)

**5. Send to Unregister Pharmacy**
- Pharmacy email
- Pharmacy name
- Prescription code
- Patient details (name, DOB, mobile)
- Complete clinic information

### Templates with Sample Data (6-9)
These use predefined sample data for complex structures:

**6-8. Prescription Templates**
- Only asks for recipient email
- Uses comprehensive sample prescription data
- Includes patient, doctor, clinic, and medication details

**9. Invoice Template**
- Only asks for patient email
- Uses sample invoice with pharmacy and medication data

## 🔧 JavaScript/Node.js Usage

### Basic Setup
```javascript
const EmailService = require('./email-service');
const emailService = new EmailService();

// Test connection first
await emailService.testConnection();
```

### Individual Template Methods

#### 1. Doctor Account Created
```javascript
await emailService.sendDoctorAccountCreatedEmail(
  'doctor@example.com',
  'Dr. John Smith',
  'https://app.sendscript.com/login'
);
```

#### 2. Pharmacy Verification
```javascript
await emailService.sendPharmacyVerificationEmail(
  'pharmacy@example.com',
  '123456',           // OTP
  'verification',     // Purpose (optional)
  10                  // Validity in minutes (optional)
);
```

#### 3. Forgot Password
```javascript
await emailService.sendForgotPasswordEmail(
  'doctor@example.com',
  'Dr. John Smith',
  '789012'            // Reset OTP
);
```

#### 4. Send Token
```javascript
await emailService.sendTokenEmail(
  'patient@example.com',
  'John Doe',         // Patient name
  'Dr. Jane Smith',   // Doctor name
  'SendScript Clinic', // Clinic name
  'RX123456789',      // Prescription ID
  {                   // Clinic data object
    address: '123 Medical Street',
    city: 'London',
    postal_code: 'SW1A 1AA',
    country: 'United Kingdom',
    mobile: '+44 20 1234 5678',
    email: 'clinic@sendscript.com'
  }
);
```

#### 5. Send to Unregister Pharmacy
```javascript
await emailService.sendToUnregisterPharmacyEmail(
  'pharmacy@example.com',
  'Local Pharmacy',   // Pharmacy name
  'RX123456789',      // Prescription code
  {                   // Patient data
    dob: '1990-01-15',
    name: 'John Doe',
    mobile: '+44 7123 456789'
  },
  {                   // Clinic data
    name: 'SendScript Clinic',
    address_line_1: '123 Medical Street',
    address_line_2: 'Suite 100',
    city: 'London',
    postal_code: 'SW1A 1AA',
    country: 'United Kingdom',
    contact_number: '+44 20 1234 5678',
    email: 'clinic@sendscript.com'
  }
);
```

#### 6-8. Prescription Templates
```javascript
// Prescription with signature
await emailService.sendPrescriptionWithSignEmail(
  'patient@example.com',
  prescriptionData    // Complex prescription object
);

// Prescription without signature
await emailService.sendPrescriptionWithoutSignEmail(
  'patient@example.com',
  prescriptionData
);

// Pharmacist copy with signature
await emailService.sendPharmacistWithSignEmail(
  'pharmacist@example.com',
  prescriptionData
);
```

#### 9. Invoice Template
```javascript
await emailService.sendInvoiceEmail(
  'patient@example.com',
  invoiceData         // Complex invoice object
);
```

### Error Handling
```javascript
try {
  const result = await emailService.sendDoctorAccountCreatedEmail(
    'doctor@test.com',
    'Dr. Test',
    'https://test.com'
  );
  
  console.log('✅ Email sent!');
  console.log('📧 Message ID:', result.messageId);
  
} catch (error) {
  console.error('❌ Email failed:', error.message);
}
```

## 🌐 REST API Endpoints

### Start the Server
```bash
npm start
# Server runs on http://localhost:3000
```

### Available Endpoints

#### 1. Doctor Account Created
```bash
curl -X POST http://localhost:3000/api/send-doctor-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "doctorName": "Dr. John Smith",
    "loginUrl": "https://app.sendscript.com/login"
  }'
```

#### 2. Pharmacy Verification
```bash
curl -X POST http://localhost:3000/api/send-pharmacy-verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pharmacy@example.com",
    "otp": "123456",
    "purpose": "verification",
    "validity": 10
  }'
```

#### 3. Forgot Password
```bash
curl -X POST http://localhost:3000/api/send-forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "doctorName": "Dr. John Smith",
    "otp": "789012"
  }'
```

#### 4. Send Token
```bash
curl -X POST http://localhost:3000/api/send-token \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

#### 5. Prescription Templates
```bash
curl -X POST http://localhost:3000/api/send-prescription \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "prescriptionData": { /* complex prescription object */ },
    "withSign": true
  }'
```

#### 6. Invoice Template
```bash
curl -X POST http://localhost:3000/api/send-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "invoiceData": { /* complex invoice object */ }
  }'
```

#### Test Connection
```bash
curl http://localhost:3000/api/test-connection
```

### API Response Format
```json
{
  "success": true,
  "message": "Email sent successfully!",
  "messageId": "<message-id@sendscript.com>"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to send email",
  "error": "Missing required fields: email, doctorName"
}
```

## 🖥️ Web Interface

### Access the Web Interface
```bash
npm start
# Visit: http://localhost:3000/test-form
```

### Features
- ✅ **Visual Form** - Easy-to-use web form
- ✅ **Real-time Testing** - Test connection button
- ✅ **Instant Results** - Success/error messages
- ✅ **Template Preview** - View email template
- ✅ **Direct Links** - Quick access to Mailtrap inbox

### Available Pages
- **Test Form**: `http://localhost:3000/test-form`
- **Template Preview**: `http://localhost:3000/index.html`
- **API Test**: `http://localhost:3000/api/test-connection`

## 📧 Template Reference

### All 9 Available Templates

| # | Template Name | Method | Custom Input | Sample Data |
|---|---------------|--------|--------------|-------------|
| 1 | Doctor Account Created | ✅ Command ✅ Interactive ✅ API | Full | Preset |
| 2 | Pharmacy Verification | ✅ Command ✅ Interactive ✅ API | Full | Preset |
| 3 | Forgot Password | ✅ Command ✅ Interactive ✅ API | Full | Preset |
| 4 | Send Token | ✅ Command ✅ Interactive ✅ API | Full | Preset |
| 5 | Send to Unregister Pharmacy | ✅ Command ✅ Interactive ✅ API | Full | Preset |
| 6 | Prescription With Sign | ✅ Command ✅ Interactive ✅ API | Email only | Complex |
| 7 | Prescription Without Sign | ✅ Command ✅ Interactive ✅ API | Email only | Complex |
| 8 | Pharmacist With Sign | ✅ Command ✅ Interactive ✅ API | Email only | Complex |
| 9 | Invoice Generate | ✅ Command ✅ Interactive ✅ API | Email only | Complex |

### Template Categories

#### **Simple Templates (1-5)**
- Allow full custom data input
- Suitable for testing with real scenarios
- All fields can be customized

#### **Complex Templates (6-9)**
- Use predefined sample data structures
- Only require recipient email input
- Include realistic medical/pharmacy data

## 🎯 Examples & Use Cases

### Development Scenarios

#### **Scenario 1: Testing Doctor Registration Flow**
```bash
# Method 1: Quick test
node test-all-templates.js doctor

# Method 2: Custom data
npm run individual
# Choose option 1, enter real doctor details

# Method 3: Programmatic
await emailService.sendDoctorAccountCreatedEmail(
  'newdoctor@clinic.com',
  'Dr. Sarah Wilson',
  'https://staging.sendscript.com/login'
);
```

#### **Scenario 2: Testing OTP Flow**
```bash
# Generate random OTP for testing
npm run individual
# Choose option 2 (Pharmacy Verification)
# Enter: pharmacy@test.com, 123456, registration, 15
```

#### **Scenario 3: Testing Prescription Flow**
```bash
# Test prescription with signature
node test-all-templates.js prescription

# Test prescription without signature (interactive)
npm run individual
# Choose option 7, enter patient email
```

#### **Scenario 4: API Integration Testing**
```bash
# Start server
npm start

# Test API endpoint
curl -X POST http://localhost:3000/api/send-doctor-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","doctorName":"Dr. Test","loginUrl":"https://test.com"}'
```

### Production Integration

#### **Backend Integration**
```javascript
// In your Express.js route
app.post('/register-doctor', async (req, res) => {
  try {
    // Create doctor account in database
    const doctor = await createDoctor(req.body);
    
    // Send welcome email
    await emailService.sendDoctorAccountCreatedEmail(
      doctor.email,
      doctor.fullName,
      process.env.DOCTOR_LOGIN_URL
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### **Microservice Integration**
```javascript
// Email service microservice
const express = require('express');
const EmailService = require('./email-service');

const app = express();
const emailService = new EmailService();

// Individual email endpoints
app.post('/doctor/welcome', async (req, res) => {
  const result = await emailService.sendDoctorAccountCreatedEmail(
    req.body.email,
    req.body.name,
    req.body.loginUrl
  );
  res.json({ messageId: result.messageId });
});

app.post('/pharmacy/verify', async (req, res) => {
  const result = await emailService.sendPharmacyVerificationEmail(
    req.body.email,
    req.body.otp,
    req.body.purpose,
    req.body.validity
  );
  res.json({ messageId: result.messageId });
});
```

## ✅ Best Practices

### 1. **Choose the Right Method**
- 🔧 **Development**: Use Interactive Menu for testing
- ⚡ **Quick Tests**: Use Command Line
- 🏗️ **Integration**: Use JavaScript methods
- 🌐 **External Systems**: Use REST API
- 👀 **Visual Testing**: Use Web Interface

### 2. **Data Validation**
```javascript
// Always validate required fields
if (!email || !doctorName || !loginUrl) {
  throw new Error('Missing required fields');
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error('Invalid email format');
}
```

### 3. **Error Handling**
```javascript
try {
  const result = await emailService.sendDoctorAccountCreatedEmail(
    email, name, url
  );
  console.log('✅ Email sent:', result.messageId);
} catch (error) {
  console.error('❌ Email failed:', error.message);
  // Log to monitoring system
  // Retry mechanism if needed
  // Fallback notification
}
```

### 4. **Testing Workflow**
1. **Test Connection First**
   ```bash
   npm start
   curl http://localhost:3000/api/test-connection
   ```

2. **Start with Simple Templates**
   ```bash
   node test-all-templates.js doctor
   ```

3. **Progress to Custom Data**
   ```bash
   npm run individual
   ```

4. **Integrate into Application**
   ```javascript
   await emailService.sendDoctorAccountCreatedEmail(...)
   ```

### 5. **Environment Management**
```javascript
// Use environment variables for configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
};
```

### 6. **Monitoring & Logging**
```javascript
// Log all email attempts
console.log(`📧 Sending ${templateName} to ${email}`);
console.log(`✅ Success: ${result.messageId}`);

// Monitor delivery rates
// Track template usage
// Alert on failures
```

## 🔍 Troubleshooting

### Common Issues

#### **SMTP Connection Failed**
```bash
# Test connection
npm start
curl http://localhost:3000/api/test-connection

# Check credentials in email-config.js
# Verify Mailtrap account status
```

#### **Template Not Found**
```bash
# Check file exists
ls -la *.ejs

# Verify template name in email-config.js
# Check file paths are correct
```

#### **Missing Required Fields**
```bash
# Check interactive input
npm run individual

# Validate API payload
# Review JavaScript method parameters
```

### Debug Mode
```javascript
// Add debug logging
console.log('Template data:', templateData);
console.log('Email options:', mailOptions);
```

## 🎊 Success Verification

After sending any email:

1. **Check Console Output**
   ```
   ✅ Email sent successfully!
   📧 Message ID: <message-id@sendscript.com>
   ```

2. **Visit Mailtrap Inbox**
   - Go to: https://mailtrap.io/inboxes
   - Check your testing inbox
   - View HTML preview, spam score, raw source

3. **Verify Template Rendering**
   - Check all dynamic content is populated
   - Verify styling and layout
   - Test across different email clients

## 📚 Quick Reference

### Command Shortcuts
```bash
# Test all templates
npm run test-all

# Interactive individual emails
npm run individual

# Start web server
npm start

# Test specific template
node test-all-templates.js <template_name>
```

### Template Names
- `doctor` - Doctor Account Created
- `pharmacy` - Pharmacy Verification
- `forgot` - Forgot Password
- `token` - Send Token
- `prescription` - Prescription With Sign
- `invoice` - Invoice Generate

---

## 🎯 Summary

Your email template system provides **complete flexibility** for individual email triggering:

✅ **5 Different Methods** - Command line, interactive, JavaScript, API, web  
✅ **9 Email Templates** - All major email types covered  
✅ **Custom Data Input** - Full control over email content  
✅ **Safe Testing** - Mailtrap integration prevents real email sends  
✅ **Production Ready** - Easy integration into applications  

**Perfect for development, testing, and production use!** 🚀 