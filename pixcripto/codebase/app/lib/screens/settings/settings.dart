import 'package:flutter/material.dart';
import 'package:pixcripto/constants.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/screens/settings/widgets/settings_group.dart';
import 'package:pixcripto/screens/settings/widgets/settings_item.dart';
import 'package:pixcripto/services/preferences_service.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/stores/user_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class Settings extends StatefulWidget {
  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  void logout(BuildContext context) {
    final preferencesService = Provider.of<PreferencesService>(
      context,
      listen: false,
    );
    final userStore = Provider.of<UserStore>(
      context,
      listen: false,
    );

    userStore.loggedOut();
    preferencesService.sharedPreferences.remove(LocalStorageKeys.jwt);

    Navigator.of(context).pushReplacementNamed(MainRouteNames.root);
  }

  @override
  Widget build(BuildContext context) {
    final settingsStore = Provider.of<SettingsStore>(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.fromLTRB(
            AppSpacing.space20,
            AppSpacing.space40,
            AppSpacing.space20,
            0,
          ),
          child: Text(
            'Menu',
            style: Theme.of(context).textTheme.headline3,
          ),
        ),
        SizedBox(
          height: AppSpacing.space20,
        ),
        SettingsGroup(<Widget>[
          SettingsItem(
            type: SettingsItemType.modal,
            iconAssetLabel: ' ',
            label: 'Sair',
            value: '',
            icon: Icon(Icons.exit_to_app),
            onPress: () {
              this.logout(context);
              return new Future.value();
            },
          ),
          SettingsItem(
            type: SettingsItemType.modal,
            iconAssetLabel: ' ',
            label: 'Esconder chave Pix',
            value: '',
            icon: Icon(Icons.money_off),
            onPress: () {
              settingsStore.toggleInstructionsPix();
              return new Future.value();
            },
          ),
        ], header: Text('Geral')),
        // Container(
        //   height: AppSpacing.space50,
        // ),
      ],
    );
  }
}
