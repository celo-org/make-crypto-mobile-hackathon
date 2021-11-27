import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:turuta/model/visanet.dart';
import 'package:turuta/scaffold.dart';
import 'package:turuta/screens/page_scaffold_new.dart';
import 'package:turuta/screens/pd_recharge_amount_card.dart';
import 'package:turuta/screens/pd_main_screen.dart';
import 'package:turuta/screens/pd_recharge_onboarding.dart';
import 'package:turuta/screens/pd_recharge_other_amount_card.dart';
import 'package:turuta/screens/pd_camera_request_onboarding.dart';
import 'package:turuta/screens/pd_register_number.dart';
import 'package:turuta/screens/pd_welcome_community.dart';
import 'package:turuta/styles.dart';
import 'package:turuta/util/text_utils.dart';
import 'package:turuta/util/permission_util.dart';
import 'package:turuta/widgets/analytics/GestureDetectorTr.dart';

class RechargeStatusCard extends StatefulWidget {
  static const routeName = '/recharge_success_card';
  static const routeNameRechargeFail = '/recharge_fail_card';

  RechargeStatusCard({Key? key}) : super(key: key);

  @override
  _RechargeStatusCardState createState() => _RechargeStatusCardState();
}

class _RechargeStatusCardState extends State<RechargeStatusCard> {
  bool isFail = false;
  final controllerMonto = TextEditingController();
  final focusNodeMonto = FocusNode();

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
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    final routeName = ModalRoute.of(context)!.settings.name;
    isFail = routeName == RechargeStatusCard.routeNameRechargeFail;

    final args = ModalRoute.of(context)!.settings.arguments as RechargeStatusCardArgs;

    final screenHeight = MediaQuery.of(context).size.height;
    final screenWidth = MediaQuery.of(context).size.width;

    final grey_arrow_left = Padding(
      padding: EdgeInsets.only(top: 21.6),
      child: GestureDetectorTr(
          analyticsName: "btn_rechargeAmountCard_back",
          onTap: () {
            Navigator.of(context).pushNamed(RechargeOnboarding.routeName);
          },
          child: Image.asset('assets/icon/grey_arrow_left.png')),
    );

