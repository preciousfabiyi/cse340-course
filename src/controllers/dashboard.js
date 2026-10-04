const showDashboardPage = (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
  });
};

export {
  showDashboardPage,
};