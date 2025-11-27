# Frontend - Portfolio & Blog

React frontend application for the Portfolio & Blog system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Pages

- **Home**: Landing page with featured projects and latest blog posts
- **Blog**: List of all blog posts (pagination + featured posts)
- **Blog Post**: Individual blog post view with comments
- **Projects**: Project gallery with filters
- **Project Details**: Individual project view with technology tags
- **Contact**: Contact form that posts to the backend API
- **Login/Register**: Authentication page with mode toggle and `/register` route
- **Admin**: Manage blog posts, projects, and contact messages (admin only)

