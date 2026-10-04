const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.session.message = 'Please log in to access this page.';
    return res.redirect('/login');
  }

  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      req.session.message = 'Please log in to access this page.';
      return res.redirect('/login');
    }

    if (req.session.user.role !== role) {
      req.session.message = 'You do not have permission to access that page.';
      return res.redirect('/dashboard');
    }

    next();
  };
};

export {
  requireLogin,
  requireRole,
};