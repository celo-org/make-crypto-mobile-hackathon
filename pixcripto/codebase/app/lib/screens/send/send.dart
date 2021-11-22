import 'package:flutter/material.dart';
import 'package:pixcripto/navigation/main_navigator.dart';
import 'package:pixcripto/screens/send/widgets/recent_transactions/list_recent_transactions.dart';
import 'package:pixcripto/styles.dart';

class Send extends StatelessWidget {
  Send({Key? key}) : super(key: key);

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
                'Envios recentes',
                style: Theme.of(context).textTheme.headline3,
              ),
              InkWell(
                onTap: () => this.scanQrCode(context),
                child: Icon(
                  Icons.qr_code_scanner,
                ),
              )
            ],
          ),
          SizedBox(
            height: AppSpacing.space20,
          ),
          ListRecentTransactions(),
        ],
      ),
    );
  }

  scanQrCode(BuildContext context) {
    Navigator.of(context).pushNamed(MainRouteNames.qr_scan);
  }
}
