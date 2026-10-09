import {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  addProjectCategory,
  deleteProjectCategories,
  updateProject,
  addVolunteer,
  removeVolunteer,
  isVolunteer,
} from '../models/projects.js';

import { getAllOrganizations } from '../models/organizations.js';
import { getAllCategories } from '../models/categories.js';
import { getCategoriesByProjectId } from '../models/categories.js';

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display all upcoming projects
const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

// Display project details
const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const categories = await getCategoriesByProjectId(projectId);
  const title = project.title;

  let volunteering = false;

  if (req.session.user) {
    volunteering = await isVolunteer(
      req.session.user.account_id,
      projectId,
    );
  }

  res.render('project', {
    title,
    project,
    categories,
    volunteering,
  });
};

// Display new project form
const showNewProjectPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const categories = await getAllCategories();
  const title = 'New Service Project';

  res.render('new-project', {
    title,
    organizations,
    categories,
  });
};

// Create a new project
const createNewProject = async (req, res) => {
  const {
    organization_id,
    title,
    description,
    location,
    date,
    category_ids,
  } = req.body;

  if (
    !organization_id ||
    !title ||
    title.length > 150 ||
    !description ||
    !location ||
    location.length > 200 ||
    !date ||
    !category_ids
  ) {
    const organizations = await getAllOrganizations();
    const categories = await getAllCategories();

    res.status(400).render('new-project', {
      title: 'New Service Project',
      organizations,
      categories,
      errors: ['Please complete all required project fields.'],
      project: {
        organization_id,
        title,
        description,
        location,
        date,
        category_ids,
      },
    });

    return;
  }

  const newProject = await createProject(
    organization_id,
    title,
    description,
    location,
    date,
  );

  const projectId = newProject.project_id;

  for (const categoryId of category_ids) {
    await addProjectCategory(projectId, categoryId);
  }

  req.session.message = 'Project successfully created.';

  res.redirect('/projects');
};

// Display edit project form
const showEditProjectPage = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();
  const categories = await getAllCategories();
  const selectedCategories = await getCategoriesByProjectId(projectId);
  const title = 'Edit Service Project';

  res.render('edit-project', {
    title,
    project,
    organizations,
    categories,
    selectedCategories,
  });
};

// Update an existing project
const updateExistingProject = async (req, res) => {
  const projectId = req.params.id;

  const {
    organization_id,
    title,
    description,
    location,
    date,
    category_ids,
  } = req.body;

  if (
    !organization_id ||
    !title ||
    title.length > 150 ||
    !description ||
    !location ||
    location.length > 200 ||
    !date ||
    !category_ids
  ) {
    const organizations = await getAllOrganizations();
    const categories = await getAllCategories();

    res.status(400).render('edit-project', {
      title: 'Edit Service Project',
      organizations,
      categories,
      selectedCategories: [],
      errors: ['Please complete all required project fields.'],
      project: {
        project_id: projectId,
        organization_id,
        title,
        description,
        location,
        date,
      },
    });

    return;
  }

  await updateProject(
    projectId,
    organization_id,
    title,
    description,
    location,
    date,
  );

  await deleteProjectCategories(projectId);

  for (const categoryId of category_ids) {
    await addProjectCategory(projectId, categoryId);
  }

  req.session.message = 'Project successfully updated.';

  res.redirect('/projects');
};

// Volunteer for a project
const volunteerForProject = async (req, res) => {
  const accountId = req.session.user.account_id;
  const projectId = req.params.id;

  await addVolunteer(accountId, projectId);

  req.session.message = 'You have successfully volunteered for this project.';

  res.redirect(`/project/${projectId}`);
};

// Remove yourself as a volunteer
const removeVolunteerFromProject = async (req, res) => {
  const accountId = req.session.user.account_id;
  const projectId = req.params.id;

  await removeVolunteer(accountId, projectId);

  req.session.message = 'You are no longer volunteering for this project.';

  res.redirect(`/project/${projectId}`);
};


export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectPage,
  createNewProject,
  showEditProjectPage,
  updateExistingProject,
  volunteerForProject,
  removeVolunteerFromProject,
};