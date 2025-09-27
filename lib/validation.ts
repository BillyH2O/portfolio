// Validation utilities

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const errors: string[] = [];

  if (!formData.name?.trim()) {
    errors.push('Le nom est requis');
  }

  if (!formData.email?.trim()) {
    errors.push('L\'email est requis');
  } else if (!isValidEmail(formData.email)) {
    errors.push('Format d\'email invalide');
  }

  if (!formData.subject?.trim()) {
    errors.push('Le sujet est requis');
  }

  if (!formData.message?.trim()) {
    errors.push('Le message est requis');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};


