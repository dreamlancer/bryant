const GBPFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
});

const formatPrice = (value, currencyName = 'gbp') => {
  // so not to create multiple instances of formatters:
  const formatters = {
    gbp: GBPFormatter,
  }[currencyName];

  return formatters.format(value);
};

export default formatPrice;
