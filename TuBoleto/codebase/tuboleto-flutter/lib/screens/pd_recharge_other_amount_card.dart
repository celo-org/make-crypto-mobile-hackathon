import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:turuta/scaffold.dart';
import 'package:turuta/screens/page_scaffold_new.dart';
import 'package:turuta/screens/pd_camera_request_onboarding.dart';
import 'package:turuta/screens/pd_recharge_amount_card.dart';
import 'package:turuta/screens/pd_recharge_onboarding.dart';
import 'package:turuta/screens/pd_recharge_register_card.dart';
import 'package:turuta/screens/pd_recharge_status_card.dart';
import 'package:turuta/styles.dart';
import 'package:turuta/testing/transacciones_test.dart';
import 'package:turuta/util/text_utils.dart';
import 'package:turuta/util/toast.dart';
import 'package:turuta/widgets/analytics/GestureDetectorTr.dart';
import 'package:turuta/widgets/common.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:turuta/util/native.dart';
import 'package:turuta/data/firestore_user_dependant_data.dart';
import 'package:turuta/screens/pd_main_screen.dart';
import 'package:turuta/util/firebase_analytics.dart';
import 'package:turuta/api/pd_user_api.dart';
import 'package:turuta/model/opening.dart';
import 'package:turuta/util/pd_trip_util.dart';
import 'package:url_launcher/url_launcher.dart';

class RechargeOtherAmountCard extends StatefulWidget {
  static const routeName = '/recharge_other_amount_card';

  RechargeOtherAmountCard({Key? key}) : super(key: key);

  @override
  _RechargeOtherAmountCardState createState() => _RechargeOtherAmountCardState();
}

class _RechargeOtherAmountCardState extends State<RechargeOtherAmountCard> {
  final controllerMonto = TextEditingController();
  final focusNodeMonto = FocusNode();

  bool isLoading = true;
  late int _minAmountCents;

  double cDollar = 0;
  String cDollarText = "";

  @override
  void dispose() {
    // Clean up the controller when the widget is removed from the
    // widget tree.

    var controllers = [
      controllerMonto,
    ];

    var focus = [
      focusNodeMonto,
    ];

    controllers.forEach((element) {
      element.dispose();
    });
    focus.forEach((element) {
      element.dispose();
    });

    super.dispose();
  }

