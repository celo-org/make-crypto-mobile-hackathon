import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:pixcripto/common/primary_button.dart';
import 'package:pixcripto/common/show_bottom_dialog.dart';
import 'package:pixcripto/screens/send/widgets/confirm_send_modal.dart';
import 'package:pixcripto/styles.dart';
import 'package:pixcripto/utils/handle_paste.dart';
import 'package:pixcripto/utils/throttler.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class QRScan extends StatefulWidget {
  const QRScan({Key? key}) : super(key: key);

  @override
  _QRScanState createState() => _QRScanState();
}

class _QRScanState extends State<QRScan> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  late QRViewController controller;

  bool showNextPage = false;

  final _throttler = new Throttler(milliseconds: 500);

  // In order to get hot reload to work we need to pause the camera if the platform
  // is android, or resume the camera if the platform is iOS.
  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller.pauseCamera();
    } else if (Platform.isIOS) {
      controller.resumeCamera();
    }
  }

  void _onQRViewCreated(QRViewController controller) {
    try {
      this.controller = controller;
      controller.scannedDataStream.listen((scanData) async {
        _throttler.run(() {
          // if (!this.invoiceFound) {
          print('reading qr ${scanData.code}');
          this.handleAddress(scanData.code ?? '');
        });
        // }
      });
    } catch (e) {
      print(e);
    }
  }

  void handleAddress(String tAddress) {
    tAddress = tAddress.toLowerCase();
    String? address;

    if (tAddress.startsWith('0x')) {
      address = tAddress;
    }

    if (address != null) {
      showBottomDialog(
        context: context,
        height: 300,
        child: ConfirmSendModal(
          address: address,
        ),
      );
    }
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        alignment: AlignmentDirectional.center,
        children: <Widget>[
          QRView(
            overlay: QrScannerOverlayShape(
              borderColor: AppColors.celoColor,
            ),
            key: qrKey,
            onQRViewCreated: _onQRViewCreated,
          ),
          Positioned(
            left: 0,
            top: 40,
            // bottom: AppSpacing.space30,
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 0, 0, 0),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(30)),
                  color: AppColors.celoColor,
                  // boxShadow: [
                  //   BoxShadow(color: AppColors.blackOp75, spreadRadius: 3),
                  // ],
                ),
                child: CloseButton(
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ),
            ),
          ),
          Positioned(
            right: 0,
            left: 0,
            bottom: AppSpacing.space30,
            child: Container(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
              child: PrimaryButton(
                onPressed: () async {
                  this.handleAddress(await handlePaste());
                },
                child: Text('Colar endereço'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
