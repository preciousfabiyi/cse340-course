import express from 'express';
import { showHomePage } from './controllers/index.js';
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
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

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