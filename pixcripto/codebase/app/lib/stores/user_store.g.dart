// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$UserStore on _UserStoreBase, Store {
  Computed<String>? _$firstNameComputed;

  @override
  String get firstName =>
      (_$firstNameComputed ??= Computed<String>(() => super.firstName,
              name: '_UserStoreBase.firstName'))
          .value;

  final _$autobuyBaseAtom = Atom(name: '_UserStoreBase.autobuyBase');

  @override
  String get autobuyBase {
    _$autobuyBaseAtom.reportRead();
    return super.autobuyBase;
  }

  @override
  set autobuyBase(String value) {
    _$autobuyBaseAtom.reportWrite(value, super.autobuyBase, () {
      super.autobuyBase = value;
    });
  }

  final _$userAtom = Atom(name: '_UserStoreBase.user');

  @override
  Map<dynamic, dynamic> get user {
    _$userAtom.reportRead();
    return super.user;
  }

  @override
  set user(Map<dynamic, dynamic> value) {
    _$userAtom.reportWrite(value, super.user, () {
      super.user = value;
    });
  }

  final _$balancesAtom = Atom(name: '_UserStoreBase.balances');

  @override
  Balances get balances {
    _$balancesAtom.reportRead();
    return super.balances;
  }

  @override
  set balances(Balances value) {
    _$balancesAtom.reportWrite(value, super.balances, () {
      super.balances = value;
    });
  }

  final _$_UserStoreBaseActionController =
      ActionController(name: '_UserStoreBase');

  @override
  void setAutobuyBase(String base) {
    final _$actionInfo = _$_UserStoreBaseActionController.startAction(
        name: '_UserStoreBase.setAutobuyBase');
    try {
      return super.setAutobuyBase(base);
    } finally {
      _$_UserStoreBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void loadUser() {
    final _$actionInfo = _$_UserStoreBaseActionController.startAction(
        name: '_UserStoreBase.loadUser');
    try {
      return super.loadUser();
    } finally {
      _$_UserStoreBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void loadBalances() {
    final _$actionInfo = _$_UserStoreBaseActionController.startAction(
        name: '_UserStoreBase.loadBalances');
    try {
      return super.loadBalances();
    } finally {
      _$_UserStoreBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
autobuyBase: ${autobuyBase},
user: ${user},
balances: ${balances},
firstName: ${firstName}
    ''';
  }
}
