import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [
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
];

export { plugins, fields };
