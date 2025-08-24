#!/usr/bin/env node

const EmailService = require('../services/email-service');

async function testBookingTemplates() {
  console.log('🏥 Testing Booking & Scan Email Templates...\n');
  
  const emailService = new EmailService();
  
  // Test connection first
  console.log('📡 Testing SMTP connection...');
  const connectionTest = await emailService.testConnection();
  
  if (!connectionTest) {
    console.log('❌ SMTP connection failed. Please check your credentials.');
    return;
  }
  
  const testEmail = 'patient@example.com';
  
  try {
    // 1. Test Booking Confirmation with Invoice
    console.log('📧 Testing Booking Confirmation with Invoice...');
    await emailService.sendBookingConfirmationWithInvoiceEmail(testEmail, {
      patient_name: 'John Doe',
      scan_name: 'MRI Brain Scan',
      booking_date: '2024-02-15',
      booking_time: '14:30',
      center_name: 'SendScript Medical Centre',
      center_address: '123 Healthcare Street, London, SW1A 1AA',
      payment_status: 'Confirmed',
      booking_id: 'BK123456',
      invoice_number: 'INV789012'
    });
    console.log('✅ Booking Confirmation with Invoice sent successfully!\n');
    
    // 2. Test Booking Invoice Resend
    console.log('📧 Testing Booking Invoice Resend...');
    await emailService.sendBookingInvoiceResendEmail(testEmail, {
      patient_name: 'John Doe',
      scan_name: 'MRI Brain Scan',
      invoice_number: 'INV789012',
      booking_date: '2024-02-15',
      booking_time: '14:30',
      amount_paid: '£250.00',
      booking_id: 'BK123456'
    });
    console.log('✅ Booking Invoice Resend sent successfully!\n');
    
    // 3. Test Booking Rescheduled
    console.log('📧 Testing Booking Rescheduled...');
    await emailService.sendBookingRescheduledEmail(testEmail, {
      patient_name: 'John Doe',
      scan_name: 'MRI Brain Scan',
      new_date: '2024-02-20',
      new_time: '10:00',
      center_name: 'SendScript Medical Centre',
      center_address: '123 Healthcare Street, London, SW1A 1AA',
      booking_id: 'BK123456',
      old_date: '2024-02-15',
      old_time: '14:30'
    });
    console.log('✅ Booking Rescheduled sent successfully!\n');
    
    // 4. Test Payment Link Resend
    console.log('📧 Testing Payment Link Resend...');
    await emailService.sendPaymentLinkResendEmail(testEmail, {
      patient_name: 'John Doe',
      scan_name: 'MRI Brain Scan',
      booking_date: '2024-02-15',
      booking_time: '14:30',
      payment_link: 'https://payments.sendscript.com/pay/BK123456',
      booking_amount: '£250.00',
      booking_id: 'BK123456',
      center_name: 'SendScript Medical Centre',
      center_address: '123 Healthcare Street, London, SW1A 1AA'
    });
    console.log('✅ Payment Link Resend sent successfully!\n');
    
    // 5. Test Scan Slot Reserved
    console.log('📧 Testing Scan Slot Reserved...');
    await emailService.sendScanSlotReservedEmail(testEmail, {
      patient_name: 'John Doe',
      scan_name: 'MRI Brain Scan',
      booking_date: '2024-02-15',
      booking_time: '14:30',
      center_name: 'SendScript Medical Centre',
      center_address: '123 Healthcare Street, London, SW1A 1AA',
      complete_payment_url: 'https://payments.sendscript.com/complete/BK123456',
      booking_amount: '£250.00',
      booking_id: 'BK123456',
      reservation_expires: '30 minutes'
    });
    console.log('✅ Scan Slot Reserved sent successfully!\n');
    
    console.log('🎉 All booking template tests completed successfully!');
    console.log('🌐 Check your Mailtrap inbox: https://mailtrap.io/inboxes');
    
  } catch (error) {
    console.error('❌ Error testing booking templates:', error.message);
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Test interrupted!');
  process.exit(0);
});

testBookingTemplates().catch(console.error);
