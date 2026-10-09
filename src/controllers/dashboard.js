import { getProjectsByVolunteer } from '../models/projects.js';

const showDashboardPage = async (req, res) => {
  const accountId = req.session.user.account_id;

  const projects = await getProjectsByVolunteer(accountId);

  res.render('dashboard', {
    title: 'Dashboard',
    projects,
  });
};

export {
  showDashboardPage,
};