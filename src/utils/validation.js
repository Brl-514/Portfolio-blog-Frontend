/**
 * Frontend validation utilities
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getValidationErrors = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (value && rule.email && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `Must be at least ${rule.minLength} characters`;
      return;
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Must be no more than ${rule.maxLength} characters`;
      return;
    }
    
    if (value && rule.url && !validateUrl(value)) {
      errors[field] = 'Invalid URL format';
      return;
    }
  });
  
  return errors;
};

