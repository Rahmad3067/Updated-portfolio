import { KnowledgeBase } from "./knowledgeBase";

export const calculateScore = (question: string, entry: KnowledgeBase): number => {
  const lowerQuestion = question.toLowerCase();
  let score = 0;

  // Count exact matches for all keywords
  for (const keyword of entry.keywords) {
    if (lowerQuestion.includes(keyword)) {
      // Longer keywords get higher priority
      score += keyword.length;
    }
  }

  // Bonus for more specific matches (projects, experience, etc.)
  const specificTerms: Record<string, number> = {
    "projects": 50,
    "projets": 50,
    "project": 45,
    "projet": 45,
    "tell me about": 60,
    "parle-moi": 60,
    "about your": 55,
    "your projects": 55,
    "tes projets": 55,
    "application": 30,
    "applications": 30,
    "app": 20,
    "portfolio": 40,
    "work": 35,
  };

  for (const [term, bonus] of Object.entries(specificTerms)) {
    if (lowerQuestion.includes(term) && entry.category === "projects") {
      score += bonus;
    }
  }

  // Bonus for contact-related questions
  const contactTerms: Record<string, number> = {
    "contact": 50,
    "contacter": 50,
    "email": 40,
    "phone": 40,
    "téléphone": 40,
    "linkedin": 40,
    "call": 30,
    "appeler": 30,
  };

  for (const [term, bonus] of Object.entries(contactTerms)) {
    if (lowerQuestion.includes(term) && entry.category === "contact") {
      score += bonus;
    }
  }

  // Bonus for skills-related questions
  const skillTerms: Record<string, number> = {
    "skills": 50,
    "compétences": 50,
    "skill": 45,
    "compétence": 45,
    "technologies": 40,
    "technologie": 40,
    "tech": 30,
  };

  for (const [term, bonus] of Object.entries(skillTerms)) {
    if (lowerQuestion.includes(term) && entry.category === "skills") {
      score += bonus;
    }
  }

  // Bonus for experience-related questions
  const experienceTerms: Record<string, number> = {
    "experience": 50,
    "expérience": 50,
    "work": 40,
    "travail": 40,
    "job": 30,
    "emploi": 30,
    "company": 35,
    "entreprise": 35,
    "balyo": 50,
    "datoscout": 50,
    "companies": 35,
    "entreprises": 35,
  };

  for (const [term, bonus] of Object.entries(experienceTerms)) {
    if (lowerQuestion.includes(term) && entry.category === "experience") {
      score += bonus;
    }
  }

  return score;
};

export const findBestMatch = (question: string, knowledgeBase: KnowledgeBase[]): KnowledgeBase | null => {
  let bestMatch: KnowledgeBase | null = null;
  let maxScore = 0;

  for (const entry of knowledgeBase) {
    const score = calculateScore(question, entry);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
};

