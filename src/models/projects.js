import db from './db.js'

const getAllProjects = async () => {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM project AS p
    JOIN organization AS o
      ON p.organization_id = o.organization_id
    ORDER BY p.date;
  `
  const result = await db.query(query)
  return result.rows
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM project
    WHERE organization_id = $1
    ORDER BY date;
  `
  const queryParams = [organizationId]
  const result = await db.query(query, queryParams)
  return result.rows
}

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM project AS p
    JOIN organization AS o
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `
  const queryParams = [number_of_projects]
  const result = await db.query(query, queryParams)
  return result.rows
}

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM project AS p
    JOIN organization AS o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `
  const queryParams = [id]
  const result = await db.query(query, queryParams)
  return result.rows[0]
}

const createProject = async (
  organizationId,
  title,
  description,
  location,
  date,
) => {
  const query = `
    INSERT INTO project (
      organization_id,
      title,
      description,
      location,
      date
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      project_id,
      organization_id,
      title,
      description,
      location,
      date;
  `

  const queryParams = [
    organizationId,
    title,
    description,
    location,
    date,
  ]

  const result = await db.query(query, queryParams)
  return result.rows[0]
}

const addProjectCategory = async (projectId, categoryId) => {
  const query = `
    INSERT INTO project_category (project_id, category_id)
    VALUES ($1, $2);
  `

  await db.query(query, [projectId, categoryId])
}

const deleteProjectCategories = async (projectId) => {
  const query = `
    DELETE FROM project_category
    WHERE project_id = $1;
  `

  await db.query(query, [projectId])
}

const updateProject = async (
  projectId,
  organizationId,
  title,
  description,
  location,
  date,
) => {
  const query = `
    UPDATE project
    SET
      organization_id = $1,
      title = $2,
      description = $3,
      location = $4,
      date = $5
    WHERE project_id = $6
    RETURNING
      project_id,
      organization_id,
      title,
      description,
      location,
      date;
  `

  const queryParams = [
    organizationId,
    title,
    description,
    location,
    date,
    projectId,
  ]

    const result = await db.query(query, queryParams)
  return result.rows[0]
}

const addVolunteer = async (accountId, projectId) => {
  const query = `
    INSERT INTO project_volunteer (account_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (account_id, project_id) DO NOTHING;
  `

  await db.query(query, [accountId, projectId])
}

const removeVolunteer = async (accountId, projectId) => {
  const query = `
    DELETE FROM project_volunteer
    WHERE account_id = $1
    AND project_id = $2;
  `

  await db.query(query, [accountId, projectId])
}

const getProjectsByVolunteer = async (accountId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM project_volunteer pv
    JOIN project p
      ON pv.project_id = p.project_id
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE pv.account_id = $1
    ORDER BY p.date;
  `

  const result = await db.query(query, [accountId])
  return result.rows
}

const isVolunteer = async (accountId, projectId) => {
  const query = `
    SELECT 1
    FROM project_volunteer
    WHERE account_id = $1
    AND project_id = $2;
  `

  const result = await db.query(query, [accountId, projectId])

  return result.rowCount > 0
}

export {
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
  getProjectsByVolunteer,
  isVolunteer,
}