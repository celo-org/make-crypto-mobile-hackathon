import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pixcripto/routes.dart';
import 'package:pixcripto/screens/splash.dart';
import 'package:pixcripto/services/pixcripto_api.dart';
import 'package:pixcripto/services/preferences_service.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/stores/user_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:pixcripto/utils/unfocus.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

final api = PixCriptoAPI();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final sharedPreferences = await SharedPreferences.getInstance();

  runApp(
    MyApp(
      sharedPreferences: sharedPreferences,
    ),
  );
}

class MyApp extends StatelessWidget {
  final SharedPreferences sharedPreferences;

  MyApp({Key? key, required this.sharedPreferences}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<PixCriptoAPI>.value(
          value: PixCriptoAPI(),
        ),
        Provider<PreferencesService>.value(
          value: PreferencesService(this.sharedPreferences),
        ),
        ProxyProvider<PreferencesService, SettingsStore>(
          update: (_, preferencesService, __) =>
              SettingsStore(preferencesService),
        ),
        Provider<UserStore>.value(
          value: UserStore(),
        ),
      ],
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        value: SystemUiOverlayStyle(statusBarColor: AppColors.transparent),
        child: GestureDetector(
          onTap: () {
            unfocus(context);
          },
          child: MaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'PixCripto',
            theme: AppTheme.theme,
            home: Splash(),
            onGenerateRoute: (routeSettings) =>
                Routes.generateRoute(routeSettings),
          ),
        ),
      ),
    );
  }
}
