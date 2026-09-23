import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  createCategory,
  updateCategory,
} from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Categories';
  res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = category.name;
  res.render('category', { title, category, projects });
};

const showNewCategoryPage = (req, res) => {
  const title = 'New Category';
  res.render('new-category', { title });
};

const createNewCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name.length > 100 || name.length < 3) {
    const title = 'New Category';
    res.status(400).render('new-category', {
      title,
      errors: ['Category name must be between 3 and 100 characters.'],
      name,
    });
    return;
  }

  await createCategory(name);
  res.redirect('/categories');
};

const showEditCategoryPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  const title = 'Edit Category';

  res.render('edit-category', {
    title,
    category,
  });
};

const updateExistingCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  if (!name || name.length > 100 || name.length < 3) {
    const title = 'Edit Category';

    res.status(400).render('edit-category', {
      title,
      errors: ['Category name must be between 3 and 100 characters.'],
      category: {
        category_id: categoryId,
        name,
      },
    });
    return;
  }

  await updateCategory(categoryId, name);
  res.redirect('/categories');
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryPage,
  createNewCategory,
  showEditCategoryPage,
  updateExistingCategory,
};