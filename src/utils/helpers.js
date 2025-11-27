// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format date to short string
export const formatDateShort = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Parse comma-separated string to array
export const parseCommaSeparated = (str) => {
  if (!str) return [];
  return str.split(',').map(item => item.trim()).filter(item => item);
};

// Format array to comma-separated string
export const formatCommaSeparated = (arr) => {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join(', ');
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get error message from API response
export const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.message || 'An error occurred';
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

