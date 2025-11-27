// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me'
  },
  BLOG: {
    LIST: '/blog',
    DETAIL: (id) => `/blog/${id}`,
    FEATURED: '/blog/featured/list'
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id) => `/projects/${id}`
  },
  ADMIN: {
    BLOG: {
      LIST: '/blog/admin/list',
      CREATE: '/blog',
      UPDATE: (id) => `/blog/${id}`,
      DELETE: (id) => `/blog/${id}`
    },
    PROJECTS: {
      LIST: '/projects',
      CREATE: '/projects',
      UPDATE: (id) => `/projects/${id}`,
      DELETE: (id) => `/projects/${id}`
    }
  }
};

// Project Categories
export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'other', label: 'Other' }
];

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  BLOG_LIMIT: 9,
  PROJECT_LIMIT: 12
};