  @override
  void initState() {
    setState(() {
      controllerMonto.text = (allPagesAnswers[Field.monto] as String) ?? "";
    });

    controllerMonto.addListener(() {

      print(controllerMonto.text);

      if (controllerMonto.text=="") {
        cDollar = 0;
        cDollarText = "";

      } else {
        double? monto = double.tryParse(controllerMonto.text);

        if (monto==null) {
          cDollar = 0;
          cDollarText = "ERROR";
        } else {
          cDollar = monto*1.003977/4.02;
          cDollarText = cDollar.toStringAsFixed(2) + " Celo Dollars";
        };
      }

      setState(() {
        cDollarText = cDollarText;
      });

    });

    // the real android onCreate:
    WidgetsBinding.instance!.addPostFrameCallback((timeStamp) {
      queryMinTopUpAmount().then((value) {
        if (value == null) {
          toast("Sucedió un error, intentalo más tarde");
          Navigator.of(context).pop();
          return;
        }
        setState(() {
          _minAmountCents = value;
          isLoading = false;
        });
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final args =
        (ModalRoute.of(context)!.settings.arguments as CardTopUpFlowArgs) ??
            CardTopUpFlowArgs();

    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;

    if (isLoading) {
      return buildLoadingWidgetScreen();
    }

    final grey_arrow_left = Padding(
      padding: EdgeInsets.only(top: 65.6, left: 33.6),
      child: GestureDetectorTr(
          analyticsName: "btn_rechargeOtherAmountCard_back",
          onTap: () {
            Navigator.of(context).pop();
          },
          child: Image.asset('assets/icon/grey_arrow_left.png')
      ),
    );

    final box = Padding(
      padding: EdgeInsets.fromLTRB(0, 36, 0, 0),
      child:Container(
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
        alignment: Alignment.center,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //Image.asset('assets/images/grupo-15.png'),
            verticalSpace(50.7),
            Image.asset('assets/images/pd_golden_recharge.png'),
            verticalSpace(27.2),
            Text("Pon el monto",
              style: TextStyle(
                fontFamily: 'Roboto',
                color: Color(0xff000000),
                fontSize: 20,
                fontWeight: FontWeight.w400,
                fontStyle: FontStyle.normal,
              ),
              textAlign: TextAlign.center,
            ),
            verticalSpace(29),
            Text("Pon cuanto quieres\nrecargar, recuerda que el mínimo\nes " +
                TextUtils.formatPrice(_minAmountCents, false),
              style: TextStyle(
                fontFamily: 'Roboto',
                color: Color(0xff536fe0),
                fontSize: 16,
                fontWeight: FontWeight.w400,
                fontStyle: FontStyle.normal,
              ),
              textAlign: TextAlign.center,
            ),
            verticalSpace(81),
            TextField(
              controller: controllerMonto,
              focusNode: focusNodeMonto,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontFamily: 'Roboto',
                color: Color(0xff000000),
                fontSize: getFontSize(15),
                fontWeight: FontWeight.w400,
                fontStyle: FontStyle.normal,
              ),
              cursorColor: Styles.searchCursorColor,
              autocorrect: false,
              enableSuggestions: false,
              keyboardType: TextInputType.numberWithOptions(signed: false, decimal: false),
              inputFormatters: [ BlacklistingTextInputFormatter(RegExp("[.]")) ], // to prevent dot from being typed
              decoration: InputDecoration.collapsed(
                hintText: "Monto en Soles",
              ),
            ),
            textUnderline(),
            verticalSpace(15),
            if (args.isCELO)
              Text( cDollarText,
                style: TextStyle(
                  fontFamily: 'Roboto',
                  color: Color(0xff536fe0),
                  fontSize: 16,
                  fontWeight: FontWeight.w400,
                  fontStyle: FontStyle.normal,
                ),
                textAlign: TextAlign.center,
              ),
            verticalSpace(120),
            Padding(
              padding: EdgeInsets.fromLTRB(75, 0, 75, 0),
              child: GestureDetectorTr(
                analyticsName: "btn_rechargeOtherAmountCard",
                onTap: () async {
                  final amountInCents = (int.tryParse(controllerMonto.text) ?? 0) * 100;
                  if (amountInCents < _minAmountCents) {
                    toast("Intenta con un número más grande 😊");
                    return;
                  }

                  /*Navigator.of(context).pushNamed(RechargeRegisterCard.routeName,
                      arguments: args..penCents = amountInCents);*/

                  args.penCents = amountInCents;

                  if (args.isCELO) {
                    startValoraFlow(cDollar,args,context);
                  } else {
                    visanetFlowWrapper(args);
                  }

                },
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.only(top: 9, bottom: 10),
                  alignment: Alignment.center,
                  decoration: new BoxDecoration(
                    borderRadius: BorderRadius.circular(19),
                    color: Color(0xff5a78c9),
                    boxShadow: [BoxShadow(
                        color: Color(0x29000000),
                        offset: Offset(0,3),
                        blurRadius: 6,
                        spreadRadius: 0
                    ) ],
                  ),
                  child: Text("Siguiente",
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
            ),
            verticalSpace(19),
          ],),
      ),
    );

    final boxFinal = Stack(
      children: [
        box,
        Positioned(
            top: 0,
            left: 0,
            child: Center(child: grey_arrow_left)
        ),
      ],
    );

    return MyScaffold(
      child: SizedBox.expand(
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color(0xff42f9b6).withOpacity(0.28),
                Color(0xff08cea7).withOpacity(0.28) ],
              stops: [0, 1],
              begin: Alignment(-0.00, -1.00),
              end: Alignment(0.00, 1.00),
            ),
          ),
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                boxFinal,
              ],
            ),
          ),
        ),
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

  String? getErrorMessage() {
    if (controllerMonto.text.isEmpty) {
      return "Necesitamos que llenes un monto a recargar 😊";
    }
//    if (controllerSMS.text.length < 6) {
//      return "Necesitamos un código SMS válido 😊";
//    }
    return null;
  }

  Future<int?> queryMinTopUpAmount() async {
    try {
      final sn = await FirebaseFirestore.instance.collection('pd_min_top_up').doc('min_top_up').get();
      final penCents = (sn.data() as Map)['PENCents'] as int;
      return penCents;
    } catch (e, s) {
      debugPrint(e.toString());
      FirebaseCrashlytics.instance.recordError(e, s);
      return null;
    }
  }

  void visanetFlowWrapper(CardTopUpFlowArgs args) async {
    setState(() {
      isLoading = true;
    });
    try {
      final success = await startVisanetPaymentFlow(context, args);
    } catch (e, s) {
      FirebaseCrashlytics.instance.recordError(e, s);
      toast(e.toString());
    }
    setState(() {
      isLoading = false;
    });
  }
}

