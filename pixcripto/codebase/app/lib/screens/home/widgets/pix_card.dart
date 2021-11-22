import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:pixcripto/common/copy_button.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class PixCard extends StatelessWidget {
  const PixCard({Key? key}) : super(key: key);

  void showPixInstructions(BuildContext context) {
    Navigator.of(context).pushNamed(MainRouteNames.instructions);
  }

  @override
  Widget build(BuildContext context) {
    SettingsStore settingsStore = Provider.of<SettingsStore>(context);

    return Observer(
      builder: (_) => InkWell(
        borderRadius: BorderRadius.all(
          Radius.circular(
            AppBorderRadius.radius10,
          ),
        ),
        onTap: settingsStore.showInstructionsPix
            ? () => showPixInstructions(context)
            : null,
        child: SizedBox(
          width: double.infinity,
          child: Card(
            margin: EdgeInsets.all(0),
            child: Padding(
              padding: const EdgeInsets.all(
                AppSpacing.space20,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Chave Pix",
                    style: Theme.of(context).textTheme.headline3,
                  ),
                  SizedBox(
                    height: AppSpacing.space20,
                  ),
                  SizedBox(
                    width: double.infinity,
                    child: Card(
                      color: AppColors.background,
                      margin: EdgeInsets.all(0),
                      child: Padding(
                        padding: const EdgeInsets.all(
                          AppSpacing.space20,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              !settingsStore.showInstructionsPix
                                  ? "pix@pixcripto.x"
                                  : 'Toque para habilitar o depósito',
                              style: Theme.of(context).textTheme.headline4,
                            ),
                            !settingsStore.showInstructionsPix
                                ? CopyButton(toCopy: 'pix@pixcripto.x')
                                : Column(),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
