const fs = require('fs');

function extractVars(filepath) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const regex = /<%[=-]?\s*([^%>]+?)\s*%>/g;
    let match;
    const vars = new Set();
    while ((match = regex.exec(content)) !== null) {
        let v = match[1].trim();
        // remove newlines
        v = v.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        if (!v.startsWith('if') && !v.startsWith('}')) {
             vars.add(v);
        }
    }
    fs.appendFileSync('extracted.txt', `\n=== ${filepath} ===\n`);
    fs.appendFileSync('extracted.txt', Array.from(vars).join(', ') + '\n');
}

fs.writeFileSync('extracted.txt', '');
extractVars('src/backend-templates/email/lab-request-email.ejs');
extractVars('src/backend-templates/email/lab-report-email.ejs');
extractVars('src/backend-templates/email/doctor-consultation.ejs');
extractVars('src/backend-templates/email/patient-data-access.ejs');
