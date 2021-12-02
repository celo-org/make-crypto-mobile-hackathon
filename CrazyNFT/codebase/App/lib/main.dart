import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/screens/landing.dart';
import 'package:mobile_app/screens/login.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
  print(FirebaseAuth.instance.currentUser);
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Map<int, Color> color = const {
      50: Color.fromRGBO(28, 129, 124, .1),
      100: Color.fromRGBO(28, 129, 124, .2),
      200: Color.fromRGBO(28, 129, 124, .3),
      300: Color.fromRGBO(28, 129, 124, .4),
      400: Color.fromRGBO(28, 129, 124, .5),
      500: Color.fromRGBO(28, 129, 124, .6),
      600: Color.fromRGBO(28, 129, 124, .7),
      700: Color.fromRGBO(28, 129, 124, .8),
      800: Color.fromRGBO(28, 129, 124, .9),
      900: Color.fromRGBO(28, 129, 124, 1),
    };

    MaterialColor primaryColor = MaterialColor(0xff1c817c, color);
    if (FirebaseAuth.instance.currentUser == null) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(primarySwatch: primaryColor),
        home: const LoginPage(),
      );
    } else {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(primarySwatch: primaryColor),
        home: LandingPage(),
      );
    }
  }
}
