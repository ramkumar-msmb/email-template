const express = require('express');
const path = require('path');
const EmailService = require('../services/email-service');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize email service
const emailService = new EmailService();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

// API endpoint to send doctor account created email
app.post('/api/send-doctor-email', async (req, res) => {
  try {
    const { email, doctorName, loginUrl } = req.body;

    // Validate required fields
    if (!email || !doctorName || !loginUrl) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, doctorName, loginUrl'
      });
    }

    // Send email
    const result = await emailService.sendDoctorAccountCreatedEmail(email, doctorName, loginUrl);

    res.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// API endpoint to send pharmacy verification email
app.post('/api/send-pharmacy-verification', async (req, res) => {
  try {
    const { email, otp, purpose, validity } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, otp'
      });
    }

    const result = await emailService.sendPharmacyVerificationEmail(email, otp, purpose, validity);

    res.json({
      success: true,
      message: 'Pharmacy verification email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending pharmacy verification email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send pharmacy verification email',
      error: error.message
    });
  }
});

// API endpoint to send forgot password email
app.post('/api/send-forgot-password', async (req, res) => {
  try {
    const { email, doctorName, otp } = req.body;

    if (!email || !doctorName || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, doctorName, otp'
      });
    }

    const result = await emailService.sendForgotPasswordEmail(email, doctorName, otp);

    res.json({
      success: true,
      message: 'Forgot password email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending forgot password email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send forgot password email',
      error: error.message
    });
  }
});

// API endpoint to send prescription email
app.post('/api/send-prescription', async (req, res) => {
  try {
    const { email, prescriptionData, withSign } = req.body;

    if (!email || !prescriptionData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, prescriptionData'
      });
    }

    let result;
    if (withSign) {
      result = await emailService.sendPrescriptionWithSignEmail(email, prescriptionData);
    } else {
      result = await emailService.sendPrescriptionWithoutSignEmail(email, prescriptionData);
    }

    res.json({
      success: true,
      message: `Prescription email ${withSign ? 'with' : 'without'} signature sent successfully!`,
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending prescription email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send prescription email',
      error: error.message
    });
  }
});

// API endpoint to send invoice email
app.post('/api/send-invoice', async (req, res) => {
  try {
    const { email, invoiceData } = req.body;

    if (!email || !invoiceData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, invoiceData'
      });
    }

    const result = await emailService.sendInvoiceEmail(email, invoiceData);

    res.json({
      success: true,
      message: 'Invoice email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send invoice email',
      error: error.message
    });
  }
});

// API endpoint to send token email
app.post('/api/send-token', async (req, res) => {
  try {
    const { email, patientName, doctorName, clinicName, prescriptionId, clinicData } = req.body;

    if (!email || !patientName || !prescriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, patientName, prescriptionId'
      });
    }

    const result = await emailService.sendTokenEmail(email, patientName, doctorName, clinicName, prescriptionId, clinicData);

    res.json({
      success: true,
      message: 'Token email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending token email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send token email',
      error: error.message
    });
  }
});

// Test connection endpoint
app.get('/api/test-connection', async (req, res) => {
  try {
    const connectionTest = await emailService.testConnection();
    res.json({
      success: connectionTest,
      message: connectionTest ? 'SMTP connection successful' : 'SMTP connection failed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: error.message
    });
  }
});

// Simple form to test email sending
app.get('/test-form', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Test Form</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .form-group { margin: 15px 0; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, button { padding: 10px; margin: 5px 0; }
        input[type="text"], input[type="email"] { width: 300px; }
        button { background-color: #1b3f6d; color: white; border: none; cursor: pointer; }
        button:hover { background-color: #16345a; }
        .result { margin-top: 20px; padding: 10px; border-radius: 5px; }
        .success { background-color: #d4edda; color: #155724; }
        .error { background-color: #f8d7da; color: #721c24; }
      </style>
    </head>
    <body>
      <h1>📧 Email Template Test Form</h1>
      <form id="emailForm">
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" name="email" value="test@example.com" required>
        </div>
        
        <div class="form-group">
          <label for="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" name="doctorName" value="Dr. John Smith" required>
        </div>
        
        <div class="form-group">
          <label for="loginUrl">Login URL:</label>
          <input type="text" id="loginUrl" name="loginUrl" value="https://app.sendscript.com/login" required>
        </div>
        
        <button type="submit">Send Test Email</button>
        <button type="button" onclick="testConnection()">Test Connection</button>
      </form>
      
      <div id="result"></div>
      
      <hr style="margin: 40px 0;">
      <h2>📱 Quick Actions</h2>
      <p><a href="index.html" target="_blank">View Email Template Preview</a></p>
      <p><a href="https://mailtrap.io/inboxes" target="_blank">Check Mailtrap Inbox</a></p>

      <script>
        document.getElementById('emailForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          
          try {
            const response = await fetch('/api/send-doctor-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            const resultDiv = document.getElementById('result');
            
            if (result.success) {
              resultDiv.innerHTML = '<div class="result success">✅ ' + result.message + '</div>';
            } else {
              resultDiv.innerHTML = '<div class="result error">❌ ' + result.message + '</div>';
            }
          } catch (error) {
            document.getElementById('result').innerHTML = '<div class="result error">❌ Network error: ' + error.message + '</div>';
          }
        });
        
        async function testConnection() {
          try {
            const response = await fetch('/api/test-connection');
            const result = await response.json();
            const resultDiv = document.getElementById('result');
            
            if (result.success) {
              resultDiv.innerHTML = '<div class="result success">✅ ' + result.message + '</div>';
            } else {
              resultDiv.innerHTML = '<div class="result error">❌ ' + result.message + '</div>';
            }
          } catch (error) {
            document.getElementById('result').innerHTML = '<div class="result error">❌ Connection test failed: ' + error.message + '</div>';
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Email testing server running at http://localhost:${port}`);
  console.log(`📧 Test form available at http://localhost:${port}/test-form`);
  console.log(`📱 Template preview at http://localhost:${port}/index.html`);
}); 