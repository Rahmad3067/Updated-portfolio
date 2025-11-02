import React from "react";

interface ContactSectionProps {
  t: (key: string) => string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  const contactInfo = [
    { icon: "📧", label: t("contact.labels.email"), value: "aboozar919@gmail.com", link: "mailto:aboozar919@gmail.com" },
    { icon: "📱", label: t("contact.labels.phone"), value: "+33 7 80 56 99 50", link: "tel:+33780569950" },
    { icon: "📍", label: t("contact.labels.location"), value: "Paris", link: null },
    { icon: "💼", label: t("contact.labels.linkedin"), value: "rahmad-abuzar-83a114214", link: "https://www.linkedin.com/in/rahmad-abuzar-83a114214/" },
  ];

  return (
    <div className="section-content">
      <h2>{t("contact.title")}</h2>
      <p>{t("contact.info.description")}</p>
      <div className="contact-info">
        {contactInfo.map((item, i) => (
          <div key={i} className="contact-item">
            <span style={{ marginRight: 8 }}>{item.icon}</span>
            <strong style={{ marginRight: 8 }}>{item.label}</strong>
            {item.link ? (
              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;

