function formatPriceBN(value) {
  if (isNaN(value)) {
    return value;
  } else {
    if (value < 1 && value > 0) {
      return Number(Number(value).toFixed(6));
    } else {
      return Number(Number(value).toFixed(2));
    }
  }
}

function formatPrice(value) {
  if (isNaN(value)) {
    return value;
  } else {
    if (value < 0.01 && value > 0) {
      // Small prices
      return '$' + Number(value).toFixed(6);
    } else {
      return new Intl.NumberFormat(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      ).format(value);
    }
  }
}

export default {
  formatPrice,
  formatPriceBN,
};
