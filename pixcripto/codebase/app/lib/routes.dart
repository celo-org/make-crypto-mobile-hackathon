import 'package:flutter/material.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/navigation/navigators_keys.dart';

class RouteItems {
  final Widget route;
  final GlobalKey<NavigatorState> key;
  RouteItems(this.route, this.key);
}

class RouteNames {
  static const mainNavigator = '/main-navigator';
}

final Map<String, RouteItems> routes = {
  RouteNames.mainNavigator: RouteItems(MainNavigator(), mainNavigatorKey),
};

class Routes {
  Routes._();

  static MaterialPageRoute generateRoute(RouteSettings routeSettings) {
    return MaterialPageRoute<Route<dynamic>>(
      settings: routeSettings,
      builder: (context) =>
          _buildPage(routeSettings.name, routeSettings.arguments),
    );
  }

  static Widget _buildPage(String? name, Object? arguments) {
    if (routes.containsKey(name)) {
      return WillPopScope(
        onWillPop: () async {
          final res = await routes[name!]!.key.currentState!.maybePop();
          return !res;
        },
        child: routes[name!]!.route,
      );
    } else {
      return Container();
    }
  }
}
