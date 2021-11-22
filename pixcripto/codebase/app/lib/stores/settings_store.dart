import 'package:mobx/mobx.dart';
import 'package:pixcripto/services/preferences_service.dart';

part 'settings_store.g.dart';

class SettingsStore = _SettingsStore with _$SettingsStore;

abstract class _SettingsStore with Store {
  final PreferencesService _preferencesService;

  _SettingsStore(this._preferencesService) {
    this.showBalance = _preferencesService.showBalance;
    this.showInstructionsPix = _preferencesService.showInstructionsPix;
  }

  @observable
  bool showBalance = false;

  @observable
  bool showInstructionsPix = true;

  @action
  Future<void> toggleHideBalance() async {
    _preferencesService.toggleHideBalance();
    showBalance = !showBalance;
  }

  @action
  Future<void> toggleInstructionsPix() async {
    _preferencesService.toggleInstructionsPix();
    showInstructionsPix = !this.showInstructionsPix;
  }
}
