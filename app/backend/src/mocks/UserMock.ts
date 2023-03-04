import UserModel from '../database/models/UserModel';

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
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
} as UserModel;

export { invalidEmail, invalidPassword, correct };
