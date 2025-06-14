# 📧 Mailtrap SMTP Email Testing Setup

This setup integrates your EJS email template with Mailtrap SMTP for safe email testing in development.

## 🔧 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Configuration
Your Mailtrap credentials are already configured in `email-config.js`:
- **Host**: sandbox.smtp.mailtrap.io
- **Port**: 2525
- **Username**: 3da72511aa7730
- **Password**: c3ad33357513bb

## 🚀 Quick Start

### Method 1: Command Line Testing
```bash
# Test with default data
npm test

# Or directly with Node
node test-email.js

# Test with custom data
node test-email.js "doctor@example.com" "Dr. Custom Name" "https://custom-login.com"
```

### Method 2: Web Server Testing
```bash
# Start the test server
npm start

# Or
npm run server
```

Then visit:
- **Test Form**: http://localhost:3000/test-form
- **Template Preview**: http://localhost:3000/index.html
- **API Test**: http://localhost:3000/api/test-connection

## 📁 Project Structure

```
├── doctor-account-created.ejs    # Original EJS template
├── index.html                    # HTML preview version
├── styles.css                    # Separated CSS for editing
├── email-config.js               # Mailtrap SMTP configuration
├── email-service.js              # Email service class
├── test-email.js                 # Command-line testing script
├── server-example.js             # Web server example
├── package.json                  # Dependencies and scripts
└── MAILTRAP_SETUP.md            # This guide
```

## 🛠️ How It Works

### Email Service (`email-service.js`)
- **EmailService Class**: Handles all email operations
- **Template Rendering**: Uses EJS to render templates with dynamic data
- **SMTP Integration**: Connects to Mailtrap for safe email testing
- **Error Handling**: Comprehensive error handling and logging

### Key Methods:
```javascript
// Test SMTP connection
await emailService.testConnection();

// Send doctor account created email
await emailService.sendDoctorAccountCreatedEmail(
  'doctor@example.com',
  'Dr. John Smith',
  'https://app.sendscript.com/login'
);

// Send any template email
await emailService.sendTemplateEmail(
  'doctorAccountCreated',
  'recipient@example.com',
  templateData
);
```

## 🎯 Testing Options

### 1. Command Line Testing
Best for quick tests and CI/CD integration:
```bash
# Default test
npm test

# Custom parameters
node test-email.js "test@example.com" "Dr. Test" "https://login.url"
```

### 2. Web Interface Testing
Best for interactive testing and demonstrations:
1. Start server: `npm start`
2. Open: http://localhost:3000/test-form
3. Fill form and send test emails
4. View results instantly

### 3. API Integration
Use the REST API in your applications:

```javascript
// POST /api/send-doctor-email
const response = await fetch('/api/send-doctor-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'doctor@example.com',
    doctorName: 'Dr. John Smith',
    loginUrl: 'https://app.sendscript.com/login'
  })
});
```

## 📨 Email Template Variables

The EJS template uses these variables:
- `doctor_name` - Doctor's full name
- `login_url` - Login URL for the platform

## 🔍 Viewing Test Emails

After sending emails:
1. Go to [Mailtrap Inbox](https://mailtrap.io/inboxes)
2. Log into your Mailtrap account
3. Check the "Email Testing" inbox
4. View HTML, text, and raw versions
5. Check spam score and email client previews

## 🎨 Design Development Workflow

1. **Edit Design**: Modify `styles.css` and `index.html`
2. **Preview**: Open `index.html` in browser
3. **Test Email**: Send test email via command line or web form
4. **Check Result**: View in Mailtrap inbox
5. **Update EJS**: Apply changes to `doctor-account-created.ejs`

## 🔄 Converting HTML Back to EJS

When you're satisfied with your design:

### Replace Static Content:
```html
<!-- HTML version -->
<p>Dear Dr. John Smith</p>

<!-- EJS version -->
<p>Dear Dr. <%= doctor_name %></p>
```

### Handle URLs:
```html
<!-- HTML version -->
<a href="https://app.sendscript.com/login">Login Here</a>

<!-- EJS version -->
<a href="<%= login_url %>">Login Here</a>
```

## 🚨 Troubleshooting

### Connection Issues
```bash
# Test SMTP connection
curl http://localhost:3000/api/test-connection
```

### Common Problems:
1. **Port Issues**: Try ports 25, 465, 587, or 2525
2. **Firewall**: Ensure outbound SMTP ports are open
3. **Credentials**: Double-check username/password
4. **TLS**: Connection uses STARTTLS (optional)

### Debug Mode:
Add console logs in `email-service.js` for detailed debugging.

## 📊 Email Testing Best Practices

1. **Test Different Data**: Try various doctor names and URLs
2. **Check All Clients**: Use Mailtrap's client preview feature
3. **Validate HTML**: Check HTML structure and CSS compatibility
4. **Mobile Testing**: Ensure responsive design works
5. **Spam Score**: Monitor spam score in Mailtrap
6. **Load Testing**: Test with multiple concurrent emails

## 🔒 Security Notes

- Mailtrap credentials are for development only
- Never use test credentials in production
- Emails are captured, not delivered to real recipients
- Safe for testing without risk of spamming users

## 📈 Next Steps

1. **Integration**: Add this service to your main application
2. **Templates**: Create additional email templates
3. **Styling**: Enhance email design for better compatibility
4. **Production**: Set up real SMTP for production use
5. **Testing**: Add automated email testing to your CI/CD pipeline

## 💡 Pro Tips

- Use Mailtrap's HTML/CSS checker for email client compatibility
- Test with different content lengths
- Use Mailtrap's API for automated testing
- Keep email templates simple for better client support
- Always test in multiple email clients before production 