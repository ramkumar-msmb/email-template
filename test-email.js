#!/usr/bin/env node

const EmailService = require('./email-service');

async function testEmailSending() {
  console.log('🚀 Starting Email Template Test...\n');

  const emailService = new EmailService();

  // Test SMTP connection first
  console.log('📡 Testing SMTP connection...');
  const connectionTest = await emailService.testConnection();
  
  if (!connectionTest) {
    console.log('❌ SMTP connection failed. Please check your credentials.');
    process.exit(1);
  }

  console.log('\n📨 Sending test email...\n');

  try {
    // Test data for the email template
    const testData = {
      doctorEmail: 'test-doctor@example.com',
      doctorName: 'Dr. Jane Smith',
      loginUrl: 'https://app.sendscript.com/login'
    };

    // Send the email
    const result = await emailService.sendDoctorAccountCreatedEmail(
      testData.doctorEmail,
      testData.doctorName,
      testData.loginUrl
    );

    console.log('\n🎉 Test completed successfully!');
    console.log('📋 Email Details:');
    console.log(`   To: ${testData.doctorEmail}`);
    console.log(`   Doctor Name: ${testData.doctorName}`);
    console.log(`   Login URL: ${testData.loginUrl}`);
    console.log('\n💡 Check your Mailtrap inbox to see the email!');
    console.log('🌐 Visit: https://mailtrap.io/inboxes');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Function to test with custom data
async function testWithCustomData(email, doctorName, loginUrl) {
  console.log('🚀 Sending custom email test...\n');

  const emailService = new EmailService();

  try {
    await emailService.sendDoctorAccountCreatedEmail(email, doctorName, loginUrl);
    console.log('\n✅ Custom email sent successfully!');
  } catch (error) {
    console.error('\n❌ Failed to send custom email:', error.message);
  }
}

// Check if custom parameters are provided
const args = process.argv.slice(2);

if (args.length === 3) {
  // Custom test with provided parameters
  const [email, doctorName, loginUrl] = args;
  testWithCustomData(email, doctorName, loginUrl);
} else if (args.length === 0) {
  // Default test
  testEmailSending();
} else {
  console.log('📖 Usage:');
  console.log('  npm run test                                    # Run with default test data');
  console.log('  node test-email.js                             # Run with default test data');
  console.log('  node test-email.js <email> <doctorName> <url>  # Run with custom data');
  console.log('\n📝 Examples:');
  console.log('  node test-email.js john@example.com "Dr. John Doe" "https://app.sendscript.com/login"');
} 