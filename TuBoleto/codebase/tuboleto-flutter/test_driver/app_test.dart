// Imports the Flutter Driver API.
import 'package:flutter_driver/flutter_driver.dart';
import 'package:pedantic/pedantic.dart';
import 'package:test/test.dart';

void main() {
  group('TuRuta App', () {
    FlutterDriver? driver;

    // Connect to the Flutter driver before running any tests.
    setUpAll(() async {
      driver = await FlutterDriver.connect();
    });

    // Close the connection to the driver after the tests have completed.
    tearDownAll(() async {
      if (driver != null) {
        unawaited(driver!.close());
      }
    });

    test('press back', () async {
      // Use the `driver.getText` method to verify the counter starts at 0.
      expect(await driver!.getText(find.byTooltip("header back")), "0");
    });

    // test('increments the counter', () async {
    //   // First, tap the button.
    //   await driver.tap(buttonFinder);

    //   // Then, verify the counter text is incremented by 1.
    //   expect(await driver.getText(counterTextFinder), "1");
    // });
  });
}
