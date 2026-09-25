// Import any needed model functions
import {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
  updateOrganization,
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Organizations';

    res.render('organizations', { title, organizations });
};


const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

const showNewOrganizationPage = (req, res) => {
  const title = 'New Organization';

  res.render('new-organization', {
    title,
  });
};

const createNewOrganization = async (req, res) => {
  const {
    name,
    description,
    contact_email,
    logo_filename,
  } = req.body;

  if (
    !name ||
    name.length > 100 ||
    !description ||
    !contact_email
  ) {
    const title = 'New Organization';

    res.status(400).render('new-organization', {
      title,
      errors: ['Please complete all required organization fields.'],
      organization: {
        name,
        description,
        contact_email,
        logo_filename,
      },
    });

    return;
  }

  await createOrganization(
    name,
    description,
    contact_email,
    logo_filename,
  );

  res.redirect('/organizations');
};

const showEditOrganizationPage = async (req, res) => {
  const organizationId = req.params.id;
  const organization = await getOrganizationDetails(organizationId);
  const title = 'Edit Organization';

  res.render('edit-organization', {
    title,
    organization,
  });
};

const updateExistingOrganization = async (req, res) => {
  const organizationId = req.params.id;

  const {
    name,
    description,
    contact_email,
    logo_filename,
  } = req.body;

  if (
    !name ||
    name.length > 100 ||
    !description ||
    !contact_email
  ) {
    const title = 'Edit Organization';

    res.status(400).render('edit-organization', {
      title,
      errors: ['Please complete all required organization fields.'],
      organization: {
        organization_id: organizationId,
        name,
        description,
        contact_email,
        logo_filename,
      },
    });

    return;
  }

  await updateOrganization(
    organizationId,
    name,
    description,
    contact_email,
    logo_filename,
  );

  res.redirect('/organizations');
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationPage,
  createNewOrganization,
  showEditOrganizationPage,
  updateExistingOrganization,
};