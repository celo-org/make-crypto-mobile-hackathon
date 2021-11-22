import 'package:pixcripto/styles.dart';

var currencyInfo = {
  'CUSD': {
    'code': 'CUSD',
    'name': 'Celo Dollar',
    'pluralName': 'Celo Dollars',
    'symbol': 'CUSD',
    'precision': 2,
  },
  'MCO2': {
    'code': 'MCO2',
    'name': 'Moss Carbon Credit',
    'pluralName': 'Moss Carbon Credits',
    'symbol': 'MCO2',
    'precision': 4,
  },
  'BRL': {
    'code': 'BRL',
    'name': 'Real',
    'pluralName': 'Reais',
    'symbol': 'R\$',
    'precision': 2,
  },
};

class BN {
  String currency;
  num amount;

  BN(this.amount, this.currency);

  Map get _currencyData {
    return currencyInfo.values
        .firstWhere((element) => element['code'] == this.currency);
  }

  String? get symbol {
    return _currencyData['symbol'] as String;
  }

  String toCurrencyFixed() {
    var precision = _currencyData['precision']! as int;
    return this.amount.toStringAsFixed(precision);
  }

  String toCurrencyLocale() {
    if (this.currency == 'BRL') {
      return AppFormats.moneyFormat.format(this.amount);
    } else {
      return '${this.symbol} ${this.toCurrencyFixed()}';
    }
  }
}
