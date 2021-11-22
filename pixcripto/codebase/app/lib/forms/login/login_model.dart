import 'package:mobx/mobx.dart';
part 'login_model.g.dart';

class LoginModel = _LoginModelBase with _$LoginModel;

abstract class _LoginModelBase with Store {
  @observable
  String? email;
  @action
  changeEmail(String value) => this.email = value;

  @observable
  String? password;
  @action
  changePassword(String value) => this.password = value;
}
