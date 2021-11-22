import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pixcripto/common/show_bottom_dialog.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/stores/user_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:pixcripto/utils/BN.dart';
import 'package:provider/provider.dart';

class AutoBuyBalances extends StatelessWidget {
  const AutoBuyBalances({Key? key}) : super(key: key);

  TableRow _criarLinhaTable(
    BuildContext context,
    String name,
    String symbol,
    num amount,
  ) {
    final settingsStore = Provider.of<SettingsStore>(context);
    UserStore userStore = Provider.of<UserStore>(context);

    return TableRow(
      children: [
        Container(
          margin: const EdgeInsets.only(
            top: AppSpacing.space10,
            bottom: AppSpacing.space10,
          ),
          alignment: Alignment.centerLeft,
          child: Row(
            children: [
              SvgPicture.asset(
                AppIcons.currencyIcon(symbol),
                height: 25,
              ),
              SizedBox(
                width: AppSpacing.space10,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    symbol.toUpperCase(),
                    style: Theme.of(context).textTheme.headline5,
                  ),
                  Text(
                    name,
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ],
              ),
            ],
          ),
          // padding: EdgeInsets.all(8.0),
        ),
        Container(
          margin: const EdgeInsets.only(
            top: AppSpacing.space5,
            bottom: AppSpacing.space10,
          ),
          alignment: Alignment.centerRight,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text(
                (settingsStore.showBalance
                        ? BN(amount, symbol).toCurrencyFixed()
                        : '*****') +
                    ' ' +
                    symbol.toUpperCase(),
                style: Theme.of(context).textTheme.headline5,
              ),
              SizedBox(
                width: AppSpacing.space10,
              ),
              Observer(
                builder: (_) {
                  return SvgPicture.asset(
                    AppIcons.balloon,
                    height: 16,
                    color: userStore.autobuyBase == symbol
                        ? AppColors.celoColor
                        : AppColors.transparent,
                  );
                },
              ),
            ],
          ),
          padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
        ),
      ],
    );
  }

  ListTile buildAssetTile(BuildContext context, String symbol) {
    UserStore userStore = Provider.of<UserStore>(context, listen: false);

    return new ListTile(
        leading: new Container(
          child: SvgPicture.asset(
            AppIcons.currencyIcon(symbol),
            height: 24,
            width: 24,
          ),
        ),
        title: Observer(builder: (_) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "${AppStrings.getCurrencyNameBySymbol(symbol)} ($symbol)",
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.w700,
                ),
              ),
              SvgPicture.asset(
                AppIcons.balloon,
                height: 16,
                color: userStore.autobuyBase == symbol
                    ? AppColors.celoColor
                    : AppColors.transparent,
              )
            ],
          );
        }),
        onTap: () {
          userStore.setAutobuyBase(symbol);
        });
  }

  void changeAutoBuy(BuildContext context) {
    showBottomDialog(
      context: context,
      allowBackNavigation: true,
      closeButton: true,
      height: 200,
      child: new Wrap(
        children: <Widget>[
          new ListTile(
            title: const Text(
              'Selecione um ativo para o Autobuy',
              style: TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          buildAssetTile(context, 'CUSD'),
          buildAssetTile(context, 'MCO2'),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final userStore = Provider.of<UserStore>(context, listen: true);

    return SizedBox(
      width: double.infinity,
      child: Card(
        margin: EdgeInsets.all(0),
        child: Padding(
          padding: const EdgeInsets.all(
            AppSpacing.space20,
          ),
          child: Column(
            children: [
              Observer(builder: (_) {
                return Table(
                  defaultColumnWidth: FixedColumnWidth(150.0),
                  border: TableBorder(
                    horizontalInside:
                        BorderSide(width: 1, color: AppColors.graphiteGrayOp10),
                  ),
                  children: [
                    _criarLinhaTable(
                      context,
                      "Celo Dollar",
                      "CUSD",
                      userStore.balances.CUSD,
                    ),
                    _criarLinhaTable(
                      context,
                      "Moss Carbon Credit",
                      "MCO2",
                      userStore.balances.MCO2,
                    ),
                  ],
                );
              }),
              SizedBox(
                height: AppSpacing.space20,
              ),
              InkWell(
                onTap: () => this.changeAutoBuy(context),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    'Mudar autobuy',
                    style: Theme.of(context).textTheme.headline5?.copyWith(
                          color: AppColors.celoColor,
                        ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
