import 'package:mobx/mobx.dart';
import 'package:pixcripto/forms/register/register_model.dart';
import 'package:cpf_cnpj_validator/cpf_validator.dart';

part 'register_controller.g.dart';

class RegisterController = _RegisterControllerBase with _$RegisterController;

abstract class _RegisterControllerBase with Store {
  var model = RegisterModel();

  String? validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'campo obrigatório';
    } else if (value.length < 3) {
      return 'o nome deve ter mais de 3 caracteres';
    }

    return null;
  }

  String? validateCpf(String? value) {
    if (value == null || value.isEmpty) {
      return 'campo obrigatório';
    } else if (!CPFValidator.isValid(value)) {
      return 'CPF inválido';
    }

    return null;
  }

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
      return 'senha fraca, deve ter mais de 5 caracteres';
    }

    return null;
  }

  String? validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'campo obrigatório';
    } else if (value != model.password) {
      return 'senhas não são iguais';
    }

    return null;
  }
}
