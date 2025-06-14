# Email Template Development Setup

This setup allows you to develop and preview your email template in a browser before converting it back to EJS format.

## Files Structure

```
├── index.html          # HTML preview with placeholder data
├── styles.css          # Separated CSS for easier editing
├── doctor-account-created.ejs  # Original EJS template
└── README.md          # This file
```

## How to Use

### 1. Preview in Browser
Simply open `index.html` in your browser to see the email template.

### 2. Edit the Design
- Modify `styles.css` to change the styling
- Edit `index.html` to change the HTML structure
- The changes will be visible immediately when you refresh the browser

### 3. Test Different Content
You can modify the placeholder content in `index.html` to test how the design looks with different text lengths or content.

## Placeholder Data Used

The HTML version uses these placeholder values:
- **Doctor Name**: "Dr. John Smith"
- **Login URL**: "https://app.sendscript.com/login"

## Converting Back to EJS

When you're satisfied with your design, follow these steps to convert back to EJS:

### 1. Replace Placeholder Values with EJS Variables
- Replace "Dr. John Smith" with `<%= doctor_name %>`
- Replace the login URL with `<%= login_url %>`

### 2. Merge CSS Back (Optional)
You can either:
- **Option A**: Keep CSS external (recommended for development)
- **Option B**: Copy CSS from `styles.css` back into a `<style>` tag in the EJS file

### 3. Update the EJS Template
Copy your modified HTML structure and replace the content in `doctor-account-created.ejs`

## Example Conversion

**HTML version:**
```html
<p>Dear Dr. John Smith</p>
<p>Login URL: <a href="https://app.sendscript.com/login">https://app.sendscript.com/login</a></p>
```

**EJS version:**
```html
<p>Dear Dr. <%= doctor_name %></p>
<p>Login URL: <%= login_url %></p>
```

## Tips for Email Template Development

1. **Test in Multiple Browsers**: Email clients render differently than browsers
2. **Keep CSS Simple**: Some email clients don't support modern CSS features
3. **Use Inline Styles**: For better email client compatibility, consider moving critical styles inline
4. **Test Responsive Design**: Check how it looks on different screen sizes
5. **Image Fallbacks**: Ensure images have alt text and fallback styles

## Browser Testing
- Chrome/Safari: Modern CSS features work well
- Firefox: Good compatibility
- Edge: Good compatibility

Remember that email clients (Gmail, Outlook, etc.) have different CSS support than browsers, so final testing should be done in actual email clients. 