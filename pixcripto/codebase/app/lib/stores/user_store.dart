import 'package:mobx/mobx.dart';
part 'user_store.g.dart';

class UserStore = _UserStoreBase with _$UserStore;

abstract class _UserStoreBase with Store {
  _UserStoreBase() {}

  @observable
  String autobuyBase = 'CUSD';

  @action
  void setAutobuyBase(String base) {
    this.autobuyBase = base;
  }
}
