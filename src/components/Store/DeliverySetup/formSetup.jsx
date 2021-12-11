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
    name: 'mobile',
    label: 'Mobile',
    placeholder: '072',
    rules: 'required|string|numeric|min:9',
  },
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Bob',
    rules: 'required|string|alpha',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
    rules: 'required|string|alpha',
  },
  {
    name: 'country',
    label: 'Country',
    rules: 'required|string',
  },
  {
    name: 'zone',
    label: 'County/state',
    rules: 'string',
  },
  {
    name: 'address_1',
    label: 'Address 1',
    placeholder: 'Address',
    rules: 'required|string',
  },
  {
    name: 'address_2',
    label: 'Address 2',
    placeholder: 'Address',
    rules: 'string',
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'City',
    rules: 'required|string',
  },
  {
    name: 'postal_code',
    label: 'Postal code',
    placeholder: 'E1 ...',
    rules: 'required|string',
  },
  {
    name: 'billing_country',
    label: 'Country',
    rules: '',
  },
  {
    name: 'billing_zone',
    label: 'County/state',
    rules: '',
  },
  {
    name: 'billing_address_1',
    label: 'Address 1',
    placeholder: 'Address',
    rules: '',
  },
  {
    name: 'billing_address_2',
    label: 'Address 2',
    placeholder: 'Address',
    rules: '',
  },
  {
    name: 'billing_city',
    label: 'City',
    placeholder: 'City',
    rules: '',
  },
  {
    name: 'billing_postal_code',
    label: 'Postal code',
    placeholder: 'E1 ...',
    rules: '',
  },
];

export { plugins, fields };
