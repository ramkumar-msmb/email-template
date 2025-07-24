const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

async function testButtonWidth() {
  console.log('🧪 Testing LEH Template with Wider Button...\n');
  
  try {
    const testData = {
      recipient_name: 'Ms. Amelia Johnson',
      consent_form_url: 'https://forms.londonelitehealth.com/patient-registration/12345',
      reference_number: 'PNT456738'
    };
    
    const templatePath = path.join(__dirname, 'src/templates/leh-email-template.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const renderedHtml = ejs.render(template, testData);
    
    // Check if the wider button width is applied
    if (renderedHtml.includes('width=400')) {
      console.log('✅ Button width increased to 400px successfully');
    } else {
      console.log('❌ Button width change not found');
    }
    
    // Check if template renders without errors
    console.log('✅ Template rendered successfully!');
    console.log('📏 HTML length:', renderedHtml.length, 'characters');
    
    // Save output for inspection
    fs.writeFileSync('button-test-output.html', renderedHtml);
    console.log('💾 Rendered HTML saved to button-test-output.html for inspection');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testButtonWidth(); 