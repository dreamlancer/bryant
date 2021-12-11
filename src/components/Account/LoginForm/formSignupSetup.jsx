import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'firstName',
    label: 'First name',
    placeholder: 'First name',
    rules: 'required|string',
  },
  {
    name: 'lastName',
    label: 'Last name',
    placeholder: 'Last name',
    rules: 'required|string',
  },
  {
    name: 'telephone',
    label: 'Phone',
    placeholder: '0732',
    rules: 'required|numeric',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|email|string',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: '****',
    rules: 'required',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: '****',
    rules: 'required',
  },
];

export { plugins, fields };
