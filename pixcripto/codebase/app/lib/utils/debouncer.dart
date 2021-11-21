import 'package:flutter/foundation.dart';
import 'dart:async';

class Debouncer {
  final int? milliseconds;
  VoidCallback? action;
  Timer? timer;
  Debouncer({this.milliseconds});

  void run(VoidCallback action) {
    if (timer != null) {
      timer!.cancel();
    }
    timer = Timer(Duration(milliseconds: milliseconds!), action);
  }
}
