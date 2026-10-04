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
const router = express.Router();
router.get('/register', showRegisterPage);
router.post('/register', registerAccount);

router.get('/login', showLoginPage);
router.post('/login', loginAccount);

router.get('/logout', logoutAccount);
import { testErrorPage } from './controllers/errors.js';
import {
  requireLogin,
  requireRole,
} from './middleware/auth.js';
import { showUsersPage } from './controllers/users.js';

router.get('/', showHomePage);

router.get('/dashboard', requireLogin, showDashboardPage);
router.get(
  '/users',
  requireLogin,
  requireRole('Admin'),
  showUsersPage,
);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationPage);
router.post('/new-organization', createNewOrganization);

router.get('/edit-organization/:id', showEditOrganizationPage);
router.post('/edit-organization/:id', updateExistingOrganization);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', showNewProjectPage);
router.post('/new-project', createNewProject);

router.get('/edit-project/:id', showEditProjectPage);
router.post('/edit-project/:id', updateExistingProject);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', showNewCategoryPage);
router.post('/new-category', createNewCategory);

router.get('/edit-category/:id', showEditCategoryPage);
router.post('/edit-category/:id', updateExistingCategory);

// error-handling route
router.get('/test-error', testErrorPage);


export default router;