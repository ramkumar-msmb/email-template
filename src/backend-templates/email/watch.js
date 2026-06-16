const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const dir = __dirname;
let debounceTimer;

console.log('👀 Watching for changes in .ejs files...');

fs.watch(dir, (eventType, filename) => {
    // React to changes in .ejs files OR the convert_ejs.js script itself
    if (filename && (filename.endsWith('.ejs') || filename === 'convert_ejs.js')) {
        // Debounce to prevent running the script multiple times for a single save
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log(`\n✏️  Detected change in ${filename}. Regenerating samples...`);
            
            exec('node convert_ejs.js', { cwd: dir }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`❌ Error running conversion: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`⚠️ Stderr: ${stderr}`);
                }
                console.log(`✅ Update complete:\n${stdout.trim()}`);
            });
        }, 300); // 300ms debounce
    }
});
