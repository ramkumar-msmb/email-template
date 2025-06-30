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

  // Account Management Methods
  async sendAccountBlockedBySuperAdminEmail(doctorEmail, doctorName, reason = 'Policy violations') {
    const templateData = {
      doctor_name: doctorName,
      reason: reason
    };
    return this.sendTemplateEmail('accountBlockedBySuperAdmin', doctorEmail, templateData);
  }

  async sendAccountRejectedBySuperAdminEmail(doctorEmail, doctorName, reason) {
    const templateData = {
      doctor_name: doctorName,
      reason: reason
    };
    return this.sendTemplateEmail('accountRejectedBySuperAdmin', doctorEmail, templateData);
  }

  async sendDoctorAccountCreatedEmail(doctorEmail, doctorName, loginUrl) {
    const templateData = {
      doctor_name: doctorName,
      login_url: loginUrl
    };
    return this.sendTemplateEmail('doctorAccountCreated', doctorEmail, templateData);
  }

  async sendDoctorAccountCreationEmail(doctorEmail, doctorName, verificationCode) {
    const templateData = {
      doctor_name: doctorName,
      verification_code: verificationCode
    };
    return this.sendTemplateEmail('doctorAccountCreation', doctorEmail, templateData);
  }

  async sendDoctorSuperAdminApprovalEmail(doctorEmail, doctorName, loginUrl) {
    const templateData = {
      doctor_name: doctorName,
      login_url: loginUrl
    };
    return this.sendTemplateEmail('doctorSuperAdminApproval', doctorEmail, templateData);
  }

  async sendSignupEmail(doctorEmail, doctorName, otp) {
    const templateData = {
      doctor_name: doctorName,
      otp: otp
    };
    return this.sendTemplateEmail('signup', doctorEmail, templateData);
  }

  // Clinic Management Methods
  async sendClinicJoinRequestEmail(doctorEmail, doctorName, clinicName) {
    const templateData = {
      doctor_name: doctorName,
      clinic_name: clinicName
    };
    return this.sendTemplateEmail('clinicJoinRequest', doctorEmail, templateData);
  }

  async sendClinicRegistrationEmail(doctorEmail, doctorName, clinicData) {
    const templateData = {
      doctor_name: doctorName,
      ...clinicData
    };
    return this.sendTemplateEmail('clinicRegistration', doctorEmail, templateData);
  }

  async sendClinicRegistrationApprovedEmail(doctorEmail, doctorName) {
    const templateData = {
      doctor_name: doctorName
    };
    return this.sendTemplateEmail('clinicRegistrationApproved', doctorEmail, templateData);
  }

  async sendClinicRegistrationUnsuccessfulEmail(doctorEmail, doctorName, reason) {
    const templateData = {
      doctor_name: doctorName,
      reason: reason
    };
    return this.sendTemplateEmail('clinicRegistrationUnsuccessful', doctorEmail, templateData);
  }

  async sendInviteDoctorEmail(doctorEmail, doctorName, invitationData) {
    const templateData = {
      doctor_name: doctorName,
      ...invitationData
    };
    return this.sendTemplateEmail('inviteDoctor', doctorEmail, templateData);
  }

  // Email Verification Methods
  async sendEmailVerificationAccountCreationEmail(userEmail, userName, verificationCode) {
    const templateData = {
      user_name: userName,
      verification_code: verificationCode
    };
    return this.sendTemplateEmail('emailVerificationAccountCreation', userEmail, templateData);
  }

  async sendEmailVerificationOnboardingEmail(userEmail, otp) {
    const templateData = {
      otp: otp
    };
    return this.sendTemplateEmail('emailVerificationOnboarding', userEmail, templateData);
  }

  async sendUpdateEmailAddressEmail(userEmail, userName, verificationCode) {
    const templateData = {
      user_name: userName,
      verification_code: verificationCode
    };
    return this.sendTemplateEmail('updateEmailAddress', userEmail, templateData);
  }

  async sendForgotPasswordEmail(doctorEmail, doctorName, otp) {
    const templateData = {
      doctor_name: doctorName,
      otp: otp
    };
    return this.sendTemplateEmail('forgotPassword', doctorEmail, templateData);
  }

  async sendReinitiateOnfidoVerificationEmail(doctorEmail, doctorName) {
    const templateData = {
      doctor_name: doctorName
    };
    return this.sendTemplateEmail('reinitiateOnfidoVerification', doctorEmail, templateData);
  }

  // Pharmacy Methods
  async sendPharmacyVerificationEmail(recipientEmail, otp, purpose = 'verification', validity = 10) {
    const templateData = {
      otp: otp,
      purpose: purpose,
      validity: validity
    };
    return this.sendTemplateEmail('pharmacyVerification', recipientEmail, templateData);
  }

  async sendPharmacyOwnerBlockedEmail(pharmacyEmail, pharmacyOwnerName, reason) {
    const templateData = {
      pharmacy_owner_name: pharmacyOwnerName,
      reason: reason
    };
    return this.sendTemplateEmail('pharmacyOwnerBlocked', pharmacyEmail, templateData);
  }

  async sendPharmacyOwnerRegistrationApprovedEmail(pharmacyEmail, pharmacyOwnerName) {
    const templateData = {
      pharmacy_owner_name: pharmacyOwnerName
    };
    return this.sendTemplateEmail('pharmacyOwnerRegistrationApproved', pharmacyEmail, templateData);
  }

  async sendPharmacyOwnerRegistrationUnsuccessfulEmail(pharmacyEmail, pharmacyOwnerName, reason) {
    const templateData = {
      pharmacy_owner_name: pharmacyOwnerName,
      reason: reason
    };
    return this.sendTemplateEmail('pharmacyOwnerRegistrationUnsuccessful', pharmacyEmail, templateData);
  }

  async sendPharmacyViaPrescriptionEmail(pharmacyEmail, prescriptionData) {
    return this.sendTemplateEmail('pharmacyViaPrescription', pharmacyEmail, prescriptionData);
  }

  // Prescription Methods
  async sendPrescriptionWithSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('prescriptionWithSign', recipientEmail, prescriptionData);
  }

  async sendPrescriptionWithoutSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('prescriptionWithoutSign', recipientEmail, prescriptionData);
  }

  async sendPrescriptionFromPharmacyEmail(patientEmail, pharmacyData) {
    const templateData = {
      patient_name: pharmacyData.patient_name,
      pharmacy_name: pharmacyData.pharmacy_name,
      pharmacy_email: pharmacyData.pharmacy_email,
      pharmacy_address_1: pharmacyData.pharmacy_address_1,
      pharmacy_address_2: pharmacyData.pharmacy_address_2,
      city: pharmacyData.city,
      postal_code: pharmacyData.postal_code,
      country: pharmacyData.country,
      pharmacy_contact_number: pharmacyData.pharmacy_contact_number,
      prescription_url: pharmacyData.prescription_url
    };
    return this.sendTemplateEmail('prescriptionFromPharmacy', patientEmail, templateData);
  }

  async sendPharmacistWithSignEmail(recipientEmail, prescriptionData) {
    return this.sendTemplateEmail('pharmacistWithSign', recipientEmail, prescriptionData);
  }

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

  // Payment Methods
  async sendPaymentConfirmedEmail(recipientEmail, paymentData) {
    return this.sendTemplateEmail('paymentConfirmed', recipientEmail, paymentData);
  }

  async sendPaymentForPrescriptionEmail(patientEmail, paymentData) {
    const templateData = {
      patient_name: paymentData.patient_name,
      pharmacy_name: paymentData.pharmacy_name,
      prescription_id: paymentData.prescription_id,
      amount: paymentData.amount,
      secure_payment_link: paymentData.secure_payment_link
    };
    return this.sendTemplateEmail('paymentForPrescription', patientEmail, templateData);
  }

  async sendPaymentLinkEmail(recipientEmail, link) {
    const templateData = {
      link: link
    };
    return this.sendTemplateEmail('paymentLink', recipientEmail, templateData);
  }

  // Invoice Methods
  async sendInvoiceEmail(recipientEmail, invoiceData) {
    return this.sendTemplateEmail('invoiceGenerate', recipientEmail, invoiceData);
  }

  async sendInvoiceFromPharmacyEmail(recipientEmail, invoiceData) {
    return this.sendTemplateEmail('invoiceFromPharmacy', recipientEmail, invoiceData);
  }

  // Patient & Data Methods
  async sendPatientDataAccessEmail(patientEmail, accessData) {
    const templateData = {
      patient_name: accessData.patient_name,
      doctor_name: accessData.doctor_name,
      clinic_name: accessData.clinic_name
    };
    return this.sendTemplateEmail('patientDataAccess', patientEmail, templateData);
  }

  // Special Methods
  async sendLehEmailTemplateEmail(recipientEmail, lehData) {
    return this.sendTemplateEmail('lehEmailTemplate', recipientEmail, lehData);
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