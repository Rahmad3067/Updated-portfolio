# EmailJS Setup Guide for Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (`aboozar919@gmail.com`)
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_abc123def456`)

### Step 5: Update Configuration

1. Open `src/config/emailjs.ts`
2. Replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "your_actual_service_id", // From Step 2
  TEMPLATE_ID: "your_actual_template_id", // From Step 3
  PUBLIC_KEY: "your_actual_public_key", // From Step 4
  TO_EMAIL: "aboozar919@gmail.com",
};
```

### Step 6: Test the Form

1. Run your development server: `npm start`
2. Go to the contact form
3. Fill out and submit the form
4. Check your email (`aboozar919@gmail.com`) for the message

## 🎯 Form Fields Mapping

The contact form sends these fields to your email:

- **Name**: `{{from_name}}`
- **Email**: `{{from_email}}`
- **Subject**: `{{subject}}`
- **Message**: `{{message}}`

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid service ID"**: Check your Service ID in the config
2. **"Template not found"**: Verify your Template ID
3. **"Invalid public key"**: Double-check your Public Key
4. **Emails not received**: Check spam folder, verify Gmail connection

### Testing:

- Use the EmailJS dashboard to send test emails
- Check browser console for error messages
- Verify all IDs are correct in the config file

## 📧 Email Template Variables

Make sure your EmailJS template includes these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

## 🚀 Deployment

After setup, your contact form will work on:

- Development server (`npm start`)
- Production build (`npm run build`)
- GitHub Pages (`npm run deploy`)

The form is completely client-side and doesn't require a backend server!
