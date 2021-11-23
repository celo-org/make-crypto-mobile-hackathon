export const getColor = (name) => {
  switch (name) {
    case 'binance':
      return '#ffc245';
    case 'coinbase':
      return '#0a44de';
    case 'ftx':
      return '#01f9ff';
    default:
      return name;
  }
}

