// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$UserStore on _UserStoreBase, Store {
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
  String toString() {
    return '''
autobuyBase: ${autobuyBase}
    ''';
  }
}
