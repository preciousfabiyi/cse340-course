import { getAllAccounts } from '../models/accounts.js';

const showUsersPage = async (req, res) => {
  const users = await getAllAccounts();

  res.render('users', {
    title: 'Users',
    users,
  });
};

export {
  showUsersPage,
};