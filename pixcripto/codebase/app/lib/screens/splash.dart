import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pixcripto/common/primary_button.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/services/preferences_service.dart';
import 'package:pixcripto/stores/user_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class Splash extends StatelessWidget {
  const Splash({Key? key}) : super(key: key);

  void signIn(BuildContext context) {
    final preferencesService = Provider.of<PreferencesService>(
      context,
      listen: false,
    );

    final userStore = Provider.of<UserStore>(context, listen: false);

    String? token = preferencesService.jwt;

    if (token != null) {
      userStore.loggedIn();
      Navigator.of(context).pushReplacementNamed(MainRouteNames.home);
    } else {
      Navigator.of(context).pushReplacementNamed(MainRouteNames.login);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        alignment: AlignmentDirectional.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SvgPicture.asset(
                AppImages.welcome,
                height: AppSpacing.space200,
              ),
              SizedBox(
                height: AppSpacing.space20,
              ),
              Center(
                child: Text(
                  'Compre cripto com a rapidez de um Pix',
                  style: Theme.of(context).textTheme.headline3,
                ),
              ),
            ],
          ),
          Positioned(
            right: 0,
            left: 0,
            bottom: AppSpacing.space20,
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
              child: PrimaryButton(
                onPressed: () {
                  this.signIn(context);
                },
                child: Text('Entrar'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
