import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:turuta/screens/pd_recharge_amount_card.dart';
import 'package:turuta/screens/pd_recharge_yape.dart';
import 'package:turuta/util/open_url.dart';
import 'package:turuta/widgets/analytics/GestureDetectorTr.dart';

class AlertRechargeOpts extends StatefulWidget {
  static const routeName = '/alert_recharge_opts';

  AlertRechargeOpts({Key? key}) : super(key: key);

  @override
  _AlertRechargeOptsState createState() => _AlertRechargeOptsState();
}

class _AlertRechargeOptsState extends State<AlertRechargeOpts> {
  @override
  Widget build(BuildContext context) {

    final btnOpt0 = Padding(
      padding: EdgeInsets.fromLTRB(35, 0, 35, 0),
      child: GestureDetectorTr(
        analyticsName: "btn_recharge_opt_celo",
        onTap: () async {

          CardTopUpFlowArgs args = CardTopUpFlowArgs();
          args.isCELO = true;
          Navigator.of(context).pushReplacementNamed(RechargeAmountCard.routeName, arguments: args);

        },
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.only(top: 9, bottom: 10),
          alignment: Alignment.center,
          decoration: new BoxDecoration(
            borderRadius: BorderRadius.circular(19),
            color: Color(0xfff63dca),
            boxShadow: [BoxShadow(
                color: Color(0xff000000).withOpacity(0.16),
                offset: Offset(0,3),
                blurRadius: 6,
                spreadRadius: 0
            ) ],
          ),
          child: Text("CELO",
            style: TextStyle(
              fontFamily: 'Roboto',
              color: Color(0xffffffff),
              fontSize: 20,
              fontWeight: FontWeight.w400,
              fontStyle: FontStyle.normal,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );

    final btnOpt1 = Padding(
      padding: EdgeInsets.fromLTRB(35, 0, 35, 0),
      child: GestureDetectorTr(
        analyticsName: "btn_recharge_opt_card",
        onTap: () {
          Navigator.of(context).pushReplacementNamed(RechargeAmountCard.routeName);
        },
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.only(top: 9, bottom: 10),
          alignment: Alignment.center,
          decoration: new BoxDecoration(
            borderRadius: BorderRadius.circular(19),
            color: Color(0xff5A78C9),
            boxShadow: [BoxShadow(
                color: Color(0xff000000).withOpacity(0.16),
                offset: Offset(0,3),
                blurRadius: 6,
                spreadRadius: 0
            ) ],
          ),
          child: Text("Tarjeta Crédito/Débito",
            style: TextStyle(
              fontFamily: 'Roboto',
              color: Color(0xffffffff),
              fontSize: 20,
              fontWeight: FontWeight.w400,
              fontStyle: FontStyle.normal,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );

    final btnOpt2 = Padding(
      padding: EdgeInsets.fromLTRB(35, 0, 35, 0),
      child: GestureDetectorTr(
        analyticsName: "btn_recharge_opt_yape",
        onTap: () async {
          Navigator.of(context).pushReplacementNamed(RechargeYape.routeName);
        },
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.only(top: 9, bottom: 10),
          alignment: Alignment.center,
          decoration: new BoxDecoration(
            borderRadius: BorderRadius.circular(19),
            color: Color(0xfff63dca),
            boxShadow: [BoxShadow(
                color: Color(0xff000000).withOpacity(0.16),
                offset: Offset(0,3),
                blurRadius: 6,
                spreadRadius: 0
            ) ],
          ),
          child: Text("Yape",
            style: TextStyle(
              fontFamily: 'Roboto',
              color: Color(0xffffffff),
              fontSize: 20,
              fontWeight: FontWeight.w400,
              fontStyle: FontStyle.normal,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );

    final mainColumn = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        verticalSpace(30),
        Image.asset('assets/images/pd_recharge_balance.png'),
        verticalSpace(26),
        Text("Con qué medio de pago te\n"
            "gustaría recargar saldo?\n",
          style: TextStyle(
            fontFamily: 'Roboto',
            color: Color(0xff536fe0),
            fontSize: 16,
            fontWeight: FontWeight.w400,
            fontStyle: FontStyle.normal,
          ),
          textAlign: TextAlign.center,
        ),
        verticalSpace(12),
        btnOpt0,
        verticalSpace(16),
        btnOpt1,
        verticalSpace(16),
        btnOpt2,
        verticalSpace(30),
      ],
    );

    final box = Container(
      margin: EdgeInsets.symmetric(horizontal: getPadding(12)).copyWith(bottom: 0),
      padding: EdgeInsets.symmetric(horizontal: getPadding(12)),
      // white box that covers everything
      decoration: new BoxDecoration(
        color: Color(0xffffffff),
        borderRadius: BorderRadius.circular(getPadding(15)),
        boxShadow: [
          BoxShadow(
              color: Color(0x29000000),
              offset: Offset(0, 3),
              blurRadius: 6,
              spreadRadius: 0
          )
        ],
      ),
      child: mainColumn,
    );

    return WillPopScope(
      onWillPop: () async {
        return true;
      },
      child: Stack(
        children: <Widget>[
          // background:
          GestureDetectorTr(
            analyticsName: "btn_grey_area",
            child: Container(
              color: Color(0xff444d52).withOpacity(0.8600000143051147),
            ),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
          Positioned.fill(
            left: 24,
            right: 24,
            top: 44,
            bottom: 24,
            child: Center(
              child: Material(
                color: Colors.transparent,
                child: SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: Container(
                    child: box,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget textUnderline() {
    return Padding(
      padding: EdgeInsets.fromLTRB(44.5, 0, 44.5, 0),
      child: new Container(
        width: double.infinity,
        height: getPadding(1),
        color: Color(0xff707070),
      ),
    );
  }

  Widget verticalSpace(double h) {
    return Container(
      height: h,
    );
  }

  double getPadding(double p) {
    return p;
  }

  double getFontSize(double f) {
    return f;
  }

}

