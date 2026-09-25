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

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
}