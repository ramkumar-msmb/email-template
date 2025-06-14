const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const { createTransporter, emailTemplates } = require('./email-config');

class EmailService {
  constructor() {
    this.transporter = createTransporter();
  }

  // Render EJS template with data
  async renderTemplate(templatePath, data) {
    try {
      const template = fs.readFileSync(templatePath, 'utf-8');
      return ejs.render(template, data);
    } catch (error) {
      console.error('Error rendering template:', error);
      throw error;
    }
  }

  // Send email with template
  async sendTemplateEmail(templateName, recipientEmail, templateData, customSubject = null) {
    try {
      const templateConfig = emailTemplates[templateName];
      if (!templateConfig) {
        throw new Error(`Template ${templateName} not found`);
      }

      // Render the HTML content
      const htmlContent = await this.renderTemplate(templateConfig.templatePath, templateData);

      // Email options
      const mailOptions = {
        from: 'SendScript <noreply@sendscript.com>',
        to: recipientEmail,
        subject: customSubject || templateConfig.subject,
        html: htmlContent
      };

      // Send email
      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(result) : 'N/A');
      
      return result;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }

  // Send doctor account created email
  async sendDoctorAccountCreatedEmail(doctorEmail, doctorName, loginUrl) {
    const templateData = {
      doctor_name: doctorName,
      login_url: loginUrl
    };

    return this.sendTemplateEmail('doctorAccountCreated', doctorEmail, templateData);
  }

  // Send pharmacist with sign email
  async sendPharmacistWithSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('pharmacistWithSign', recipientEmail, prescriptionData);
  }

  // Send pharmacy verification email
  async sendPharmacyVerificationEmail(recipientEmail, otp, purpose = 'verification', validity = 10) {
    const templateData = {
      otp: otp,
      purpose: purpose,
      validity: validity
    };

    return this.sendTemplateEmail('pharmacyVerification', recipientEmail, templateData);
  }

  // Send prescription with sign email
  async sendPrescriptionWithSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('prescriptionWithSign', recipientEmail, prescriptionData);
  }

  // Send prescription without sign email
  async sendPrescriptionWithoutSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('prescriptionWithoutSign', recipientEmail, prescriptionData);
  }

  // Send token email
  async sendTokenEmail(recipientEmail, patientName, doctorName, clinicName, prescriptionId, clinicData) {
    const templateData = {
      patient_name: patientName,
      doctor_name: doctorName,
      clinic_name: clinicName,
      prescription_id: prescriptionId,
      clinic_address: clinicData.address,
      clinic_city: clinicData.city,
      clinic_postal_code: clinicData.postal_code,
      clinic_country: clinicData.country,
      clinic_mobile: clinicData.mobile,
      clinic_email: clinicData.email
    };

    return this.sendTemplateEmail('sendToken', recipientEmail, templateData);
  }

  // Send to unregister pharmacy email
  async sendToUnregisterPharmacyEmail(recipientEmail, pharmacyName, prescriptionCode, patientData, clinicData) {
    const templateData = {
      pharmacyName: pharmacyName,
      prescriptionCode: prescriptionCode,
      patientDob: patientData.dob,
      patientName: patientData.name,
      patientMobileNumber: patientData.mobile,
      clinic: clinicData
    };

    return this.sendTemplateEmail('sendToUnregisterPharmacy', recipientEmail, templateData);
  }

  // Send forgot password email
  async sendForgotPasswordEmail(doctorEmail, doctorName, otp) {
    const templateData = {
      doctor_name: doctorName,
      otp: otp
    };

    return this.sendTemplateEmail('forgotPassword', doctorEmail, templateData);
  }

  // Send invoice email
  async sendInvoiceEmail(recipientEmail, invoiceData) {
    return this.sendTemplateEmail('invoiceGenerate', recipientEmail, invoiceData);
  }

  // Test connection
  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection successful!');
      return true;
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      return false;
    }
  }
}

module.exports = EmailService; 