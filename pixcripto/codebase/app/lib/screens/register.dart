import 'package:flutter/material.dart';
import 'package:pixcripto/common/primary_button.dart';
import 'package:pixcripto/forms/register/register_controller.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/services/pixcripto_api.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class Register extends StatelessWidget {
  Register({Key? key}) : super(key: key);

  final GlobalKey<FormState> formKey = new GlobalKey();

  final formController = RegisterController();

  void _register(BuildContext context) {
    final api = Provider.of<PixCriptoAPI>(
      context,
      listen: false,
    );
    api.dio.post('/register', data: {
      'name': formController.model.name,
      'cpf': formController.model.cpf,
      'email': formController.model.email,
      'password': formController.model.password
    }).then(
      (value) {
        print('---- logged --- $value');
        // If the form is valid, display a snackbar. In the real world,
        // you'd often call a server or save the information in a database.
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Registrado com sucesso!')),
        );
      },
    ).catchError((e) {
      print(e.response);
      print('error --- $e');
    });
  }

  TextFormField _textField(
      {required String label,
      required Iterable<String>? autofillHints,
      required void Function(String)? onChanged,
      required String? Function(String?)? validator}) {
    return TextFormField(
      validator: validator,
      onChanged: onChanged,
      cursorColor: AppColors.celoColor,
      decoration: InputDecoration(
        fillColor: AppColors.graphiteGrayOp10,
        filled: true,
        focusColor: AppColors.graphiteGrayOp10,
        hintText: label,
        // label: Text(label),
        enabledBorder: OutlineInputBorder(
          //Outline border type for TextFeild
          borderRadius: BorderRadius.all(
            Radius.circular(AppBorderRadius.radius10),
          ),
          borderSide: BorderSide(
            color: AppColors.transparent,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(AppBorderRadius.radius10),
          ),
          borderSide: BorderSide(
            color: AppColors.transparent,
          ),
        ),
      ),
      autofillHints: autofillHints,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: AppColors.white,
      body: Stack(
        fit: StackFit.expand,
        children: [
          SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.space20,
                AppSpacing.space40,
                AppSpacing.space20,
                0,
              ),
              child: Form(
                key: formKey,
                child: Column(
                  children: [
                    Text(
                      'Crie sua conta',
                      style: Theme.of(context).textTheme.headline3,
                    ),
                    SizedBox(
                      height: AppSpacing.space10,
                    ),
                    InkWell(
                      onTap: () => Navigator.of(context).pushReplacementNamed(
                        MainRouteNames.login,
                      ),
                      child: Text(
                        'Já possui uma conta? Entre por aqui',
                        style: Theme.of(context).textTheme.headline5?.copyWith(
                              color: AppColors.celoColor,
                            ),
                      ),
                    ),
                    SizedBox(
                      height: AppSpacing.space20,
                    ),
                    _textField(
                      label: 'Nome completo',
                      autofillHints: [AutofillHints.name],
                      onChanged: formController.model.changeName,
                      validator: formController.validateName,
                    ),
                    SizedBox(
                      height: AppSpacing.space10,
                    ),
                    _textField(
                      label: 'CPF',
                      autofillHints: null,
                      onChanged: formController.model.changeCpf,
                      validator: formController.validateName,
                    ),
                    SizedBox(
                      height: AppSpacing.space30,
                    ),
                    _textField(
                      label: 'Email',
                      autofillHints: [AutofillHints.email],
                      onChanged: formController.model.changeEmail,
                      validator: formController.validateEmail,
                    ),
                    SizedBox(
                      height: AppSpacing.space30,
                    ),
                    _textField(
                      label: 'Senha',
                      autofillHints: [AutofillHints.newPassword],
                      onChanged: formController.model.changePassword,
                      validator: formController.validatePassword,
                    ),
                    SizedBox(
                      height: AppSpacing.space10,
                    ),
                    _textField(
                      label: 'Repita a senha',
                      autofillHints: [AutofillHints.newPassword],
                      onChanged: formController.model.changeConfirmPassword,
                      validator: formController.validateConfirmPassword,
                    ),
                    SizedBox(
                      height: AppSpacing.space120,
                    ),
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            right: AppSpacing.space20,
            left: AppSpacing.space20,
            bottom: AppSpacing.space20,
            // child: Container(
            child: PrimaryButton(
              onPressed: () {
                // Navigator.of(context)
                //     .pushReplacementNamed(MainRouteNames.login);
                if (this.formKey.currentState!.validate()) {
                  _register(context);
                  // If the form is valid, display a snackbar. In the real world,
                  // you'd often call a server or save the information in a database.
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Processando...')),
                  );
                }
              },
              child: Text('Registrar'),
            ),
            // ),
          ),
        ],
      ),
    );
  }
}
