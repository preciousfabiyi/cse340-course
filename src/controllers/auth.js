import bcrypt from 'bcrypt';
import {
  getAccountByEmail,
  createAccount,
} from '../models/accounts.js';

const showRegisterPage = (req, res) => {
  res.render('register', {
    title: 'Register',
    errors: [],
    account: {},
  });
};

const registerAccount = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
  } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).render('register', {
      title: 'Register',
      errors: ['Please complete all fields.'],
      account: {
        first_name,
        last_name,
        email,
      },
    });
  }

  const existingAccount = await getAccountByEmail(email);

  if (existingAccount) {
    return res.status(400).render('register', {
      title: 'Register',
      errors: ['An account with that email already exists.'],
      account: {
        first_name,
        last_name,
        email,
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createAccount(
    first_name,
    last_name,
    email,
    hashedPassword,
  );

  req.session.message = 'Registration successful. Please log in.';
  res.redirect('/login');
};

const showLoginPage = (req, res) => {
  res.render('login', {
    title: 'Login',
    errors: [],
  });
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('login', {
      title: 'Login',
      errors: ['Please enter your email and password.'],
    });
  }

  const account = await getAccountByEmail(email);

  if (!account) {
    return res.status(401).render('login', {
      title: 'Login',
      errors: ['Invalid email or password.'],
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    account.password,
  );

  if (!passwordMatches) {
    return res.status(401).render('login', {
      title: 'Login',
      errors: ['Invalid email or password.'],
    });
  }

  req.session.user = {
    account_id: account.account_id,
    first_name: account.first_name,
    last_name: account.last_name,
    email: account.email,
    role: account.role,
  };

  req.session.message = 'You have successfully logged in.';

  res.redirect('/dashboard');
};

const logoutAccount = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

export {
  showRegisterPage,
  registerAccount,
  showLoginPage,
  loginAccount,
  logoutAccount,
};