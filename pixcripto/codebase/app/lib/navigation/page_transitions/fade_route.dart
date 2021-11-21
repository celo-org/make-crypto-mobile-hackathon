import 'package:flutter/material.dart';

import '../../styles.dart';

class FadeRoute extends PageRouteBuilder<dynamic> {
  final Widget? page;
  final RouteSettings settings;
  FadeRoute({this.page, required this.settings})
      : super(
          pageBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
          ) =>
              page!,
          transitionsBuilder: (
            BuildContext context,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
            Widget child,
          ) =>
              FadeTransition(
            opacity: animation,
            child: child,
          ),
          transitionDuration: Duration(milliseconds: AppTiming.fadeInMs),
          settings: settings,
        );
}
