# 🔧 Developer Guide: Understanding Code Structure & Adding Email Templates

This guide explains the code structure of the SendScript Email Template System and provides detailed instructions for adding new email templates.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Services Directory (`/src/services/`)](#services-directory-srcservices)
3. [Scripts Directory (`/src/scripts/`)](#scripts-directory-srcscripts)
4. [Server Directory (`/src/server/`)](#server-directory-srcserver)
5. [Adding New Email Templates](#adding-new-email-templates)
6. [Testing New Templates](#testing-new-templates)

## 🏗️ Architecture Overview

The email template system follows a modular architecture:

```
📁 src/
├── 📁 services/     # Core business logic
├── 📁 scripts/      # Testing and utility tools
├── 📁 server/       # REST API and web interface
└── 📁 templates/    # EJS email templates
```

**Data Flow**:
```
EJS Template → EmailService → SMTP (Mailtrap) → Email Inbox
     ↑              ↑              ↑
Configuration   Business Logic   Transport
```

## 📁 Services Directory (`/src/services/`)

### 🔧 `email-config.js` - Configuration Hub

**Purpose**: Central configuration for SMTP settings and email template registry.

**Key Components**:

#### 1. **SMTP Configuration**
```javascript
const mailtrapConfig = {
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.SMTP_PORT || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '3da72511aa7730',
    pass: process.env.SMTP_PASS || 'c3ad33357513bb'
  }
};
```

#### 2. **Email Templates Registry**
```javascript
const emailTemplates = {
  templateKey: {
    templatePath: path.join(__dirname, '../templates/template-file.ejs'),
    subject: 'Email Subject Line'
  }
};
```

**To Add New Template**:
```javascript
// Add to emailTemplates object
newUserWelcome: {
  templatePath: path.join(__dirname, '../templates/new-user-welcome.ejs'),
  subject: 'Welcome to Our Platform!'
}
```

### 📧 `email-service.js` - Main Email Service Class

**Purpose**: Core service class handling email rendering, sending, and business logic.

**Key Methods**:

#### 1. **`renderTemplate(templatePath, data)`**
Renders EJS templates with provided data.

#### 2. **`sendTemplateEmail(templateName, recipientEmail, templateData)`**
Generic email sending method used by all specific template methods.

#### 3. **Template-Specific Methods**
Each email template has a dedicated method:

```javascript
// Pattern for template methods
async sendTemplateNameEmail(recipientEmail, ...parameters) {
  const templateData = {
    variable1: parameters[0],
    variable2: parameters[1]
  };

  return this.sendTemplateEmail('templateKey', recipientEmail, templateData);
}
```

**Example**:
```javascript
async sendDoctorAccountCreatedEmail(doctorEmail, doctorName, loginUrl) {
  const templateData = {
    doctor_name: doctorName,
    login_url: loginUrl
  };
  return this.sendTemplateEmail('doctorAccountCreated', doctorEmail, templateData);
}
```

## 📁 Scripts Directory (`/src/scripts/`)

### 🧪 `test-all-templates.js` - Batch Template Testing

**Purpose**: Comprehensive testing script for all email templates with predefined sample data.

**Key Components**:

#### 1. **Sample Data Structure**
```javascript
const sampleData = {
  templateKey: {
    email: 'recipient@example.com',
    data: {
      variable1: 'value1',
      variable2: 'value2'
    }
  }
};
```

#### 2. **Testing Functions**
- `testAllTemplates()` - Tests all templates in sequence
- `testSpecificTemplate(templateName)` - Tests individual templates

**To Add New Template**:

1. **Add Sample Data**:
```javascript
const sampleData = {
  // ... existing data
  newTemplate: {
    email: 'test@example.com',
    data: {
      param1: 'test value 1',
      param2: 'test value 2'
    }
  }
};
```

2. **Add to Templates Array**:
```javascript
const templates = [
  // ... existing templates
  {
    name: 'New Template',
    method: 'sendNewTemplateEmail',
    args: [
      sampleData.newTemplate.email,
      sampleData.newTemplate.data.param1,
      sampleData.newTemplate.data.param2
    ]
  }
];
```

3. **Add Switch Case**:
```javascript
switch (templateName.toLowerCase()) {
  // ... existing cases
  case 'newtemplate':
    await emailService.sendNewTemplateEmail(/* args */);
    console.log('✅ new template sent successfully!');
    break;
}
```

### 🎮 `individual-email-trigger.js` - Interactive Email Sender

**Purpose**: Interactive command-line tool for sending emails with custom user input.

**Key Components**:

#### 1. **Template Configuration System**
```javascript
const templateConfigs = {
  templateNumber: {
    name: 'Template Display Name',
    method: 'emailServiceMethodName',
    fields: [
      { 
        name: 'fieldName', 
        prompt: 'User prompt text: ', 
        required: true/false,
        default: 'default value' // optional
      }
    ]
  }
};
```

**To Add New Template**:

1. **Add Template Configuration**:
```javascript
const templateConfigs = {
  // ... existing configs
  6: { // Next available number
    name: 'New User Welcome',
    method: 'sendNewUserWelcomeEmail',
    fields: [
      { name: 'email', prompt: 'Enter user email: ', required: true },
      { name: 'firstName', prompt: 'Enter first name: ', required: true },
      { name: 'lastName', prompt: 'Enter last name: ', required: false, default: '' }
    ]
  }
};
```

2. **Update Menu Display**:
```javascript
console.log('6. New User Welcome');
```

3. **Add Email Sending Case**:
```javascript
switch (templateChoice) {
  // ... existing cases
  case '6':
    result = await emailService.sendNewUserWelcomeEmail(
      userData.email,
      userData.firstName,
      userData.lastName
    );
    break;
}
```

### 🚀 `test-email.js` - Simple Email Test

**Purpose**: Quick and simple email testing script.

**Features**:
- Basic template testing
- Command line parameter support
- Custom data testing

## 📁 Server Directory (`/src/server/`)

### 🌐 `server-example.js` - REST API & Web Interface

**Purpose**: Express.js server providing REST API endpoints and web interface.

**API Endpoint Pattern**:
```javascript
app.post('/api/send-template-name', async (req, res) => {
  try {
    // 1. Extract parameters from request body
    const { email, param1, param2 } = req.body;

    // 2. Validate required fields
    if (!email || !param1) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, param1'
      });
    }

    // 3. Call email service method
    const result = await emailService.sendTemplateEmail(email, param1, param2);

    // 4. Return success response
    res.json({
      success: true,
      message: 'Email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    // 5. Handle errors
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});
```

## 🎯 Adding New Email Templates

### **Complete Step-by-Step Guide**

#### **Step 1: Create the EJS Template**
```bash
# Create new template file
touch src/templates/new-user-welcome.ejs
```

**Template Structure**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Our Platform</title>
    <style>/* Your styles */</style>
</head>
<body>
    <h1>Welcome <%= firstName %>!</h1>
    <p>Hello <%= firstName %> <%= lastName %>,</p>
    <p><%= welcomeMessage %></p>
</body>
</html>
```

#### **Step 2: Register Template** (`src/services/email-config.js`)
```javascript
const emailTemplates = {
  // ... existing templates
  newUserWelcome: {
    templatePath: path.join(__dirname, '../templates/new-user-welcome.ejs'),
    subject: 'Welcome to Our Platform!'
  }
};
```

#### **Step 3: Add Service Method** (`src/services/email-service.js`)
```javascript
// Add to EmailService class
async sendNewUserWelcomeEmail(recipientEmail, firstName, lastName = '', welcomeMessage = 'Welcome!') {
  const templateData = {
    firstName: firstName,
    lastName: lastName,
    welcomeMessage: welcomeMessage
  };

  return this.sendTemplateEmail('newUserWelcome', recipientEmail, templateData);
}
```

#### **Step 4: Update Testing Scripts**

**A. Update `test-all-templates.js`**:
```javascript
// Add sample data
const sampleData = {
  // ... existing data
  newUserWelcome: {
    email: 'newuser@example.com',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      welcomeMessage: 'Welcome to our amazing platform!'
    }
  }
};

// Add to templates array in testAllTemplates()
const templates = [
  // ... existing templates
  {
    name: 'New User Welcome',
    method: 'sendNewUserWelcomeEmail',
    args: [
      sampleData.newUserWelcome.email,
      sampleData.newUserWelcome.data.firstName,
      sampleData.newUserWelcome.data.lastName,
      sampleData.newUserWelcome.data.welcomeMessage
    ]
  }
];

// Add switch case in testSpecificTemplate()
switch (templateName.toLowerCase()) {
  // ... existing cases
  case 'newuser':
  case 'welcome':
    await emailService.sendNewUserWelcomeEmail(
      sampleData.newUserWelcome.email,
      sampleData.newUserWelcome.data.firstName,
      sampleData.newUserWelcome.data.lastName,
      sampleData.newUserWelcome.data.welcomeMessage
    );
    console.log('✅ new user welcome template sent successfully!');
    break;
}
```

**B. Update `individual-email-trigger.js`**:
```javascript
// Add template configuration
const templateConfigs = {
  // ... existing configs
  6: {
    name: 'New User Welcome',
    method: 'sendNewUserWelcomeEmail',
    fields: [
      { name: 'email', prompt: 'Enter user email: ', required: true },
      { name: 'firstName', prompt: 'Enter first name: ', required: true },
      { name: 'lastName', prompt: 'Enter last name: ', required: false, default: '' },
      { name: 'welcomeMessage', prompt: 'Enter welcome message: ', required: false, default: 'Welcome!' }
    ]
  }
};

// Update showMenu()
console.log('6. New User Welcome');

// Add sendEmail() case
switch (templateChoice) {
  // ... existing cases
  case '6':
    result = await emailService.sendNewUserWelcomeEmail(
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.welcomeMessage
    );
    break;
}

// Update choice validation in main()
if (choice >= '1' && choice <= '6') {
  // ... existing logic
}
```

#### **Step 5: Add API Endpoint** (`src/server/server-example.js`)
```javascript
app.post('/api/send-new-user-welcome', async (req, res) => {
  try {
    const { email, firstName, lastName, welcomeMessage } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, firstName'
      });
    }

    const result = await emailService.sendNewUserWelcomeEmail(
      email, 
      firstName, 
      lastName, 
      welcomeMessage
    );

    res.json({
      success: true,
      message: 'New user welcome email sent successfully!',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending new user welcome email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send new user welcome email',
      error: error.message
    });
  }
});
```

## 🧪 Testing New Templates

### **Development Testing Workflow**
```bash
# Step 1: Test SMTP connection
npm start
curl http://localhost:3000/api/test-connection

# Step 2: Test with sample data
npm run test-all newuser

# Step 3: Test with custom data
npm run individual

# Step 4: Test API endpoint
curl -X POST http://localhost:3000/api/send-new-user-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "welcomeMessage": "Welcome to our platform!"
  }'
