import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:grouped_list/grouped_list.dart';
import 'package:pixcripto/common/show_bottom_dialog.dart';
import 'package:pixcripto/styles.dart';

class WithdrawalItem {
  DateTime createdAt;
  double amount;
  String base;
  String address;

  WithdrawalItem({
    required this.createdAt,
    required this.amount,
    required this.base,
    required this.address,
  });
}

class ListRecentTransactions extends StatelessWidget {
  const ListRecentTransactions({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<WithdrawalItem> recentTransactions = [
      WithdrawalItem(
        amount: 5,
        base: 'CUSD',
        createdAt: DateTime(2021),
        address: '0x153f02be2679d6e3ff7fd54ccd641afbadbc6557',
      ),
      WithdrawalItem(
        amount: 10,
        base: 'MCO2',
        createdAt: DateTime(2020),
        address: '0x153f02be2679d6e3ff7fd54ccd641afbadbc6557',
      ),
      WithdrawalItem(
        amount: 2.5,
        base: 'MCO2',
        createdAt: DateTime(2019),
        address: '0x153f02be2679d6e3ff7fd54ccd641afbadbc6557',
      ),
      WithdrawalItem(
        amount: 3,
        base: 'CUSD',
        createdAt: DateTime(2019, 5),
        address: '0x153f02be2679d6e3ff7fd54ccd641afbadbc6557',
      ),
      WithdrawalItem(
        amount: 4.99,
        base: 'CUSD',
        createdAt: DateTime(2019, 5),
        address: '0x153f02be2679d6e3ff7fd54ccd641afbadbc6557',
      ),
    ];

    return Expanded(
      // flex: 9,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(AppBorderRadius.radius10),
            topRight: Radius.circular(AppBorderRadius.radius10),
          ),
          color: AppColors.white,
          // boxShadow: [
          //   BoxShadow(color: AppColors.blackOp75, spreadRadius: 3),
          // ],
        ),
        child: GroupedListView<WithdrawalItem, DateTime>(
          elements: recentTransactions,
          groupBy: (element) => element.createdAt,
          // groupSeparatorBuilder: (DateTime groupByValue) =>
          //     Text(groupByValue),
          groupHeaderBuilder: (WithdrawalItem element) => Stack(
            children: [
              Positioned(
                top: 18,
                left: 2,
                right: 2,
                child: Divider(
                  color: AppColors.background,
                ),
              ),
              Container(
                height: 50,
                child: Align(
                  child: Container(
                    width: 120,
                    decoration: BoxDecoration(
                      color: AppColors.background,
                      borderRadius: const BorderRadius.all(
                        Radius.circular(
                          AppBorderRadius.radius10,
                        ),
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        '${AppFormats.getFormattedDate(element.createdAt)}',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.headline6,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          itemBuilder: (context, WithdrawalItem element) => Padding(
            padding: const EdgeInsets.fromLTRB(
              AppSpacing.space20,
              0,
              AppSpacing.space20,
              AppSpacing.space20,
            ),
            child: InkWell(
              onTap: () => this.detailsModal(context, element),
              child: Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        SvgPicture.asset(
                          AppIcons.currencyIcon(element.base),
                          height: 25,
                        ),
                        SizedBox(
                          width: AppSpacing.space20,
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Envio de ${AppStrings.getCurrencyNameBySymbol(element.base)}",
                              style: Theme.of(context).textTheme.headline5,
                            ),
                            Text(
                              "${element.amount} ${element.base}",
                              style: Theme.of(context).textTheme.headline5,
                            ),
                          ],
                        ),
                      ],
                    ),
                    Center(
                      child: SvgPicture.asset(
                        AppIcons.clip,
                        height: 15,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          itemComparator: (item1, item2) =>
              (item1).createdAt.compareTo((item2).createdAt), // optional
          useStickyGroupSeparators: true, // optional
          floatingHeader: true, // optional
          order: GroupedListOrder.DESC, // optional
          separator: Divider(
            color: AppColors.background,
          ),
        ),
      ),
    );
  }

  detailsModal(BuildContext context, WithdrawalItem element) {
    showBottomDialog(
      context: context,
      height: 300,
      child: Column(
        children: [
          Spacer(),
          SvgPicture.asset(
            AppIcons.currencyIcon(element.base),
            height: 32,
          ),
          SizedBox(
            height: AppSpacing.space10,
          ),
          Text(
            'Envio de ${AppStrings.getCurrencyNameBySymbol(element.base)}',
            style: Theme.of(context).textTheme.bodyText1,
          ),
          Text(
            AppFormats.getFormattedDate(element.createdAt),
            style: Theme.of(context).textTheme.headline6,
          ),
          SizedBox(
            height: AppSpacing.space10,
          ),
          Table(
            border: TableBorder(
              horizontalInside: BorderSide(
                width: 1,
                color: AppColors.graphiteGrayOp30,
              ),
            ),
            defaultVerticalAlignment: TableCellVerticalAlignment.bottom,
            defaultColumnWidth: FixedColumnWidth(150.0),
            children: [
              this.createTableRow(
                context,
                'Quantidade',
                '${element.amount.toString()} ${element.base}',
              ),
              this.createTableRow(context, 'Endereço', element.address),
              // TableRow(children: [Text('est')]),
              // TableRow(children: [Text('est')]),
            ],
          ),
          Spacer(),
        ],
      ),
    );
  }

  TableRow createTableRow(BuildContext context, String title, String value) {
    return TableRow(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.space8),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(
              title,
              style: Theme.of(context).textTheme.headline4,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.space8),
          child: Align(
            alignment: Alignment.centerRight,
            child: Text(
              value,
              style: Theme.of(context).textTheme.headline4,
            ),
          ),
        ),
      ],
    );
  }
}
