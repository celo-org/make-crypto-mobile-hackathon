import 'package:mobx/mobx.dart';
import 'package:pixcripto/forms/login/login_model.dart';
part 'login_controller.g.dart';

class LoginController = _LoginControllerBase with _$LoginController;

abstract class _LoginControllerBase with Store {
  var model = LoginModel();

  String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'campo obrigatório';
    } else if (!value.contains('@')) {
      return 'Email inválido';
    }

    return null;
  }

  String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'campo obrigatório';
    } else if (value.length < 6) {
      return 'senha muito curta';
    }

    return null;
  }
}
