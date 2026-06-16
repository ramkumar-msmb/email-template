const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ejs') && f !== 'convert_ejs.js' && f !== 'watch.js');

const mockDataMap = {
    // Account Management
    'doctor_name': 'Dr. Sarah Smith',
    'reason': 'Policy violations',
    'login_url': 'https://sendscript.com/login',
    'otp': '123456',
    'remarks': 'Information incomplete',

    // Clinic Management
    'clinic_name': 'HealthFirst Clinic',
    'clinic_address': '123 High Street, Medical District, London, SW1A 1AA',
    'clinic_contact': '0207 486 0701',
    'clinic_email': 'info@healthfirstclinic.co.uk',
    'clinic_phone': '+44 20 7946 0958',
    'clinic_city': 'London',
    'clinic_postal_code': 'SW1A 1AA',
    'clinic_country': 'United Kingdom',
    'clinic_mobile': '+44 20 7946 0958',

    // Invitation
    'inviteeName': 'Dr. Bob Brown',
    'invitingDoctorName': 'Dr. Sarah Smith',

    // Patient & General
    'user_name': 'Alice Smith',
    'verification_code': '123456',
    'patient_name': 'John Doe',
    'patient_age': '48',
    'patient_gender': 'Male',
    'patient_email': 'john.doe@example.com',
    'patient_phone': '98765124312',
    'patient_address': 'London, Uk',
    'patient_dob': '15 May 1985',
    'patient_sex': 'Male',
    'patient_mobile': '98765124312',

    // Pharmacy
    'pharmacy_name': 'HealthFirst Pharmacy',
    'pharmacy_email': 'info@healthfirstpharmacy.co.uk',
    'pharmacy_address_1': '123 High Street',
    'pharmacy_address_2': 'Medical District',
    'city': 'London',
    'postal_code': 'SW1A 1AA',
    'country': 'United Kingdom',
    'pharmacy_contact_number': '+44 20 7946 0958',
    'pharmacy_owner_name': 'James Smith',
    'purpose': 'verification',
    'validity': '10',
    'prescription_url': 'https://example.com/prescription',
    'prescription_id': 'RX-98765',

    // Booking & Appointment
    'appointment_id': 'CV13554776',
    'appointment_code': 'APPT-1234',
    'appointment_type': 'Visit Consultation - New Appointment',
    'appointment_date': 'Friday, Nov 21, 2025',
    'appointment_time': '10:00 AM (30 mins)',
    'appointment_duration': '30 mins',
    'service_type': 'Doctor Consultation',
    'start_time': '10:00 AM',
    'end_time': '10:30 AM',
    'duration': '30 mins',
    'booking_id': 'INV-2023-001',
    'booking_date': '08 Jun 2026',
    'booking_time': '10:30 AM',
    'booking_amount': '£150.00',

    // Scans & Reports
    'scan_name': 'MRI Brain',
    'scan_date': '08 Jun 2026',
    'center_name': 'Central Imaging Center',
    'center_address': '456 Scan Street',
    'hospital_name': 'Wellcare Hospital',
    'address_line_1': '116 Harley Street',
    'address_line_2': 'Wimbledon',
    'contact_number': '+44 20 7486 0701',
    'title': 'Lab Request',
    'message_body': 'Please review the attached report.',

    // Doctor details specific
    'doctor_specialty': 'General Physician',
    'doctor_phone': '98765124312',
    'doctor_hospital': 'Well care Hospital',
    'doctor_qualifications': 'MBBS, MD',
    'doctor_mobile': '98765124312',
    'doctor_location_name': 'Well care Hospital',
    'consultant_name': 'Dr. Sarah Smith',
    'consultant_gmc': '9293839',

    // Payment & Invoice
    'invoice_number': 'INV-2023-001',
    'invoice_code': 'INV-2023-001',
    'invoice_date': '08 Jun 2026',
    'amount': '£150.00',
    'total_amount': '£150.00',
    'total_price': '£150.00',
    'gross_amount': '£150.00',
    'consultation_fee': '£100.00',
    'amount_paid': '£150.00',
    'price': '150.00',
    'payment_method': 'Credit Card',
    'payment_card_ending': '**4567',
    'payment_date': 'Friday, Nov 20, 2025 at 11:00 AM',
    'payment_status': 'Confirmed',
    'payment_link': 'https://example.com/pay',
    'secure_payment_link': 'https://example.com/pay',
    'complete_payment_url': 'https://example.com/pay',
    'link': 'https://example.com/link',
    'video_consultation_link': 'https://example.com/video',

    // Insurance
    'insurance_company_name': 'HealthGuard Insurance',
    'insurance_policy_number': 'POL-987654321',
    'insurance_member_id': 'MEM-123456789',
    
    // Fallbacks
    'date_time': 'January 15, 2024 at 2:00 PM',
    'date_and_time': 'January 15, 2024 at 2:00 PM',

    // clinic details object
    'clinic_details.name': 'HealthFirst Clinic',
    'clinic_details.contact': '0207 486 0701',
    'clinic_details.email': 'info@healthfirstclinic.co.uk',
    'clinic_details.address': '123 High Street, Medical District, London, SW1A 1AA',
    'clinic_details.contact_number': '0207 486 0701',
    
    // patient details object
    'patient_details.name': 'John Doe',
    'patient_details.age': '48',
    'patient_details.gender': 'Male',
    'patient_details.email': 'john.doe@example.com',
    'patient_details.country_code': '+44',
    'patient_details.mobile': '98765124312',
    'patient_details.address_line_1': '82 The Broadway',
    'patient_details.address_line_2': 'Wimbledon',
    'patient_details.city': 'London',
    'patient_details.country': 'United Kingdom',
    'patient_details.postal_code': 'SW19 1RH',
    
    // doctor details object
    'doctor_details.name': 'Dr. Sarah Smith',
    'doctor_details.qualifications': 'MBBS, MD',
    'doctor_details.mobile': '98765124312',
    'doctor_details.email': 'welcare@gmail.com',

    'doctor_location_details.name': 'Well care Hospital',
    
    // Meet link object
    'meetLink.meeting_invite': 'https://example.com/meet',
    
    // rawPaymentItems
    'rawPaymentItems.patient_name': 'John Doe',
    'rawPaymentItems.scan_name': 'MRI Brain',
    'rawPaymentItems.body_part': 'body part',
    'rawPaymentItems.hospital_name': 'wellcare hospital',
    'rawPaymentItems.site_email': '[EMAIL_ADDRESS]',
    'rawPaymentItems.address_line_1': '116 Harley Street',
    'rawPaymentItems.address_line_2': 'Wimbledon',
    'rawPaymentItems.city': 'London',
    'rawPaymentItems.country': 'United Kingdom',
    'rawPaymentItems.postal_code': 'SW19 1RH',
    'rawPaymentItems.link': 'https://example.com/pay',
    'rawPaymentItems.hospital_contact_number': '+44 20 7486 0701',
    'rawPaymentItems.booking_date': '08 Jun 2026',
    'rawPaymentItems.booking_time': '10:30 AM',
    'rawPaymentItems.payment_link': 'https://example.com/pay',
    'rawPaymentItems.booking_amount': '£150.00',
    'rawPaymentItems.booking_id': 'INV-2023-001',
    'rawPaymentItems.center_name': 'Central Imaging Center',
    'rawPaymentItems.center_address': '456 Scan Street',
    
    // Insurance details object
    'insurance_details.company_name': 'HealthGuard Insurance',
    'insurance_details.policy_number': 'POL-987654321',
    'insurance_details.member_id': 'MEM-123456789'
};

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove comments
    content = content.replace(/<%#[\s\S]*?%>/g, '');

    // Replace output tags
    content = content.replace(/<%[-=]\s*([\s\S]*?)\s*%>/g, (match, p1) => {
        let varName = p1.trim();
        let normalizedVarName = varName.replace(/\?\./g, '.');
        
        // Handle common EJS expressions like formatting dates or arrays
        if (normalizedVarName.includes('.join(')) {
            return '123 High Street, Medical District, London, SW1A 1AA';
        }
        
        // Exact match from map
        if (mockDataMap[normalizedVarName]) {
            return mockDataMap[normalizedVarName];
        }
        
        // Fallback: try to find a substring match
        for (const key in mockDataMap) {
            if (normalizedVarName.includes(key)) {
                return mockDataMap[key];
            }
        }
        
        // Clean up the variable name for display if it's too complex
        if (varName.includes('?') || varName.includes('||') || varName.length > 30) {
            return 'Mock Data';
        }
        return `[${varName}]`;
    });

    // Remove all other EJS tags like <% if(...) { %> or <% } %>
    content = content.replace(/<%\s*[\s\S]*?\s*%>/g, '');

    const outPath = path.join(dir, file.replace('.ejs', '_sample.html'));
    fs.writeFileSync(outPath, content);
    console.log(`Converted ${file} to ${path.basename(outPath)}`);
}
console.log('Done!');
