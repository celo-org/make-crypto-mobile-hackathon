// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login_model.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$LoginModel on _LoginModelBase, Store {
  final _$emailAtom = Atom(name: '_LoginModelBase.email');

  @override
  String? get email {
    _$emailAtom.reportRead();
    return super.email;
  }

  @override
  set email(String? value) {
    _$emailAtom.reportWrite(value, super.email, () {
      super.email = value;
    });
  }

  final _$passwordAtom = Atom(name: '_LoginModelBase.password');

  @override
  String? get password {
    _$passwordAtom.reportRead();
    return super.password;
  }

  @override
  set password(String? value) {
    _$passwordAtom.reportWrite(value, super.password, () {
      super.password = value;
    });
  }

  final _$_LoginModelBaseActionController =
      ActionController(name: '_LoginModelBase');

  @override
  dynamic changeEmail(String value) {
    final _$actionInfo = _$_LoginModelBaseActionController.startAction(
        name: '_LoginModelBase.changeEmail');
    try {
      return super.changeEmail(value);
    } finally {
      _$_LoginModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  dynamic changePassword(String value) {
    final _$actionInfo = _$_LoginModelBaseActionController.startAction(
        name: '_LoginModelBase.changePassword');
    try {
      return super.changePassword(value);
    } finally {
      _$_LoginModelBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
email: ${email},
password: ${password}
    ''';
  }
}
