// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'settings_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$SettingsStore on _SettingsStore, Store {
  final _$showBalanceAtom = Atom(name: '_SettingsStore.showBalance');

  @override
  bool get showBalance {
    _$showBalanceAtom.reportRead();
    return super.showBalance;
  }

  @override
  set showBalance(bool value) {
    _$showBalanceAtom.reportWrite(value, super.showBalance, () {
      super.showBalance = value;
    });
  }

  final _$showInstructionsPixAtom =
      Atom(name: '_SettingsStore.showInstructionsPix');

  @override
  bool get showInstructionsPix {
    _$showInstructionsPixAtom.reportRead();
    return super.showInstructionsPix;
  }

  @override
  set showInstructionsPix(bool value) {
    _$showInstructionsPixAtom.reportWrite(value, super.showInstructionsPix, () {
      super.showInstructionsPix = value;
    });
  }

  final _$toggleHideBalanceAsyncAction =
      AsyncAction('_SettingsStore.toggleHideBalance');

  @override
  Future<void> toggleHideBalance() {
    return _$toggleHideBalanceAsyncAction.run(() => super.toggleHideBalance());
  }

  final _$toggleInstructionsPixAsyncAction =
      AsyncAction('_SettingsStore.toggleInstructionsPix');

  @override
  Future<void> toggleInstructionsPix() {
    return _$toggleInstructionsPixAsyncAction
        .run(() => super.toggleInstructionsPix());
  }

  @override
  String toString() {
    return '''
showBalance: ${showBalance},
showInstructionsPix: ${showInstructionsPix}
    ''';
  }
}
