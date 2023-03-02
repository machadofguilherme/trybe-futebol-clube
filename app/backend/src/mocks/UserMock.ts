const correctEmail = 'admin@admin.com';

const invalidEmail = {
  email: 'adminadmin.com',
  password: 'secret_admin',
};

const invalidPassword = {
  email: correctEmail,
  password: 's',
};

const correct = {
  email: 'harry@potter.com',
  password: 'secret_admin',
};

export { invalidEmail, invalidPassword, correct };
