# 📧 SendScript Email Template System

A comprehensive email template system with Mailtrap SMTP integration for safe email testing and development.

## 🏗️ Project Structure

```
email-template/
├── 📁 src/
│   ├── 📁 templates/           # EJS email templates
│   │   ├── doctor-account-created.ejs
│   │   ├── pharmacy-verification.ejs
│   │   ├── forgot-password.ejs
│   │   ├── send-token.ejs
│   │   ├── sendto-unregister-pharmacy.ejs
│   │   ├── prescription-with-sign.ejs
│   │   ├── prescription-without-sign.ejs
│   │   ├── pharmacist-with-sign.ejs
│   │   └── invoice-generate.ejs
│   ├── 📁 services/           # Core email services
│   │   ├── email-service.js   # Main EmailService class
│   │   └── email-config.js    # SMTP configuration
│   ├── 📁 scripts/            # Testing and utility scripts
│   │   ├── test-all-templates.js
│   │   ├── individual-email-trigger.js
│   │   └── test-email.js
│   └── 📁 server/             # Express server
│       └── server-example.js
├── 📁 docs/                   # Documentation
│   ├── ALL_TEMPLATES_GUIDE.md
│   ├── INDIVIDUAL_EMAIL_TRIGGERS.md
│   └── MAILTRAP_SETUP.md
├── 📁 public/                 # Static web files
│   ├── index.html
│   └── styles.css
├── 📁 assets/                 # Image assets
│   ├── SS Logo png.png
│   └── Main Img.png
├── 📄 .env                    # Environment variables
├── 📄 package.json
├── 📄 .gitignore
└── 📄 README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Your `.env` file is already configured with Mailtrap credentials:
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=3da72511aa7730
SMTP_PASS=c3ad33357513bb
NODE_ENV=development
PORT=3000
```

### 3. Run Commands

#### Start Web Server
```bash
npm start
# Access at: http://localhost:3000
```

#### Test All Templates
```bash
npm run test-all
```

#### Interactive Email Trigger
```bash
npm run individual
```

#### Single Template Test
```bash
npm run test-email
```

## 📧 Available Templates

| Template | Purpose | Data Input |
|----------|---------|------------|
| 🏥 **Doctor Account Created** | Welcome new doctors | ✅ Custom |
| 🏪 **Pharmacy Verification** | OTP verification | ✅ Custom |
| 🔐 **Forgot Password** | Password reset | ✅ Custom |
| 📝 **Send Token** | Patient prescriptions | ✅ Custom |
| 🏥 **Unregister Pharmacy** | Pharmacy notifications | ✅ Custom |
| 📋 **Prescription With Sign** | Signed prescriptions | 🔄 Sample |
| 📋 **Prescription Without Sign** | Unsigned prescriptions | 🔄 Sample |
| 👨‍⚕️ **Pharmacist With Sign** | Pharmacist copies | 🔄 Sample |
| 🧾 **Invoice Generate** | Patient invoices | 🔄 Sample |

## 🎯 Usage Examples

### Command Line Testing
```bash
# Test specific templates
npm run test-all doctor
npm run test-all pharmacy
npm run test-all prescription
```

### Interactive Menu
```bash
npm run individual
# Follow the prompts to customize email data
```

### JavaScript Integration
```javascript
const EmailService = require('./src/services/email-service');
const emailService = new EmailService();

// Send doctor welcome email
await emailService.sendDoctorAccountCreatedEmail(
  'doctor@example.com',
  'Dr. John Smith',
  'https://app.sendscript.com/login'
);
```

### REST API
```bash
# Start server
npm start

# Send via API
curl -X POST http://localhost:3000/api/send-doctor-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "doctorName": "Dr. John Smith",
    "loginUrl": "https://app.sendscript.com/login"
  }'
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SMTP_HOST` | Mailtrap SMTP host | `sandbox.smtp.mailtrap.io` |
| `SMTP_PORT` | SMTP port | `2525` |
| `SMTP_USER` | SMTP username | `3da72511aa7730` |
| `SMTP_PASS` | SMTP password | `c3ad33357513bb` |
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |

## 📖 Documentation

- 📋 **[All Templates Guide](docs/ALL_TEMPLATES_GUIDE.md)** - Comprehensive template documentation
- 🎯 **[Individual Email Triggers](docs/INDIVIDUAL_EMAIL_TRIGGERS.md)** - Individual email triggering methods
- 📧 **[Mailtrap Setup](docs/MAILTRAP_SETUP.md)** - SMTP configuration guide

## 🌐 Web Interface

Visit `http://localhost:3000` after running `npm start`:

- **Template Preview**: `/index.html`
- **Test Form**: `/test-form`
- **API Test**: `/api/test-connection`

## 🎨 Development Workflow

### 1. Template Development
```bash
# Edit templates in src/templates/
# Preview at http://localhost:3000/index.html
```

### 2. Testing
```bash
# Test individual templates
npm run individual

# Test all templates
npm run test-all
```

### 3. Integration
```javascript
// Import and use in your application
const EmailService = require('./src/services/email-service');
```

## 🔍 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/test-connection` | GET | Test SMTP connection |
| `/api/send-doctor-email` | POST | Send doctor welcome |
| `/api/send-pharmacy-verification` | POST | Send OTP verification |
| `/api/send-forgot-password` | POST | Send password reset |
| `/api/send-token` | POST | Send prescription token |
| `/api/send-prescription` | POST | Send prescription |
| `/api/send-invoice` | POST | Send invoice |

## 🎊 Features

✅ **9 Email Templates** - All major email types  
✅ **5 Trigger Methods** - Command line, interactive, JavaScript, API, web  
✅ **Mailtrap Integration** - Safe testing environment  
✅ **Environment Variables** - Secure configuration  
✅ **Modern Structure** - Organized folder hierarchy  
✅ **Complete Documentation** - Guides and examples  
✅ **Production Ready** - Easy deployment integration  

## 🛠️ Troubleshooting

### SMTP Connection Issues
```bash
# Test connection
npm start
curl http://localhost:3000/api/test-connection
```

### Template Not Found
```bash
# Check template paths
ls -la src/templates/
```

### Missing Dependencies
```bash
# Reinstall packages
npm install
```

## 📚 Quick Commands Reference

```bash
# Development
npm start              # Start server
npm run individual     # Interactive email sender
npm run test-all       # Test all templates

# Testing specific templates
npm run test-all doctor
npm run test-all pharmacy
npm run test-all prescription

# Files structure
src/templates/         # Email templates
src/services/          # Core services
src/scripts/           # Testing scripts
src/server/            # Express server
docs/                  # Documentation
public/                # Static files
```

## 🎯 Next Steps

1. **Customize Templates** - Edit EJS files in `src/templates/`
2. **Add New Templates** - Update `src/services/email-config.js`
3. **Integrate with App** - Use `EmailService` class in your application
4. **Deploy** - Configure production SMTP settings
5. **Monitor** - Add logging and metrics

---

**Perfect for development, testing, and production email workflows!** 🚀

## 📞 Support

Check the documentation in the `docs/` folder for detailed guides and examples. 