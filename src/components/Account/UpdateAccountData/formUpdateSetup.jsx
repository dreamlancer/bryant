import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'First Name',
    rules: 'string',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Last Name',
    rules: 'string',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'email|string',
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '072..',
    rules: 'numeric',
  },
];

export { plugins, fields };
