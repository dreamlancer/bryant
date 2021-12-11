import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'firstName',
    label: 'First name',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'lastName',
    label: 'Last name',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'telephone',
    label: 'Phone',
    placeholder: '',
    rules: 'required|string|numeric|min:9',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: '',
    rules: 'required|email|string',
  },
  {
    name: 'returnReason',
    label: 'Return Reason',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'orderNumber',
    label: 'Order Number',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'address_1',
    label: 'Street Address',
    placeholder: 'Address',
    rules: 'required|string',
  },
  {
    name: 'address_2',
    label: 'City',
    placeholder: 'City',
    rules: 'string',
  },
  {
    name: 'city',
    label: 'County/state',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'state',
    label: 'State',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'postCode',
    label: 'Zip/Postal Code',
    placeholder: '',
    rules: 'required|string',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: '',
    rules: 'required|string',
  },
];

export { plugins, fields };
