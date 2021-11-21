import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pixcripto/common/primary_button.dart';
import 'package:pixcripto/styles.dart';

class ConfirmSendModal extends StatefulWidget {
  final String address;

  ConfirmSendModal({
    Key? key,
    required this.address,
  }) : super(key: key);

  @override
  State<ConfirmSendModal> createState() => _ConfirmSendModalState();
}

class _ConfirmSendModalState extends State<ConfirmSendModal> {
  String tokenToSend = 'CUSD';
  double amount = 0;

  void toggletoken() {
    this.setState(() {
      this.tokenToSend = this.tokenToSend == 'CUSD' ? 'MCO2' : 'CUSD';
    });
  }

  TableRow createTableRow(BuildContext context, String title, String value,
      [void Function()? onTap]) {
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
        InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.space8),
            child: Align(
              alignment: Alignment.centerRight,
              child: Text(
                value,
                style: Theme.of(context).textTheme.headline4,
              ),
            ),
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Spacer(),
        InkWell(
          onTap: this.toggletoken,
          child: Column(
            children: [
              SvgPicture.asset(
                AppIcons.currencyIcon(this.tokenToSend),
                height: 32,
              ),
              SizedBox(
                height: AppSpacing.space10,
              ),
              Text(
                'Envio de ${AppStrings.getCurrencyNameBySymbol(this.tokenToSend)}',
                style: Theme.of(context).textTheme.bodyText1,
              ),
              Text(
                'Toque para alterar',
                style: Theme.of(context).textTheme.headline6,
              ),
            ],
          ),
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
                this.amount == 0
                    ? 'Toque para alterar'
                    : this.amount.toString(),
                () => showDialog(
                    context: context,
                    builder: (context) {
                      return AlertDialog(
                        content: TextField(
                          onChanged: (value) {
                            setState(() {
                              amount = double.tryParse(value) ?? 0;
                            });
                          },
                          //  controller: _textFieldController,
                          decoration: InputDecoration(
                            fillColor: AppColors.graphiteGrayOp10,
                            filled: true,
                            focusColor: AppColors.graphiteGrayOp10,
                            hintText: 'Informe a quantia',
                            // label: Text(label),
                            enabledBorder: OutlineInputBorder(
                              //Outline border type for TextFeild
                              borderRadius: BorderRadius.all(
                                Radius.circular(AppBorderRadius.radius10),
                              ),
                              borderSide: BorderSide(
                                color: AppColors.transparent,
                              ),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.all(
                                Radius.circular(AppBorderRadius.radius10),
                              ),
                              borderSide: BorderSide(
                                color: AppColors.transparent,
                              ),
                            ),
                          ),
                          keyboardType: TextInputType.number,
                        ),
                        actions: <Widget>[
                          PrimaryButton(
                            color: Colors.green,
                            child: Text('Feito'),
                            onPressed: () {
                              setState(() {
                                Navigator.pop(context);
                              });
                            },
                          ),
                        ],
                      );
                    })),
            this.createTableRow(
              context,
              'Endereço',
              widget.address,
            ),
            // TableRow(children: [Text('est')]),
            // TableRow(children: [Text('est')]),
          ],
        ),
        Spacer(),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
          child: PrimaryButton(
            onPressed: this.amount != 0 ? () => this.send(context) : null,
            child: Text('Enviar'),
          ),
        ),
        Spacer(),
      ],
    );
  }

  void send(BuildContext context) {
    // send post to api

    Navigator.of(context).pop();
    Navigator.of(context).pop();
  }
}
