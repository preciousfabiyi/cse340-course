import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showDashboardPage } from './controllers/dashboard.js';

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationPage,
  createNewOrganization,
  showEditOrganizationPage,
  updateExistingOrganization,
} from './controllers/organizations.js';

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectPage,
  createNewProject,
  showEditProjectPage,
  updateExistingProject,
} from './controllers/projects.js';

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryPage,
  createNewCategory,
  showEditCategoryPage,
  updateExistingCategory,
} from './controllers/categories.js';

import {
  showRegisterPage,
  registerAccount,
  showLoginPage,
  loginAccount,
  logoutAccount,
} from './controllers/auth.js';

import { showUsersPage } from './controllers/users.js';
import { testErrorPage } from './controllers/errors.js';

import {
  requireLogin,
  requireRole,
} from './middleware/auth.js';

const router = express.Router();

// Authentication routes
router.get('/register', showRegisterPage);
router.post('/register', registerAccount);

router.get('/login', showLoginPage);
router.post('/login', loginAccount);

router.get('/logout', logoutAccount);

// Home and dashboard
router.get('/', showHomePage);

router.get(
  '/dashboard',
  requireLogin,
  showDashboardPage,
);

// Admin-only users page
router.get(
  '/users',
  requireLogin,
  requireRole('Admin'),
  showUsersPage,
);

// Organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get(
  '/new-organization',
  requireLogin,
  requireRole('Admin'),
  showNewOrganizationPage,
);

router.post(
  '/new-organization',
  requireLogin,
  requireRole('Admin'),
  createNewOrganization,
);

router.get(
  '/edit-organization/:id',
  requireLogin,
  requireRole('Admin'),
  showEditOrganizationPage,
);

router.post(
  '/edit-organization/:id',
  requireLogin,
  requireRole('Admin'),
  updateExistingOrganization,
);

// Project routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get(
  '/new-project',
  requireLogin,
  requireRole('Admin'),
  showNewProjectPage,
);

router.post(
  '/new-project',
  requireLogin,
  requireRole('Admin'),
  createNewProject,
);

router.get(
  '/edit-project/:id',
  requireLogin,
  requireRole('Admin'),
  showEditProjectPage,
);

router.post(
  '/edit-project/:id',
  requireLogin,
  requireRole('Admin'),
  updateExistingProject,
);
// Category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Admin-only category creation
router.get(
  '/new-category',
  requireLogin,
  requireRole('Admin'),
  showNewCategoryPage,
);

router.post(
  '/new-category',
  requireLogin,
  requireRole('Admin'),
  createNewCategory,
);

// Admin-only category editing
router.get(
  '/edit-category/:id',
  requireLogin,
  requireRole('Admin'),
  showEditCategoryPage,
);

router.post(
  '/edit-category/:id',
  requireLogin,
  requireRole('Admin'),
  updateExistingCategory,
);

// Error testing route
router.get('/test-error', testErrorPage);

export default router;