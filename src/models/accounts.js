import db from './db.js';

const getAllAccounts = async () => {
  const query = `
    SELECT
      account_id,
      first_name,
      last_name,
      email,
      role
    FROM public.account
    ORDER BY last_name, first_name;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getAccountByEmail = async (email) => {
  const query = `
    SELECT
      account_id,
      first_name,
      last_name,
      email,
      password,
      role
    FROM public.account
    WHERE email = $1;
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
};

const createAccount = async (
  firstName,
  lastName,
  email,
  password,
  role = 'Client',
) => {

  const query = `
    INSERT INTO public.account (
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      account_id,
      first_name,
      last_name,
      email,
      role;
  `;

  const result = await db.query(query, [
    firstName,
    lastName,
    email,
    password,
    role,
  ]);

  return result.rows[0];
};

export {
  getAllAccounts,
  getAccountByEmail,
  createAccount,
};