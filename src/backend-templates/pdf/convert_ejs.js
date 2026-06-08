const fs = require('fs');
const path = require('path');

const dir = '/Users/ramkumar/develop/email-template/src/backend-templates/pdf';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ejs') && f !== 'appointment_invoice.ejs');

const mockDataMap = {
    // ---------------------------------------------------------
    // Pharmacy & Clinic Details
    // ---------------------------------------------------------
    'clinic.name': 'HealthFirst Pharmacy',
    'clinic.address_line_1': '123 High Street',
    'clinic.address_line_2': 'Medical District',
    'clinic.city': 'London',
    'clinic.county': 'Greater London',
    'clinic.country': 'United Kingdom',
    'clinic.postal_code': 'SW1A 1AA',
    'clinic.contact_number': '+44 20 7946 0958',
    'clinic.email': 'info@healthfirstpharmacy.co.uk',

    'clinic_name': 'HealthFirst Pharmacy',
    'clinic_address_line_1': '123 High Street',
    'clinic_address_line_2': 'Medical District',
    'clinic_city': 'London',
    'clinic_county': 'Greater London',
    'clinic_country': 'United Kingdom',
    'clinic_postal_code': 'SW1A 1AA',
    'clinic_address': '123 High Street, Medical District, London, SW1A 1AA',
    'clinic_contact_number': '+44 20 7946 0958',
    'clinic_phone_number': '+44 20 7946 0958',
    'clinic_email': 'info@healthfirstpharmacy.co.uk',

    'pharmacy.name': 'HealthFirst Pharmacy',
    'pharmacy.address_line_1': '123 High Street',
    'pharmacy.address_line_2': 'Medical District',
    'pharmacy.city': 'London',
    'pharmacy.county': 'Greater London',
    'pharmacy.country': 'United Kingdom',
    'pharmacy.postal_code': 'SW1A 1AA',
    'pharmacy.contact_number': '+44 20 7946 0958',
    'pharmacy.email': 'info@healthfirstpharmacy.co.uk',

    'pharmacy_name': 'HealthFirst Pharmacy',
    'pharmacy_address_line_1': '123 High Street',
    'pharmacy_address_line_2': 'Medical District',
    'pharmacy_city': 'London',
    'pharmacy_county': 'Greater London',
    'pharmacy_country': 'United Kingdom',
    'pharmacy_postal_code': 'SW1A 1AA',
    'pharmacy_contact_number': '+44 20 7946 0958',
    'pharmacy_email': 'info@healthfirstpharmacy.co.uk',

    // ---------------------------------------------------------
    // Patient Details
    // ---------------------------------------------------------
    'patient.title': 'Dr',
    'patient.first_name': 'John',
    'patient.last_name': 'Doe',
    'patient.date_of_birth': '15 May 1985',
    'patient.gender': 'Male',
    'patient.email': 'john.doe@example.com',
    'patient.phone_number': '+44 7700 900077',
    'patient.address': '456 Fake Street, London, E1 8QK',

    'patient_details.patient_title': 'Dr',
    'patient_details.patient_first_name': 'John',
    'patient_details.patient_sur_name': 'Doe',
    'patient_details.patient_dob': '08 Jun 2026',
    'patient_details.patient_mobile': '+44 20 7946 0958',
    'patient_details.patient_address_line_1': '123 High Street',
    'patient_details.patient_address_line_2': 'Medical District',
    'patient_details.patient_city': 'London',
    'patient_details.patient_county': 'Greater London',
    'patient_details.patient_country_code': '+91',
    'patient_details.patient_country': 'United Kingdom',
    'patient_details.patient_postal_code': 'SW1A 1AA',
    'patient_details.comment_to_pharmacy': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo sd',
    'patient_details.comment_to_patient': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo sd',

    'patient_name': 'John Doe',
    'patient_age': '41',
    'patient_gender': 'Male',
    'patient_date_of_birth': '15 May 1985',
    'patient_email': 'john.doe@example.com',
    'patient_phone_number': '+44 20 7946 0958',
    'patient_country_code': '+91',
    'patient_address': '123 High Street, Medical District, London, SW1A 1AA',

    // ---------------------------------------------------------
    // Appointment & Booking Details
    // ---------------------------------------------------------
    'appointment.doctor_name': 'Dr. Sarah Smith',
    'appointment.date': '08 Jun 2026',
    'appointment.time': '10:30 AM',

    'booking.booking_number': 'INV-2023-001',
    'booking.doctor_name': 'Dr. Sarah Smith',
    'booking.date': '08 Jun 2026',
    'booking.time': '10:30 AM',
    'booking.address': '123 High Street, Medical District, London, SW1A 1AA',
    'booking.phone_number': '+44 20 7946 0958',

    'booking_number': 'INV-2023-001',
    'booking_code': 'INV-2023-001',
    'booking_doctor_name': 'Dr. Sarah Smith',
    'booking_date': '08 Jun 2026',
    'booking_time': '10:30 AM',
    'booking_address': '123 High Street, Medical District, London, SW1A 1AA',
    'booking_phone_number': '+44 20 7946 0958',

    // ---------------------------------------------------------
    // Prescription Details
    // ---------------------------------------------------------
    'prescription.doctor_title': 'Dr',
    'prescription.doctor_first_name': 'Sarah',
    'prescription.doctor_sur_name': 'Smith',
    'prescription.doctor_signature': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png',
    
    'prescription.pharmacy_name': 'HealthFirst Pharmacy',
    'prescription.pharmacy_address_line_1': '123 High Street',
    'prescription.pharmacy_address_line_2': 'Medical District',
    'prescription.pharmacy_city': 'London',
    'prescription.pharmacy_county': 'Greater London',
    'prescription.pharmacy_country': 'United Kingdom',
    'prescription.pharmacy_postal_code': 'SW1A 1AA',
    'prescription.pharmacy_contact_number': '+44 20 7946 0958',
    'prescription.pharmacy_email': 'info@healthfirstpharmacy.co.uk',
    'prescription.pharmacist_code': 'PD671',
    'prescription.pharmacist_gphc': '123456',

    'prescription_id': 'INV-2023-001',
    'prescription_date': '08 Jun 2026',
    'prescription_type': 'TLC',

    // ---------------------------------------------------------
    // Doctor Details
    // ---------------------------------------------------------
    'doctor_name': 'Dr. Sarah Smith',
    'doctor_gmc_number': '123456',
    'doctor_qualification': 'MBBS FRCS',
    'signature_hash': '0000000000000000000000000000000000000000000000000000000000000000',
    'signature_time': '08 Jun 2026 10:30 AM',

    // ---------------------------------------------------------
    // Invoice Details
    // ---------------------------------------------------------
    'invoice.invoice_number': 'INV-2023-001',
    'invoice.invoice_id': 'INV-2023-001',
    'invoice.date': '08 Jun 2026',
    'invoice.total_amount': '£150.00',
    'invoice_id': 'INV-2023-001',
    'formattedDate_invoice': '8 June 2026',
    'formattedDate': '8 June 2026',

    'delivery_charge': '£5.00',
    'sub_total': '£10.00',
    'total_amount': '£150.00',
    'total_price': '£150.00',

    // ---------------------------------------------------------
    // Item Details
    // ---------------------------------------------------------
    'item.name': 'Rifadin 100 mg/ 5ml syrup 120 ml',
    'item.quantity': '2',
    'item.price': '£5.00',
    'item.total': '£10.00',
    'item.unit': 'mg',
    'item.duration': '200',
    'item.duration_type': 'Days',
    'item.dosage_note': '200 ml',
    'item.slNo': '1',
    'item.method': 'Intramuscular',

    // ---------------------------------------------------------
    // Clinical Info
    // ---------------------------------------------------------
    'clinical_info': '123 High Street, Medical District, London, SW1A 1AA',
    'drug_therapy': 'Paracetamol',
    'ethnic_origin': 'British',
    'fasting': '☑',
    'hrt': '☑',
    'post_menopause': '☑',
    'suspicious_cervix': '☑',
    'logo_url': 'https://d2pznqasld4zpy.cloudfront.net/common/logo.svg',
    'prescriber_qualification': 'MBBS, BMedSci(Hons), nMRCGP, DFSRH, LOC IUD, DCD(Distinction), AGGM',
    'prescriber_registration_no': 'GMC - 3457052',
    'registration_no': 'GMC - 3457052',
    'prescriber_name': 'Dr.Sarah Smith',
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
