# Booking & Scan Email Templates Guide

This guide covers the five new booking and scan-related email templates that have been added to the SendScript email system.

## Available Templates

### 1. Booking Confirmation with Invoice
**Template ID**: `bookingConfirmationWithInvoice`
**Purpose**: Sent when a scan booking is confirmed and payment is completed, includes invoice details
**File**: `src/backend-templates/email/booking_confirmation_with_invoice.ejs`

**Required Data Fields**:
```javascript
{
  patient_name: 'John Doe',
  scan_name: 'MRI Brain Scan',
  booking_date: '2024-02-15',
  booking_time: '14:30',
  center_name: 'SendScript Medical Centre',
  center_address: '123 Healthcare Street, London, SW1A 1AA',
  payment_status: 'Confirmed',
  booking_id: 'BK123456',
  invoice_number: 'INV789012'
}
```

### 2. Booking Invoice Resend
**Template ID**: `bookingInvoiceResend`
**Purpose**: Sent when a patient requests a copy of their booking invoice
**File**: `src/backend-templates/email/booking_invoice_resend.ejs`

**Required Data Fields**:
```javascript
{
  patient_name: 'John Doe',
  scan_name: 'MRI Brain Scan',
  invoice_number: 'INV789012',
  booking_date: '2024-02-15',
  booking_time: '14:30',
  amount_paid: '£250.00',
  booking_id: 'BK123456'
}
```

### 3. Booking Rescheduled
**Template ID**: `bookingRescheduled`
**Purpose**: Sent when a scan booking is rescheduled to a new date/time
**File**: `src/backend-templates/email/booking_rescheduled.ejs`

**Required Data Fields**:
```javascript
{
  patient_name: 'John Doe',
  scan_name: 'MRI Brain Scan',
  new_date: '2024-02-20',
  new_time: '10:00',
  center_name: 'SendScript Medical Centre',
  center_address: '123 Healthcare Street, London, SW1A 1AA',
  booking_id: 'BK123456',
  old_date: '2024-02-15',      // Optional
  old_time: '14:30'            // Optional
}
```

### 4. Payment Link Resend
**Template ID**: `paymentLinkResend`
**Purpose**: Sent when a payment reminder is needed for a pending booking
**File**: `src/backend-templates/email/payment_link_resend.ejs`

**Required Data Fields**:
```javascript
{
  patient_name: 'John Doe',
  scan_name: 'MRI Brain Scan',
  booking_date: '2024-02-15',
  booking_time: '14:30',
  payment_link: 'https://payments.sendscript.com/pay/BK123456',
  booking_amount: '£250.00',
  booking_id: 'BK123456',
  center_name: 'SendScript Medical Centre',
  center_address: '123 Healthcare Street, London, SW1A 1AA'
}
```

### 5. Scan Slot Reserved
**Template ID**: `scanSlotReserved`
**Purpose**: Sent when a scan slot is temporarily reserved, requiring payment to confirm
**File**: `src/backend-templates/email/scan_slot_reserved.ejs`

**Required Data Fields**:
```javascript
{
  patient_name: 'John Doe',
  scan_name: 'MRI Brain Scan',
  booking_date: '2024-02-15',
  booking_time: '14:30',
  center_name: 'SendScript Medical Centre',
  center_address: '123 Healthcare Street, London, SW1A 1AA',
  complete_payment_url: 'https://payments.sendscript.com/complete/BK123456',
  booking_amount: '£250.00',
  booking_id: 'BK123456',
  reservation_expires: '30 minutes'    // Optional
}
```

## Usage Examples

### Using EmailService Class

```javascript
const EmailService = require('./src/services/email-service');

const emailService = new EmailService();

// Send booking confirmation with invoice
await emailService.sendBookingConfirmationWithInvoiceEmail(
  'patient@example.com',
  {
    patient_name: 'John Doe',
    scan_name: 'MRI Brain Scan',
    booking_date: '2024-02-15',
    booking_time: '14:30',
    center_name: 'SendScript Medical Centre',
    center_address: '123 Healthcare Street, London, SW1A 1AA',
    payment_status: 'Confirmed',
    booking_id: 'BK123456',
    invoice_number: 'INV789012'
  }
);

// Send payment link resend
await emailService.sendPaymentLinkResendEmail(
  'patient@example.com',
  {
    patient_name: 'John Doe',
    scan_name: 'MRI Brain Scan',
    booking_date: '2024-02-15',
    booking_time: '14:30',
    payment_link: 'https://payments.sendscript.com/pay/BK123456',
    booking_amount: '£250.00',
    booking_id: 'BK123456',
    center_name: 'SendScript Medical Centre',
    center_address: '123 Healthcare Street, London, SW1A 1AA'
  }
);
```

## Testing

### Test All Booking Templates
```bash
# Test all booking templates
node src/scripts/test-booking-templates.js

# Test booking category only
node src/scripts/test-all-templates.js booking

# Test individual templates interactively
node src/scripts/individual-email-trigger.js
# Select options 38-42 for booking templates
```

### Available Test Scripts

1. **Individual Template Trigger**: `src/scripts/individual-email-trigger.js`
   - Template options 38-42 for booking templates
   - Interactive prompts for all required fields

2. **Booking Templates Test**: `src/scripts/test-booking-templates.js`
   - Tests all 5 booking templates with sample data
   - Quick validation of template functionality

3. **All Templates Test**: `src/scripts/test-all-templates.js`
   - Use `node test-all-templates.js booking` to test booking category
   - Includes booking templates in comprehensive testing

## Template Features

### Common Features
- **Responsive Design**: All templates work on desktop and mobile devices
- **Mailtrap Compatible**: Safe testing with Mailtrap SMTP
- **EJS Templating**: Dynamic content rendering with EJS
- **Professional Styling**: Consistent branding with SendScript design

### Template-Specific Features

**Booking Confirmation with Invoice**:
- Includes complete booking details
- Shows payment status
- Attached invoice information
- Appointment instructions

**Booking Invoice Resend**:
- Simplified invoice-focused layout
- Clear payment information
- Support contact details

**Booking Rescheduled**:
- Highlights new appointment details
- Optional old appointment information
- Payment validity notice
- Clear appointment instructions

**Payment Link Resend**:
- Prominent payment button
- Booking details reminder
- Payment urgency messaging
- Clear call-to-action

**Scan Slot Reserved**:
- Reservation confirmation
- Payment deadline (if provided)
- Complete payment button
- Booking details
- Instructions for completion

## Configuration

The templates are automatically configured in:
- `src/services/email-config.js` - Template paths and subjects
- `src/services/email-service.js` - Email service methods
- Template files in `src/backend-templates/email/`

## Troubleshooting

### Common Issues

1. **Template Not Found**: Ensure template files exist in `src/backend-templates/email/`
2. **Missing Data Fields**: Check that all required fields are provided
3. **SMTP Connection**: Verify Mailtrap credentials in environment variables
4. **Styling Issues**: Templates use inline CSS for email client compatibility

### Environment Variables
```bash
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_password
```

## Support

For issues or questions regarding the booking templates:
1. Check the error messages for missing required fields
2. Test with the provided test scripts
3. Verify SMTP configuration
4. Ensure template files are in the correct location
