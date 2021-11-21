import 'dart:async';

import 'package:flutter/material.dart';
import 'package:pixcripto/common/primary_button.dart';
import 'package:pixcripto/forms/login/login_controller.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/services/pixcripto_api.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class Login extends StatelessWidget {
  Login({Key? key}) : super(key: key);

  final GlobalKey<FormState> formKey = new GlobalKey();

  final formController = LoginController();

  void _login(BuildContext context) {
    final api = Provider.of<PixCriptoAPI>(
      context,
      listen: false,
    );

    api.dio
        .post('/login', data: {
          'email': formController.model.email,
          'password': formController.model.password,
        })
        .then(
          (value) => print('---- logged --- $value'),
        )
        .catchError((e) {
          print('error --- $e');
        });
  }

  TextFormField _textField({
    required String label,
    required Iterable<String>? autofillHints,
    required void Function(String)? onChanged,
    required String? Function(String?)? validator,
  }) {
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
                      'Entre em sua conta',
                      style: Theme.of(context).textTheme.headline3,
                    ),
                    SizedBox(
                      height: AppSpacing.space10,
                    ),
                    InkWell(
                      onTap: () => Navigator.of(context).pushReplacementNamed(
                        MainRouteNames.register,
                      ),
                      child: Text(
                        'Não possui uma conta? Crie aqui',
                        style: Theme.of(context).textTheme.headline5?.copyWith(
                              color: AppColors.celoColor,
                            ),
                      ),
                    ),
                    SizedBox(
                      height: AppSpacing.space20,
                    ),
                    _textField(
                      label: 'Email',
                      autofillHints: [AutofillHints.email],
                      onChanged: formController.model.changeEmail,
                      validator: formController.validateEmail,
                    ),
                    SizedBox(
                      height: AppSpacing.space10,
                    ),
                    _textField(
                      label: 'Senha',
                      autofillHints: [AutofillHints.newPassword],
                      onChanged: formController.model.changePassword,
                      validator: formController.validatePassword,
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
                if (this.formKey.currentState!.validate()) {
                  // If the form is valid, display a snackbar. In the real world,
                  // you'd often call a server or save the information in a database.
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Processing Data')),
                  );

                  this._login(context);

                  Timer(Duration(milliseconds: 200), () {
                    ScaffoldMessenger.of(context).hideCurrentSnackBar();
                    print('done');
                    Navigator.of(context)
                        .pushReplacementNamed(MainRouteNames.home);
                  });
                }
              },
              child: Text('Entrar'),
            ),
            // ),
          ),
        ],
      ),
    );
  }
}
