import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `;
  const result = await db.query(query);
  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM public.category
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM public.category AS c
    INNER JOIN public.project_category AS pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title
    FROM public.project AS p
    INNER JOIN public.project_category AS pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO public.category (name)
    VALUES ($1)
    RETURNING category_id, name;
  `;
  const result = await db.query(query, [name]);
  return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE public.category
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id, name;
  `;
  const result = await db.query(query, [name, categoryId]);
  return result.rows[0];
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  createCategory,
  updateCategory,
};