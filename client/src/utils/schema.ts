import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters.')
    .max(32, 'Username cannot be longer than 32 characters.'),
  email: yup
    .string()
    .required('Email is required.')
    .email('Email must be a valid email address.')
    .lowercase('Email must be in lowercase.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password cannot be longer than 32 characters.'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('password')], 'Password confirmation does not match password.'),
});

export const signInSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters.')
    .max(32, 'Username cannot be longer than 32 characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password cannot be longer than 32 characters.'),
});

export const changeProfileSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters.')
    .max(32, 'Username cannot be longer than 32 characters.'),
  email: yup
    .string()
    .required('Email is required.')
    .email('Email must be a valid email address.')
    .lowercase('Email must be in lowercase.'),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password cannot be longer than 32 characters.'),
  password: yup
    .string()
    .required('New password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password cannot be longer than 32 characters.'),
  passwordConfirm: yup
    .string()
    .required('New password confirmation is required.')
    .oneOf([yup.ref('password')], 'Password confirmation does not match password.'),
});

export const todoSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required.')
    .max(32, 'Title cannot be longer than 32 characters.'),
  // description: yup.string().max(256, 'Description cannot be longer than 256 characters.'),
});
