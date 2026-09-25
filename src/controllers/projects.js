import {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
} from '../models/projects.js';

import { getAllOrganizations } from '../models/organizations.js';

import { getCategoriesByProjectId } from '../models/categories.js';
// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define any controller functions
const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';
  res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const categories = await getCategoriesByProjectId(projectId);
  const title = project.title;

  res.render('project', { title, project, categories });
};

const showNewProjectPage = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'New Service Project';

  res.render('new-project', {
    title,
    organizations,
  });
};

const createNewProject = async (req, res) => {
  const {
    organization_id,
    title,
    description,
    location,
    date,
  } = req.body;

  if (
    !organization_id ||
    !title ||
    title.length > 150 ||
    !description ||
    !location ||
    location.length > 200 ||
    !date
  ) {
    const organizations = await getAllOrganizations();

    res.status(400).render('new-project', {
      title: 'New Service Project',
      organizations,
      errors: ['Please complete all required project fields.'],
      project: {
        organization_id,
        title,
        description,
        location,
        date,
      },
    });

    return;
  }

  await createProject(
    organization_id,
    title,
    description,
    location,
    date,
  );

  res.redirect('/projects');
};

const showEditProjectPage = async (req, res) => {
  const projectId = req.params.id;
  const project = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();
  const title = 'Edit Service Project';

  res.render('edit-project', {
    title,
    project,
    organizations,
  });
};

const updateExistingProject = async (req, res) => {
  const projectId = req.params.id;

  const {
    organization_id,
    title,
    description,
    location,
    date,
  } = req.body;

  if (
    !organization_id ||
    !title ||
    title.length > 150 ||
    !description ||
    !location ||
    location.length > 200 ||
    !date
  ) {
    const organizations = await getAllOrganizations();

    res.status(400).render('edit-project', {
      title: 'Edit Service Project',
      organizations,
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

  res.redirect('/projects');
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectPage,
  createNewProject,
  showEditProjectPage,
  updateExistingProject,
};