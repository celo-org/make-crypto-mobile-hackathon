import 'package:flutter/material.dart';
import 'package:pixcripto/styles.dart';
import 'package:pixcripto/utils/unfocus.dart';

Future<T?> showBottomDialog<T>({
  required BuildContext context,
  required Widget child,
  bool allowBackNavigation = true,
  bool closeButton = true,
  double height = 300,
}) {
  unfocus(context);
  return showModalBottomSheet(
    isScrollControlled: true,
    enableDrag: true,
    context: context,
    shape: RoundedRectangleBorder(
      borderRadius: const BorderRadius.only(
        topLeft: Radius.circular(30),
        topRight: Radius.circular(30),
      ),
    ),
    isDismissible: allowBackNavigation,
    builder: (context) => WillPopScope(
      onWillPop: () async => allowBackNavigation,
      child: Padding(
        padding: MediaQuery.of(context).viewInsets,
        child: Container(
          height: height,
          child: Stack(
            children: [
              Positioned(
                top: 20,
                bottom: 0,
                right: 0,
                left: 0,
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.space10),
                  child: child,
                ),
              ),
              if (closeButton)
                Positioned(
                  top: 10,
                  right: 10,
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(30)),
                      color: AppColors.background,
                      // boxShadow: [
                      //   BoxShadow(color: AppColors.blackOp75, spreadRadius: 3),
                      // ],
                    ),
                    child: CloseButton(
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    ),
  );
}
