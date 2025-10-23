// EmailJS Configuration
// You need to set up EmailJS service and get these values from https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  // Replace with your EmailJS service ID
  SERVICE_ID: "service_contact_portfolio",

  // Replace with your EmailJS template ID
  TEMPLATE_ID: "template_contact_form",

  // Replace with your EmailJS public key
  PUBLIC_KEY: "your_public_key_here",

  // Your email address where messages will be sent
  TO_EMAIL: "aboozar919@gmail.com",
};

// EmailJS Template Variables:
// The template should use these variables:
// - {{from_name}} - Sender's name
// - {{from_email}} - Sender's email
// - {{subject}} - Message subject
// - {{message}} - Message content
// - {{to_email}} - Your email address
