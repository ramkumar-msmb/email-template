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
      otp: verificationCode
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
      remarks: reason
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

  async sendPaInvitesEmail(recipientEmail, invitationData) {
    return this.sendTemplateEmail('paInvites', recipientEmail, invitationData);
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

  async sendPharmacyOwnerInvitesPharmacistEmail(recipientEmail, invitationData) {
    return this.sendTemplateEmail('pharmacyOwnerInvitesPharmacist', recipientEmail, invitationData);
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

  async sendPaymentRequestFromPharmacyEmail(recipientEmail, pharmacyData) {
    return this.sendTemplateEmail('paymentRequestFromPharmacy', recipientEmail, pharmacyData);
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

  async sendPharmacyEmail(recipientEmail, pharmacyData) {
    return this.sendTemplateEmail('pharmacyEmail', recipientEmail, pharmacyData);
  }

  async sendPaymentLink2Email(recipientEmail, paymentData) {
    return this.sendTemplateEmail('paymentLink2', recipientEmail, paymentData);
  }

  // Booking & Scan Methods
  async sendBookingConfirmationWithInvoiceEmail(patientEmail, bookingData) {
    const templateData = {
      patient_name: bookingData.patient_name,
      scan_name: bookingData.scan_name,
      booking_date: bookingData.booking_date,
      booking_time: bookingData.booking_time,
      center_name: bookingData.center_name,
      center_address: bookingData.center_address,
      payment_status: bookingData.payment_status || 'Confirmed',
      booking_id: bookingData.booking_id,
      invoice_number: bookingData.invoice_number
    };
    return this.sendTemplateEmail('bookingConfirmationWithInvoice', patientEmail, templateData);
  }

  async sendBookingInvoiceResendEmail(patientEmail, invoiceData) {
    const templateData = {
      patient_name: invoiceData.patient_name,
      scan_name: invoiceData.scan_name,
      invoice_number: invoiceData.invoice_number,
      booking_date: invoiceData.booking_date,
      booking_time: invoiceData.booking_time,
      amount_paid: invoiceData.amount_paid,
      booking_id: invoiceData.booking_id
    };
    return this.sendTemplateEmail('bookingInvoiceResend', patientEmail, templateData);
  }

  async sendBookingRescheduledEmail(patientEmail, rescheduleData) {
    const templateData = {
      patient_name: rescheduleData.patient_name,
      scan_name: rescheduleData.scan_name,
      new_date: rescheduleData.new_date,
      new_time: rescheduleData.new_time,
      center_name: rescheduleData.center_name,
      center_address: rescheduleData.center_address,
      booking_id: rescheduleData.booking_id,
      old_date: rescheduleData.old_date,
      old_time: rescheduleData.old_time
    };
    return this.sendTemplateEmail('bookingRescheduled', patientEmail, templateData);
  }

  async sendPaymentLinkResendEmail(patientEmail, paymentData) {
    const templateData = {
      patient_name: paymentData.patient_name,
      scan_name: paymentData.scan_name,
      booking_date: paymentData.booking_date,
      booking_time: paymentData.booking_time,
      payment_link: paymentData.payment_link,
      booking_amount: paymentData.booking_amount,
      booking_id: paymentData.booking_id,
      center_name: paymentData.center_name,
      center_address: paymentData.center_address
    };
    return this.sendTemplateEmail('paymentLinkResend', patientEmail, templateData);
  }

  async sendScanSlotReservedEmail(patientEmail, reservationData) {
    const templateData = {
      patient_name: reservationData.patient_name,
      scan_name: reservationData.scan_name,
      booking_date: reservationData.booking_date,
      booking_time: reservationData.booking_time,
      center_name: reservationData.center_name,
      center_address: reservationData.center_address,
      complete_payment_url: reservationData.complete_payment_url,
      booking_amount: reservationData.booking_amount,
      booking_id: reservationData.booking_id,
      reservation_expires: reservationData.reservation_expires
    };
    return this.sendTemplateEmail('scanSlotReserved', patientEmail, templateData);
  }

  async sendScanReportDoctorEmail(doctorEmail, reportData) {
    const templateData = {
      patient_name: reportData.patient_name,
      scan_name: reportData.scan_name,
      patient_age: reportData.patient_age,
      patient_sex: reportData.patient_sex,
      scan_date: reportData.scan_date,
      contact_number: reportData.contact_number || 'support@sendscript.com'
    };
    return this.sendTemplateEmail('sendScanReportDoctor', doctorEmail, templateData);
  }

  async sendPaymentLinkScanEmail(patientEmail, paymentData) {
    const templateData = {
      patient_name: paymentData.patient_name,
      link: paymentData.link,
      total_price: paymentData.total_price,
      gross_amount: paymentData.gross_amount,
      prescriptionItems: paymentData.prescriptionItems || []
    };
    return this.sendTemplateEmail('paymentLinkScan', patientEmail, templateData);
  }

  async sendVideoConsultationEmail(patientEmail, consultationData) {
    const templateData = {
      patient_name: consultationData.patient_name,
      link: consultationData.link,
      date_time: consultationData.date_time || '[Date & Time]',
      consultant_name: consultationData.consultant_name || '[Consultant Name]',
      consultant_gmc: consultationData.consultant_gmc || '9293839',
      clinic_name: consultationData.clinic_name,
      clinic_address: consultationData.clinic_address,
      clinic_city: consultationData.clinic_city,
      clinic_postal_code: consultationData.clinic_postal_code,
      clinic_country: consultationData.clinic_country,
      clinic_mobile: consultationData.clinic_mobile,
      clinic_email: consultationData.clinic_email
    };
    return this.sendTemplateEmail('videoConsultation', patientEmail, templateData);
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