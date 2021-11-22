import 'dart:async';

import 'package:mobx/mobx.dart';
import 'package:pixcripto/services/pixcripto_api.dart';
part 'user_store.g.dart';

class Balances {
  num CUSD;
  num MCO2;
  num totalinbrl;

  Balances({required this.MCO2, required this.CUSD, required this.totalinbrl});

  factory Balances.fromJson(dynamic parsedJson) {
    return Balances(
      MCO2: parsedJson['MCO2'] as num,
      CUSD: parsedJson['CUSD'] as num,
      totalinbrl: parsedJson['totalinbrl'] as num,
    );
  }
}

class UserStore = _UserStoreBase with _$UserStore;

abstract class _UserStoreBase with Store {
  PixCriptoAPI pixCriptoApi;

  late Timer balancesTimer;

  _UserStoreBase(this.pixCriptoApi);

  void loggedIn() {
    this.balancesTimer = Timer.periodic(new Duration(seconds: 5), (_) {
      this.loadBalances();
    });

    this.loadBalances();
    this.loadUser();
  }

  void loggedOut() {
    this.balancesTimer.cancel();
  }

  @observable
  String autobuyBase = 'CUSD';

  @action
  void setAutobuyBase(String base) {
    this.autobuyBase = base;
  }

  @observable
  Map user = {
    'name': '',
    'cpf': '',
    'email': '',
  };

  @computed
  String get firstName {
    return this.user['name']?.split(' ')[0] as String;
  }

  @action
  void loadUser() {
    this.pixCriptoApi.dio.get('/user').then((value) {
      print('----- userStore $value');
      this.user = value.data as Map;
    });
  }

  @observable
  Balances balances = Balances(MCO2: 0, CUSD: 0, totalinbrl: 0);

  @action
  void loadBalances() {
    this.pixCriptoApi.dio.get('/saldo').then((value) {
      print('----- loadBalances $value');

      this.balances = Balances.fromJson(value.data);
    });
  }

  // @action
  // Future<void> loadBalances() {}
}
