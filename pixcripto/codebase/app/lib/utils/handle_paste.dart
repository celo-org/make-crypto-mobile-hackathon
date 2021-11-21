import 'package:flutter/services.dart';

Future<String> handlePaste() async {
  ClipboardData? data = await Clipboard.getData('text/plain');
  return data?.text ?? '';
}
