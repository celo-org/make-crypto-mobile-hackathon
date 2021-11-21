import 'package:flutter/material.dart';
import 'package:pixcripto/common/hide_balances.dart';
import 'package:pixcripto/screens/home/widgets/autobuy_balances.dart';
import 'package:pixcripto/screens/home/widgets/pix_card.dart';
import 'package:pixcripto/styles.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.space20,
        AppSpacing.space40,
        AppSpacing.space20,
        0,
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Olá, Gustavo!',
                style: Theme.of(context).textTheme.headline3,
              ),
              HideBalances(),
            ],
          ),
          SizedBox(
            height: AppSpacing.space20,
          ),
          SizedBox(
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
                      "Saldo aproximado",
                      style: Theme.of(context).textTheme.headline3,
                    ),
                    Text(
                      "R\$ 3,000.00",
                      style: Theme.of(context).textTheme.headline2,
                    ),
                  ],
                ),
              ),
            ),
          ),
          SizedBox(
            height: AppSpacing.space20,
          ),
          AutoBuyBalances(),
          SizedBox(
            height: AppSpacing.space20,
          ),
          PixCard(),
        ],
      ),
    );
  }
}
