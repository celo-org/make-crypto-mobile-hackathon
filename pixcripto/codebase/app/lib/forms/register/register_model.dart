import 'package:mobx/mobx.dart';
part 'register_model.g.dart';

class RegisterModel = _FormControllerBase with _$RegisterModel;

abstract class _FormControllerBase with Store {
  @observable
  String? name;
  @action
  changeName(String value) => this.name = value;

  @observable
  String? email;
  @action
  changeEmail(String value) => this.email = value;

  @observable
  String? cpf;
  @action
  changeCpf(String value) => this.cpf = value;

  @observable
  String? password;
  @action
  changePassword(String value) => this.password = value;

  @observable
  String? confirmPassword;
  @action
  changeConfirmPassword(String value) => this.confirmPassword = value;
}
