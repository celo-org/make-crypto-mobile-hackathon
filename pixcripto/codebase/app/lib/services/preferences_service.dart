import 'package:pixcripto/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PreferencesService {
  final SharedPreferences sharedPreferences;

  PreferencesService(this.sharedPreferences);

  void toggleHideBalance() {
    sharedPreferences.setBool(LocalStorageKeys.showBalance, !this.showBalance);
  }

  bool get showBalance =>
      sharedPreferences.getBool(LocalStorageKeys.showBalance) ?? true;

  bool get showInstructionsPix =>
      sharedPreferences.getBool(LocalStorageKeys.showInstructionsPix) ?? true;

  void toggleInstructionsPix() => sharedPreferences.setBool(
      LocalStorageKeys.showInstructionsPix, !this.showInstructionsPix);

  String? get jwt => sharedPreferences.getString(LocalStorageKeys.jwt);

  void set jwt(String? jwt) =>
      sharedPreferences.setString(LocalStorageKeys.jwt, jwt!);
}
