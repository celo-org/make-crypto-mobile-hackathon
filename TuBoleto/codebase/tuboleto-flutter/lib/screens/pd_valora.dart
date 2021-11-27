//import 'dart:html';

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:turuta/util/enum.dart';
import 'package:turuta/util/toast.dart';
import 'package:turuta/widgets/analytics/RaisedButtonTr.dart';
import 'package:url_launcher/url_launcher.dart';
//import 'package:wallet_connect/wallet_connect.dart';

class PdValora extends StatefulWidget {
  static const routeName = '/PdValora';

  PdValora({Key? key}) : super(key: key);

  @override
  _PdValoraState createState() =>
      _PdValoraState();
}

class _PdValoraState
    extends State<PdValora> {

  @override
  void initState() {
    super.initState();

    // final wcClient = WCClient(
    //   onConnect: () {
    //     // Respond to connect callback
    //     print("onConnect");
    //   },
    //   onDisconnect: (code, reason) {
    //     // Respond to disconnect callback
    //     print("onDisconnect");
    //     print(code.toString());
    //     print(reason.toString());
    //   },
    //   onFailure: (error) {
    //     // Respond to connection failure callback
    //     print("onFailure");
    //     print(error.toString());
    //   },
    //   onSessionRequest: (id, peerMeta) {
    //     // Respond to connection request callback
    //     print("onSessionRequest");
    //     print(id.toString());
    //     print(peerMeta.toString())
    //   },
    //   onEthSign: (id, message) {
    //     // Respond to personal_sign or eth_sign or eth_signTypedData request callback
    //     print("onEthSign");
    //     print(id.toString());
    //     print(message.toString());
    //
    //   },
    //   onEthSendTransaction: (id, tx) {
    //     // Respond to eth_sendTransaction request callback
    //     print("onEthSendTransaction");
    //     print(id.toString());
    //     print(tx.toString());
    //   },
    //   onEthSignTransaction: (id, tx) {
    //     // Respond to eth_signTransaction request callback
    //     print("onEthSignTransaction");
    //     print(id.toString());
    //     print(tx.toString());
    //   },
    // );
    // String wcUri = "wc:...";
    // final session = WCSession.from(wcUri);
    // final peerMeta = WCPeerMeta(
    //   name: 'Example TuRuta Wallet',
    //   url: 'https://example.wallet',
    //   description: 'Example Wallet',
    //   icons: [],
    // );
    //
    // wcClient.connectNewSession(session: session, peerMeta: peerMeta);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: ListView(
          children: <Widget>[
            RaisedButtonTr(
              onPressed: () async {
                launch("celo://wallet/pay?address=0xc528f91cf9035878d92d7c043377eab2af9dc6a7&displayName=Kefrin+huaman&e164PhoneNumber=%252B51966723347");
              },
              child: Text("pagarle a kef"),
            ),
            RaisedButtonTr(
              onPressed: () async {
                launch("celo://wallet/pay?address=0xca0bc7119a461d58fb4d498921248892677060fa&displayName=Josue+Julcarima&e164PhoneNumber=%252B51966754733&amount=0.02");
                Timer(const Duration(seconds: 30), () {
                  print('Closing WebView after 5 seconds...');
                  closeWebView();
                });
              },
              child: Text("pagarle a Jou"),
            ),
          ],
        ),
      ),
    );
  }
}