    final status = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        verticalSpace(isFail ? 99.9 : 91.6),
        Image.asset(isFail
            ? 'assets/images/pd_recharge_fail.png'
            : 'assets/images/pd_recharge_success.png'),
        verticalSpace(isFail ? 30.9 : 21.1),
        Text(
          isFail
              ? "No se realizó\nla recarga"
              : "Recargaste " + TextUtils.formatPrice(args?.topUpFlowArgs?.penCents ?? 150, false) + "\npara usar en tus viajes",
          style: TextStyle(
            fontFamily: 'Roboto',
            color: Color(0xff000000),
            fontSize: 20,
            fontWeight: FontWeight.w400,
            fontStyle: FontStyle.normal,
          ),
          textAlign: TextAlign.center,
        ),
        verticalSpace(isFail ? 31 : 32),
      ],
    );

    String success = "Transacción";
    String fail = "Error";

    final box = Padding(
      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: getPadding(34))
            .copyWith(bottom: 0),
        padding: EdgeInsets.symmetric(horizontal: getPadding(34)),
        // white box that covers everything
        decoration: new BoxDecoration(
          color: Color(0xfff5f5f5),
          borderRadius: BorderRadius.circular(getPadding(17)),
        ),
        alignment: Alignment.center,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //Image.asset('assets/images/grupo-15.png'),
            verticalSpace(21),
            Text(
              "Información de " +
                  (isFail ? fail : success) +
                  "\nSe recomienda\nhacer un screenshot de la misma",
              style: TextStyle(
                fontFamily: 'Roboto',
                color: Color(0xff27a1ff),
                fontSize: 12,
                fontWeight: FontWeight.w400,
                fontStyle: FontStyle.normal,
              ),
              textAlign: TextAlign.center,
            ),
            verticalSpace(isFail ? 27 : 40),
            buildStatus(isFail, args),
            verticalSpace(isFail ? 27 : 40),
          ],
        ),
      ),
    );

    final action = Container(
        width: double.infinity,
        padding: EdgeInsets.only(top: 12, bottom: 9),
        decoration: new BoxDecoration(
          color: Color(0xffffffff),
          boxShadow: [
            BoxShadow(
                color: Color(0x29000000),
                offset: Offset(0, -3),
                blurRadius: 6,
                spreadRadius: 0)
          ],
        ),
        child: Padding(
          padding: EdgeInsets.fromLTRB(13, 0, 14, 0),
          child: GestureDetectorTr(
            analyticsName:
                "btn_rechargeStatus_" + (isFail ? "wrong" : "s"),
            onTap: () {
              Navigator.of(context).pop(true);
            },
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.only(top: 9, bottom: 9),
              decoration: new BoxDecoration(
                borderRadius: BorderRadius.circular(9),
                gradient: LinearGradient(
                  colors: [Color(0xff42f9b6), Color(0xff08cea7)],
                  stops: [0, 1],
                  begin: Alignment(-1.00, 0.00),
                  end: Alignment(1.00, -0.00),
                ),
              ),
              child: Text(
                isFail ? "Volver a intentar" : "Perfecto",
                style: TextStyle(
                  fontFamily: 'Roboto',
                  color: Color(0xffffffff),
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  fontStyle: FontStyle.normal,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ));

    return MyScaffold(
      child: SizedBox.expand(
        child: Container(
          decoration: BoxDecoration(
            color: Color(0xffffffff),
          ),
          child: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      status,
                      box,
                      verticalSpace(30),
                    ],
                  ),
                ),
              ),
              action,
            ],
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

  Widget buildRechargeAmount(String amount) {
    return Padding(
      padding: EdgeInsets.fromLTRB(19, 0, 19, 21),
      child: GestureDetectorTr(
        analyticsName: "btn_rechargeAmount_" + amount.substring(0, 2),
        onTap: () {
          if (amount.substring(0, 2) == "Ot") {
            Navigator.of(context).pushNamed(RechargeOtherAmountCard.routeName);
          }
        },
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.only(top: 10, bottom: 11),
          decoration: new BoxDecoration(
            borderRadius: BorderRadius.circular(7),
            gradient: LinearGradient(
              colors: [Color(0xff42f9b6), Color(0xff08cea7)],
              stops: [0, 1],
              begin: Alignment(1.00, -0.00),
              end: Alignment(-1.00, 0.00),
            ),
            boxShadow: [
              BoxShadow(
                  color: Color(0x29000000),
                  offset: Offset(0, 3),
                  blurRadius: 6,
                  spreadRadius: 0)
            ],
          ),
          child: Text(
            amount.toString(),
            style: TextStyle(
              fontFamily: 'Roboto',
              color: Color(0xffffffff),
              fontSize: 16,
              fontWeight: FontWeight.w400,
              fontStyle: FontStyle.normal,
            ),
            textAlign: TextAlign.center,
          ),
        ),
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

  Widget buildStatus(bool isFail, RechargeStatusCardArgs args) {
    String v = "";

    final descripcion = args.dataMap?.ACTION_DESCRIPTION ?? '';
    var dateLocal = DateTime.fromMillisecondsSinceEpoch(args.requestNumber??0);
    String formattedDate = DateFormat('dd-MM-yyyy hh:mm a').format(dateLocal);

    if (args.dataMap == null) {

      v = "Lista de Información exigida por VisaNet\nLista de Información exigida por VisaNet\nLista de Información exigida por VisaNet\n";

      if (args.topUpFlowArgs!=null && args.topUpFlowArgs!.isCELO) {
        v = "Número de pedido: " + args.requestNumber.toString() + "\n"
            + "Nombres: " + (args.names??"") + "\n"
            + "Apellidos: " + (args.lastNames??"") + "\n"

            + "Fecha del pedido: " + formattedDate + "\n"
            + "Importe: " + TextUtils.formatPrice(args.topUpFlowArgs?.penCents??0, false) + "\n"
            + "Tipo de moneda: PEN (Nuevos Soles)" + "\n"
            + "Descripción: Recarga VALORA (cUSD)" + "\n"
            + "Términos y condiciones: " + terms_of_service_link + "\n";
      }

    } else {

      if (isFail) {
        v += "Número de pedido: " + args.requestNumber.toString() + "\n"
            + "Fecha del pedido: " + formattedDate + "\n"
            + "Descripción: " + descripcion + "\n"
        ;
      } else {
        v += "Número de pedido: " + args.requestNumber.toString() + "\n"
            + "Nombres: " + (args.names??"") + "\n"
            + "Apellidos: " + (args.lastNames??"") + "\n"
            + "Tarjeta: " + (args.dataMap?.CARD??"") + "\n"
            + "Fecha del pedido: " + formattedDate + "\n"
            + "Importe: " + TextUtils.formatPrice(args.topUpFlowArgs?.penCents??0, false) + "\n"
            + "Tipo de moneda: PEN (Nuevos Soles)" + "\n"
            + "Descripción: Recarga" + "\n"
            + "Términos y condiciones: " + terms_of_service_link + "\n"
        ;
      }
    }


    final details_status = Text(
      v,
      style: TextStyle(
        fontFamily: 'Roboto',
        color: Color(0xff000000),
        fontSize: 11,
        fontWeight: FontWeight.w400,
        fontStyle: FontStyle.normal,
      ),
    );

    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      alignment: WrapAlignment.center,
      children: [
        details_status,
      ],
    );
  }
}

class RechargeStatusCardArgs {
  CardTopUpFlowArgs? topUpFlowArgs;
  int? requestNumber;
  DataMap? dataMap;
  String? names;
  String? lastNames;
}