# 🏗️ Project Structure Documentation

## 📁 Folder Organization

This document explains the organized folder structure of the SendScript Email Template System.

### 🎯 Structure Overview

```
email-template/
├── 📁 src/                    # Source code
│   ├── 📁 templates/          # EJS email templates
│   ├── 📁 services/           # Core email services
│   ├── 📁 scripts/            # Testing and utility scripts
│   └── 📁 server/             # Express server
├── 📁 docs/                   # Documentation
├── 📁 public/                 # Static web files
├── 📁 assets/                 # Image assets
├── 📄 .env                    # Environment variables
├── 📄 package.json           # Dependencies and scripts
├── 📄 .gitignore             # Git ignore rules
└── 📄 README.md              # Main documentation
```

## 📂 Detailed Folder Structure

### `/src/` - Source Code Directory

#### `/src/templates/` - Email Templates
Contains all EJS email templates:

```
templates/
├── doctor-account-created.ejs      # Doctor welcome email
├── pharmacy-verification.ejs       # OTP verification
├── forgot-password.ejs             # Password reset
├── send-token.ejs                  # Patient prescription tokens
├── sendto-unregister-pharmacy.ejs  # Unregistered pharmacy notifications
├── prescription-with-sign.ejs      # Signed prescriptions
├── prescription-without-sign.ejs   # Unsigned prescriptions
├── pharmacist-with-sign.ejs        # Pharmacist copies
└── invoice-generate.ejs            # Patient invoices
```

**Purpose**: All email templates are stored here with proper naming conventions.

#### `/src/services/` - Core Services
Business logic and configuration:

```
services/
├── email-service.js    # Main EmailService class
└── email-config.js     # SMTP configuration and template paths
```

**Purpose**: 
- `email-service.js`: Core email functionality, template rendering, sending
- `email-config.js`: SMTP settings, template configurations, environment variables

#### `/src/scripts/` - Testing Scripts
Utility scripts for testing and development:

```
scripts/
├── test-all-templates.js          # Test all templates with sample data
├── individual-email-trigger.js    # Interactive email sender
└── test-email.js                  # Simple email testing
```

**Purpose**: Various testing methods for development and debugging.

#### `/src/server/` - Express Server
Web server and API endpoints:

```
server/
└── server-example.js    # Express server with REST API
```

**Purpose**: Provides web interface and REST API for email sending.

### `/docs/` - Documentation
Comprehensive documentation:

```
docs/
├── ALL_TEMPLATES_GUIDE.md           # Complete template documentation
├── INDIVIDUAL_EMAIL_TRIGGERS.md     # Individual triggering methods
├── MAILTRAP_SETUP.md               # SMTP setup guide
└── PROJECT_STRUCTURE.md            # This file
```

**Purpose**: All documentation and guides for the project.

### `/public/` - Static Web Files
Browser-accessible files:

```
public/
├── index.html    # Template preview page
└── styles.css    # Styling for web preview
```

**Purpose**: Static files served by the Express server.

### `/assets/` - Image Assets
Image files used in templates:

```
assets/
├── SS Logo png.png    # SendScript logo
└── Main Img.png       # Main banner image
```

**Purpose**: Images referenced in email templates.

## 🔧 Configuration Files

### `.env` - Environment Variables
```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=3da72511aa7730
SMTP_PASS=c3ad33357513bb
NODE_ENV=development
PORT=3000
```

**Purpose**: Secure storage of sensitive configuration data.

### `package.json` - Project Configuration
```json
{
  "name": "email-template-system",
  "scripts": {
    "start": "node src/server/server-example.js",
    "test-all": "node src/scripts/test-all-templates.js",
    "individual": "node src/scripts/individual-email-trigger.js",
    "test-email": "node src/scripts/test-email.js"
  }
}
```

**Purpose**: Project metadata, dependencies, and npm scripts.

## 🚀 Path Updates Made

### Updated Import Paths

#### Scripts → Services
```javascript
// Before: require('./email-service')
// After:  require('../services/email-service')
```

#### Config → Templates
```javascript
// Before: './doctor-account-created.ejs'
// After:  path.join(__dirname, '../templates/doctor-account-created.ejs')
```

#### Server → Static Files
```javascript
// Before: express.static('.')
// After:  express.static(path.join(__dirname, '../../public'))
```

### Updated NPM Scripts
```json
{
  "start": "node src/server/server-example.js",
  "test-all": "node src/scripts/test-all-templates.js",
  "individual": "node src/scripts/individual-email-trigger.js",
  "test-email": "node src/scripts/test-email.js"
}
```

## 📁 File Migration Summary

### Moved Files

| Original Location | New Location | Purpose |
|-------------------|--------------|---------|
| `*.ejs` | `src/templates/` | Email templates |
| `email-service.js` | `src/services/` | Core service |
| `email-config.js` | `src/services/` | Configuration |
| `test-*.js` | `src/scripts/` | Testing scripts |
| `individual-*.js` | `src/scripts/` | Interactive scripts |
| `server-example.js` | `src/server/` | Express server |
| `*.md` (guides) | `docs/` | Documentation |
| `index.html` | `public/` | Web preview |
| `styles.css` | `public/` | Web styling |
| `*.png` | `assets/` | Image assets |

### New Files Created

| File | Purpose |
|------|---------|
| `.env` | Environment variables |
| `docs/PROJECT_STRUCTURE.md` | This documentation |
| Updated `README.md` | Main project documentation |
| Updated `package.json` | Project configuration |

## 🎯 Benefits of This Structure

### ✅ Organization
- **Clear separation of concerns**
- **Logical grouping of related files**
- **Easy navigation and maintenance**

### ✅ Scalability
- **Easy to add new templates**
- **Clear place for new services**
- **Organized documentation**

### ✅ Security
- **Environment variables in .env**
- **Proper gitignore configuration**
- **Separated configuration from code**

### ✅ Development Experience
- **Intuitive folder structure**
- **Updated npm scripts**
- **Clear import paths**

### ✅ Deployment Ready
- **Environment-based configuration**
- **Proper file organization**
- **Documentation included**

## 🔍 Quick Navigation

### Development Tasks
```bash
# Edit templates
src/templates/

# Modify services
src/services/

# Run tests
npm run test-all
npm run individual

# Start server
npm start
```

### File Locations
```bash
# Email templates
src/templates/*.ejs

# Core services
src/services/email-service.js
src/services/email-config.js

# Testing scripts
src/scripts/

# Documentation
docs/

# Web files
public/
```

## 🎊 Migration Complete

The project has been successfully reorganized with:

✅ **Proper folder structure**  
✅ **Updated import paths**  
✅ **Environment variables**  
✅ **Comprehensive documentation**  
✅ **Maintained functionality**  

All existing functionality remains intact while providing a much cleaner and more maintainable codebase structure! 