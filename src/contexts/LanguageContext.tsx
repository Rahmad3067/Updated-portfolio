import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("fr");

  // Detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const supportedLanguages: Language[] = ["fr", "en"];

    if (supportedLanguages.includes(browserLang as Language)) {
      setLanguage(browserLang as Language);
    } else {
      // Default to French if browser language is not supported
      setLanguage("fr");
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    const translations: Record<Language, Record<string, string>> = {
      fr: {
        // Navigation
        "nav.about": "À propos",
        "nav.education": "Formation",
        "nav.experience": "Expérience",
        "nav.skills": "Compétences",
        "nav.projects": "Projets",
        "nav.contact": "Contact",

        // Hero Section
        "hero.greeting": "Bonjour, je suis",
        "hero.name": "Rahmad Abuzar",
        "hero.title": "Développeur Fullstack Web et Mobile",
        "hero.description":
          "Passionné par le développement web et mobile, je crée des applications modernes et performantes avec React, TypeScript, Python et Django. À la recherche d'un nouveau poste commençant dès que possible.",
        "hero.cta.projects": "Voir mes projets",
        "hero.cta.contact": "Me contacter",
        "hero.scroll": "Défiler",

        // About Section
        "about.title": "À propos de moi",
        "about.presentation": "Présentation",
        "about.presentation.text1":
          "Je suis Rahmad Abuzar, un développeur fullstack passionné par les technologies web et mobile. Âgé de 24 ans, je suis actuellement à la recherche d'un nouveau poste commençant dès que possible.",
        "about.presentation.text2":
          "Mon parcours professionnel m'a permis de développer une expertise solide en développement frontend avec React/TypeScript et backend avec Python/Django. J'ai une expérience significative dans la création d'applications web modernes et performantes.",
        "about.personal": "Informations personnelles",
        "about.fullname": "Nom complet:",
        "about.age": "Âge:",
        "about.location": "Localisation:",
        "about.phone": "Téléphone:",
        "about.email": "Email:",
        "about.linkedin": "LinkedIn:",

        // Education Section
        "education.title": "Formations",
        "education.period.2021": "2021-2021",
        "education.period.2020": "2020-2021",
        "education.period.2019": "2019-2020",
        "education.period.2018": "2018",
        "education.webdev.title": "Développeur Web et Web Mobile",
        "education.webdev.institution": "Konexio Paris",
        "education.webdev.description":
          "Préparation titre RNCP Niveau (Bac +2)",
        "education.digistart.title": "Formation DigiStart",
        "education.digistart.institution": "Konexio Paris",
        "education.digistart.description":
          "Programme d'introduction au code (HTML, CSS, Javascript)",
        "education.fle.title": "Cours de Français Langue étrangère (FLE)",
        "education.fle.institution": "Ecole Thot Paris",
        "education.fle.description":
          "2 sessions d'apprentissage de la langue Française (160h de formation et 16h d'ateliers de valorisation des compétences professionnelles). Passage du DELF Niveau A2",
        "education.tech.title": "Programme de technologie",
        "education.tech.institution": "Lycée de Fischerstromska",
        "education.tech.description": "Formation technologique au lycée",
        "education.location.paris": "Paris, France",
        "education.location.sweden": "Suède",

        // Experience Section
        "experience.title": "Expériences Professionnelles",
        "experience.balyo.period": "2022-2025",
        "experience.balyo.title": "Développeur Full Stack",
        "experience.balyo.company": "Balyo",
        "experience.balyo.description":
          "Développement d'applications web et mobiles pour la gestion de robots industriels. Création d'interfaces utilisateur modernes et d'APIs robustes.",
        "experience.balyo.location": "France",
        "experience.datoscout.period": "2021-2022",
        "experience.datoscout.title": "Développeur Remote Stage",
        "experience.datoscout.company": "Datoscout",
        "experience.datoscout.description":
          "Développement et maintenance de l'application utilisée par Datoscout pour conseiller les clients et gérer les coûts de leurs différents projets.",
        "experience.datoscout.location": "Remote",
        "experience.hairdresser.period": "Non spécifié",
        "experience.hairdresser.title": "Assistant de coiffure",
        "experience.hairdresser.company": "Karlskrona, Suède",
        "experience.hairdresser.description":
          "Accueil des clients et assistance dans un salon de coiffure.",
        "experience.mcdonalds.period": "Non spécifié",
        "experience.mcdonalds.title": "Équipier",
        "experience.mcdonalds.company": "McDonald's Karlskrona",
        "experience.mcdonalds.description":
          "Équipier des clients au comptoir McDonald's. Prise des commandes, encaissement, entretien du matériel et de la salle.",
        "experience.elgiganten.period": "Non spécifié",
        "experience.elgiganten.title": "Vendeur au rayon informatique",
        "experience.elgiganten.company": "Magasin Elgiganten Karlskrona",
        "experience.elgiganten.description":
          "Vendeur au rayon informatique. Accueil des clients, conseil clients, mise en rayon.",
        "experience.technologies": "Technologies utilisées:",
        "experience.location.karlskrona": "Karlskrona, Suède",

        // Skills Section
        "skills.title": "Compétences",
        "skills.technical": "Compétences Techniques",
        "skills.languages": "Langues",
        "skills.programming": "Langages de programmation",
        "skills.development": "Environnements de développement",
        "skills.databases": "Bases de données",
        "skills.methodology": "Méthodologie",
        "skills.operating": "Systèmes d'exploitation",
        "skills.language.french": "Français",
        "skills.language.english": "Anglais",
        "skills.language.swedish": "Suédois",
        "skills.language.farsi": "Farsi",
        "skills.level.delf_b1": "DELF B1",
        "skills.level.toeic_b2": "TOEIC B2",
        "skills.level.bilingual": "Bilingue",

        // Projects Section
        "projects.title": "Projets",
        "projects.roadeditor.title": "Application Road Editor",
        "projects.roadeditor.description":
          "Application de conception de sites robotisés. Développement d'une application pour concevoir et concevoir un site entier pour robots, définir les zones de stockage, les zones de palettes, les chemins de robots et les virages. Analyse des besoins spécifiques et des contraintes rencontrées par les clients sur site, avec mise en œuvre de solutions personnalisées. Optimisation des performances pour les sites clients complexes (nombre élevé de formulaires) en remplaçant la bibliothèque de rendu par Three.js pour une gestion 3D plus fluide et performante.",
        "projects.robotinterface.title": "Application Robot Interface Manager",
        "projects.robotinterface.description":
          "Une application de tableau de bord pour surveiller le statut des robots, les niveaux de batterie, les zones de stockage et les emplacements libres, gérant principalement les communications entre les robots et le système client. Elle permet également de créer des missions pour chaque robot et de visualiser l'espace de stockage disponible sur le site.",
        "projects.roi.title": "ROI Calculator",
        "projects.roi.description":
          "Une application permettant aux clients d'estimer, pour une évaluation préliminaire, le coût de remplacement de leurs opérateurs de chariots élévateurs par des robots Balyo, ainsi que le temps nécessaire pour rentabiliser leur investissement dans ces robots.",
        "projects.ycsos.title": "Ycsos",
        "projects.ycsos.description":
          "Une application conçue pour que le client l'utilise dans son travail pour collecter des informations et effectuer des calculs et estimations pour ses projets.",
        "projects.status.completed": "Terminé",
        "projects.status.inprogress": "En cours",
        "projects.status.planned": "Prévu",
        "projects.technologies": "Technologies utilisées:",
        "projects.placeholder": "Image du projet",
        "projects.actions.view": "Voir le projet",
        "projects.actions.source": "Code source",

        // Contact Section
        "contact.title": "Contact",
        "contact.info.title": "Informations de contact",
        "contact.info.description":
          "Je suis à la recherche d'un nouveau poste commençant dès que possible. N'hésitez pas à me contacter pour discuter d'opportunités professionnelles.",
        "contact.form.title": "Envoyez-moi un message",
        "contact.form.name": "Nom complet",
        "contact.form.email": "Email",
        "contact.form.subject": "Sujet",
        "contact.form.message": "Message",
        "contact.form.submit": "Envoyer le message",
        "contact.form.name.placeholder": "Votre nom complet",
        "contact.form.email.placeholder": "votre.email@example.com",
        "contact.form.subject.placeholder": "Sujet de votre message",
        "contact.form.message.placeholder": "Votre message...",
        "contact.labels.email": "Email",
        "contact.labels.phone": "Téléphone",
        "contact.labels.location": "Localisation",
        "contact.labels.linkedin": "LinkedIn",

        // Footer
        "footer.title": "Rahmad Abuzar",
        "footer.subtitle": "Développeur Fullstack Web et Mobile",
        "footer.subtitle2":
          "À la recherche d'un nouveau poste commençant dès que possible",
        "footer.navigation": "Navigation",
        "footer.contact": "Contact",
        "footer.copyright": "Rahmad Abuzar. Tous droits réservés.",
        "footer.developed": "Développé avec React, TypeScript et ❤️",
      },
      en: {
        // Navigation
        "nav.about": "About",
        "nav.education": "Education",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.contact": "Contact",

        // Hero Section
        "hero.greeting": "Hello, I am",
        "hero.name": "Rahmad Abuzar",
        "hero.title": "Fullstack Web and Mobile Developer",
        "hero.description":
          "Passionate about web and mobile development, I create modern and performant applications with React, TypeScript, Python and Django. Looking for a new position starting as soon as possible.",
        "hero.cta.projects": "View my projects",
        "hero.cta.contact": "Contact me",
        "hero.scroll": "Scroll",

        // About Section
        "about.title": "About me",
        "about.presentation": "Presentation",
        "about.presentation.text1":
          "I am Rahmad Abuzar, a fullstack developer passionate about web and mobile technologies. Aged 24, I am currently looking for a new position starting as soon as possible.",
        "about.presentation.text2":
          "My professional journey has allowed me to develop solid expertise in frontend development with React/TypeScript and backend with Python/Django. I have significant experience in creating modern and performant web applications.",
        "about.personal": "Personal information",
        "about.fullname": "Full name:",
        "about.age": "Age:",
        "about.location": "Location:",
        "about.phone": "Phone:",
        "about.email": "Email:",
        "about.linkedin": "LinkedIn:",

        // Education Section
        "education.title": "Education",
        "education.period.2021": "2021-2021",
        "education.period.2020": "2020-2021",
        "education.period.2019": "2019-2020",
        "education.period.2018": "2018",
        "education.webdev.title": "Web and Mobile Developer",
        "education.webdev.institution": "Konexio Paris",
        "education.webdev.description": "RNCP Level preparation (Bac +2)",
        "education.digistart.title": "DigiStart Training",
        "education.digistart.institution": "Konexio Paris",
        "education.digistart.description":
          "Introduction to code program (HTML, CSS, Javascript)",
        "education.fle.title": "French as a Foreign Language (FLE)",
        "education.fle.institution": "Ecole Thot Paris",
        "education.fle.description":
          "2 French language learning sessions (160h of training and 16h of professional skills enhancement workshops). DELF Level A2 passed",
        "education.tech.title": "Technology program",
        "education.tech.institution": "Fischerstromska High School",
        "education.tech.description": "Technology training at high school",
        "education.location.paris": "Paris, France",
        "education.location.sweden": "Sweden",

        // Experience Section
        "experience.title": "Professional Experience",
        "experience.balyo.period": "2022-2025",
        "experience.balyo.title": "Full Stack Developer",
        "experience.balyo.company": "Balyo",
        "experience.balyo.description":
          "Development of web and mobile applications for industrial robot management. Creation of modern user interfaces and robust APIs.",
        "experience.balyo.location": "France",
        "experience.datoscout.period": "2021-2022",
        "experience.datoscout.title": "Remote Developer Intern",
        "experience.datoscout.company": "Datoscout",
        "experience.datoscout.description":
          "Development and maintenance of the application used by Datoscout to advise clients and manage costs of their various projects.",
        "experience.datoscout.location": "Remote",
        "experience.hairdresser.period": "Not specified",
        "experience.hairdresser.title": "Hairdressing Assistant",
        "experience.hairdresser.company": "Karlskrona, Sweden",
        "experience.hairdresser.description":
          "Customer service and assistance in a hairdressing salon.",
        "experience.mcdonalds.period": "Not specified",
        "experience.mcdonalds.title": "Crew Member",
        "experience.mcdonalds.company": "McDonald's Karlskrona",
        "experience.mcdonalds.description":
          "Customer service at McDonald's counter. Order taking, cash handling, equipment and room maintenance.",
        "experience.elgiganten.period": "Not specified",
        "experience.elgiganten.title": "Computer Department Salesperson",
        "experience.elgiganten.company": "Elgiganten Karlskrona Store",
        "experience.elgiganten.description":
          "Computer department salesperson. Customer service, customer advice, shelf stocking.",
        "experience.technologies": "Technologies used:",
        "experience.location.karlskrona": "Karlskrona, Sweden",

        // Skills Section
        "skills.title": "Skills",
        "skills.technical": "Technical Skills",
        "skills.languages": "Languages",
        "skills.programming": "Programming Languages",
        "skills.development": "Development Environments",
        "skills.databases": "Databases",
        "skills.methodology": "Methodology",
        "skills.operating": "Operating Systems",
        "skills.language.french": "French",
        "skills.language.english": "English",
        "skills.language.swedish": "Swedish",
        "skills.language.farsi": "Farsi",
        "skills.level.delf_b1": "DELF B1",
        "skills.level.toeic_b2": "TOEIC B2",
        "skills.level.bilingual": "Bilingual",

        // Projects Section
        "projects.title": "Projects",
        "projects.roadeditor.title": "Road Editor Application",
        "projects.roadeditor.description":
          "Robotic site design application. Development of an application to design and conceive an entire site for robots, defining storage zones, pallet zones, robot paths and turns. Analysis of specific needs and constraints encountered by clients on site, with implementation of custom solutions. Performance optimization for complex client sites (high number of forms) by replacing the rendering library with Three.js for smoother and more performant 3D management.",
        "projects.robotinterface.title": "Robot Interface Manager Application",
        "projects.robotinterface.description":
          "A dashboard application to monitor robot status, battery levels, storage zones and free locations, primarily managing communications between robots and the client system. It also allows creating missions for each robot and visualizing available storage space on the site.",
        "projects.roi.title": "ROI Calculator",
        "projects.roi.description":
          "An application allowing clients to estimate, for a preliminary evaluation, the cost of replacing their forklift operators with Balyo robots, as well as the time needed to make their investment in these robots profitable.",
        "projects.ycsos.title": "Ycsos",
        "projects.ycsos.description":
          "An application designed for the client to use in their work to collect information and perform calculations and estimations for their projects.",
        "projects.status.completed": "Completed",
        "projects.status.inprogress": "In Progress",
        "projects.status.planned": "Planned",
        "projects.technologies": "Technologies used:",
        "projects.placeholder": "Project image",
        "projects.actions.view": "View project",
        "projects.actions.source": "Source code",

        // Contact Section
        "contact.title": "Contact",
        "contact.info.title": "Contact information",
        "contact.info.description":
          "I am looking for a new position starting as soon as possible. Feel free to contact me to discuss professional opportunities.",
        "contact.form.title": "Send me a message",
        "contact.form.name": "Full name",
        "contact.form.email": "Email",
        "contact.form.subject": "Subject",
        "contact.form.message": "Message",
        "contact.form.submit": "Send message",
        "contact.form.name.placeholder": "Your full name",
        "contact.form.email.placeholder": "your.email@example.com",
        "contact.form.subject.placeholder": "Subject of your message",
        "contact.form.message.placeholder": "Your message...",
        "contact.labels.email": "Email",
        "contact.labels.phone": "Phone",
        "contact.labels.location": "Location",
        "contact.labels.linkedin": "LinkedIn",

        // Footer
        "footer.title": "Rahmad Abuzar",
        "footer.subtitle": "Fullstack Web and Mobile Developer",
        "footer.subtitle2":
          "Looking for a new position starting as soon as possible",
        "footer.navigation": "Navigation",
        "footer.contact": "Contact",
        "footer.copyright": "Rahmad Abuzar. All rights reserved.",
        "footer.developed": "Developed with React, TypeScript and ❤️",
      },
    };

    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
