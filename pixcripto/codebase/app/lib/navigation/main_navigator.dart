import 'package:flutter/material.dart';
import 'package:pixcripto/navigation/bottom_navigation.dart';
import 'package:pixcripto/screens/home/instructions.dart';
import 'package:pixcripto/screens/login.dart';
import 'package:pixcripto/screens/register.dart';
import 'package:pixcripto/screens/send/widgets/qr_scan.dart';
import 'package:pixcripto/screens/splash.dart';

import './navigators_keys.dart';

class HomeBarItem {
  String initialRoute;
  String text;
  int index;

  HomeBarItem(this.initialRoute, this.text, this.index);
}

class MainRouteNames {
  static const root = '/';
  static const register = '/register';
  static const login = '/login';
  static const home = '/home';
  static const instructions = '/instructions';
  static const qr_scan = '/qr-scan';
}

final Map<String, Widget> routes = {
  MainRouteNames.root: Splash(),
  MainRouteNames.register: Register(),
  MainRouteNames.login: Login(),
  MainRouteNames.instructions: Instructions(),
  MainRouteNames.home: BottomNavigation(),
  MainRouteNames.qr_scan: QRScan(),
};

class MainNavigator extends StatelessWidget {
  static PageRoute generateRoute(RouteSettings routeSettings) {
    return MaterialPageRoute<Route<dynamic>>(
        settings: routeSettings,
        builder: (context) => routes[routeSettings.name!]!);
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: mainNavigatorKey,
      initialRoute: '/',
      onGenerateRoute: generateRoute,
    );
  }
}