```

### **Testing Checklist**

#### **Template Validation**
- ✅ EJS syntax is correct
- ✅ All variables are properly escaped
- ✅ HTML structure is valid
- ✅ Styling renders correctly

#### **Data Handling**
- ✅ Required parameters are validated
- ✅ Optional parameters have defaults
- ✅ Data types are handled correctly

#### **Integration Testing**
- ✅ Service method works correctly
- ✅ API endpoint accepts requests
- ✅ Error handling functions properly
- ✅ SMTP sending works

## ✅ Best Practices

### **1. Template Organization**
```javascript
// ✅ Good: Descriptive template keys
const emailTemplates = {
  userWelcome: { /* config */ },
  passwordReset: { /* config */ },
  orderConfirmation: { /* config */ }
};
```

### **2. Parameter Validation**
```javascript
// ✅ Good: Validate required parameters
async sendWelcomeEmail(email, name, loginUrl) {
  if (!email || !name || !loginUrl) {
    throw new Error('Missing required parameters: email, name, loginUrl');
  }
  // ... rest of method
}
```

### **3. Error Handling**
```javascript
// ✅ Good: Comprehensive error handling
try {
  const result = await this.sendTemplateEmail(templateName, email, data);
  console.log(`✅ ${templateName} email sent successfully to ${email}`);
  return result;
} catch (error) {
  console.error(`❌ Failed to send ${templateName} email to ${email}:`, error.message);
  throw new Error(`Email sending failed: ${error.message}`);
}
```

### **4. Template Data Mapping**
```javascript
// ✅ Good: Clear data mapping
async sendUserRegistrationEmail(email, userData, accountData) {
  const templateData = {
    // User information
    user_name: userData.firstName + ' ' + userData.lastName,
    user_email: userData.email,
    user_join_date: userData.createdAt,
    
    // Account information
    account_id: accountData.id,
    account_type: accountData.type,
    login_url: accountData.loginUrl
  };

  return this.sendTemplateEmail('userRegistration', email, templateData);
}
```

## 🚀 Advanced Topics

### **1. Custom Template Helpers**
```javascript
// Add to email-service.js
async renderTemplate(templatePath, data) {
  const helpers = {
    formatDate: (date) => new Date(date).toLocaleDateString(),
    formatCurrency: (amount) => '$' + parseFloat(amount).toFixed(2),
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
  };

  const template = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(template, { ...data, ...helpers });
}
```

### **2. Batch Email Sending**
```javascript
// Add to EmailService class
async sendBatchEmails(templateName, recipients, templateDataFunction) {
  const results = [];
  
  for (const recipient of recipients) {
    try {
      const data = templateDataFunction(recipient);
      const result = await this.sendTemplateEmail(templateName, recipient.email, data);
      results.push({ email: recipient.email, success: true, messageId: result.messageId });
    } catch (error) {
      results.push({ email: recipient.email, success: false, error: error.message });
    }
  }
  
  return results;
}
```

---

## 🎊 Summary

This developer guide provides comprehensive documentation for:

✅ **Understanding the codebase structure**  
✅ **Adding new email templates**  
✅ **Testing and debugging templates**  
✅ **Best practices and patterns**  
✅ **Advanced customization options**  

Follow the step-by-step instructions to seamlessly integrate new email templates into the system while maintaining code quality and consistency.

**Happy coding!** 🚀 