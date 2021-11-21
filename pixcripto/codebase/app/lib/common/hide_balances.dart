import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/svg.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class HideBalances extends StatelessWidget {
  const HideBalances({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SettingsStore settingsStore = Provider.of<SettingsStore>(context);

    return InkWell(
      onTap: () => settingsStore.toggleHideBalance(),
      child: Observer(
        builder: (_) => SvgPicture.asset(
          settingsStore.showBalance ? AppIcons.eye : AppIcons.eyeClosed,
        ),
      ),
    );
  }
}
