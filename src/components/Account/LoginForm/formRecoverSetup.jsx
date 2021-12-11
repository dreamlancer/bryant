import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|email|string',
  },
];

export { plugins, fields };
