import 'package:flutter/material.dart';

class PrimaryButton extends ElevatedButton {
  const PrimaryButton({
    required VoidCallback? onPressed,
    Color? color,
    Widget? child,
  }) : super(
          onPressed: onPressed,
          child: child,
        );
}
