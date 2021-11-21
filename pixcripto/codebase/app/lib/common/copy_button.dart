import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CopyButton extends StatelessWidget {
  final String toCopy;

  const CopyButton({Key? key, required this.toCopy}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: Icon(
        Icons.copy,
        size: 16,
      ),
      onTap: () => Clipboard.setData(
        ClipboardData(text: this.toCopy),
      ),
    );
  }
}
