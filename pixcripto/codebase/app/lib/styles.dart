import 'package:flutter/material.dart';
import 'package:intl/intl.dart' hide TextDirection;

class AppColors {
  static const Color celoColor = Color.fromRGBO(53, 208, 127, 1.0);
  static const Color black = Color.fromRGBO(0, 0, 0, .85);
  static const Color blackOp75 = Color.fromRGBO(0, 0, 0, 0.75);
  static const Color cyan = Color.fromRGBO(23, 162, 184, 1.0);
  static const Color turquoise = Color.fromRGBO(32, 201, 151, 1.0);
  static const Color primaryGray = Color.fromRGBO(102, 102, 102, 1.0);
  static const Color secondaryGray = Color.fromRGBO(196, 196, 196, 1.0);
  static const Color white = Color.fromRGBO(255, 255, 255, 1.0);
  static const Color graphiteGray = Color.fromRGBO(52, 58, 64, 1.0);
  static const Color graphiteGrayOp30 = Color.fromRGBO(52, 58, 64, 0.3);
  static const Color graphiteGrayOp10 = Color.fromRGBO(52, 58, 64, 0.1);
  static const Color gray = Color.fromRGBO(108, 117, 125, 1.0);
  static const Color green = Color.fromRGBO(47, 184, 78, 1.0);
  static const Color yellow = Color.fromRGBO(255, 193, 7, 1.0);
  static const Color orange = Color.fromRGBO(253, 126, 20, 1.0);
  static const Color red = Color.fromRGBO(220, 53, 69, 1.0);
  static const Color pink = Color.fromRGBO(232, 62, 140, 1.0);
  static const Color purple = Color.fromRGBO(111, 66, 193, 1.0);
  static const Color indigo = Color.fromRGBO(102, 16, 242, 1.0);
  static const Color blue = Color.fromRGBO(0, 123, 255, 1.0);
  static const Color gray02 = Color.fromRGBO(62, 68, 72, 1.0);
  static const Color background = Color.fromRGBO(242, 242, 242, 1.0);
  static const Color transparent = Colors.transparent;
  // start color in the app drawer gradient background
  static const Color gray03 = Color.fromRGBO(59, 70, 82, 1.0);
}

class AppStrings {
  static String? getCurrencyNameBySymbol(String? symbol) {
    if (symbol == 'MCO2') {
      return "Moss Carbon Credit";
    } else if (symbol == 'CUSD') {
      return "Celo Dollar";
    } else {
      return symbol;
    }
  }
}

class AppFlex {
  static final int factor1 = 1;
  static final int factor8 = 8;
  static final int factor10 = 10;
  static final int factor20 = 20;
  static final int factor24 = 24;
  static const int factor30 = 30;
  static const int factor34 = 34;
  static final int factor40 = 40;
  static final int factor54 = 54;
  static const int factor64 = 64;
  static const int factor70 = 70;
  static const int factor124 = 124;
  static final int factor154 = 154;
  static const int factor184 = 184;
}

class AppHeight {
  static const double bottomAppBarFooter = 94;
}

class AppLineHeight {
  static const double height166 = 30 / 18;
}

class AppSpacing {
  static const double space0 = 0;
  static const double space1 = 1;
  static const double space2 = 2;
  static const double space4 = 4;
  static const double space5 = 5;
  static const double space6 = 6;
  static const double space7 = 7;
  static const double space8 = 8;
  static const double space10 = 10;
  static const double space12 = 12;
  static const double space14 = 14;
  static const double space15 = 15;
  static const double space16 = 16;
  static const double space20 = 20;
  static const double space24 = 24;
  static const double space28 = 28;
  static const double space30 = 30;
  static const double space38 = 38;
  static const double space35 = 35;
  static const double space40 = 40;
  static const double space42 = 42;
  static const double space50 = 50;
  static const double space54 = 54;
  static const double space60 = 60;
  static const double space64 = 64;
  static const double space70 = 70;
  static const double space74 = 74;
  static const double space80 = 80;
  static const double space90 = 90;
  static const double space100 = 100;
  static const double space120 = 120;
  static const double space130 = 130;
  static const double space150 = 150;
  static const double space160 = 160;
  static const double space200 = 200;
  static const double space280 = 280;
  static const double appBarHeight = 60;
}

class AppBorderRadius {
  static const double radius6 = 6.0;
  static const double radius10 = 10.0;
}

class AppElevation {
  static const double elevation3 = 3.0;
}

class AppTiming {
  static const int fadeInMs = 400;
  static const int progressInMs = 250;
  static const int rotationDurationInMs = 4000;
}

class AppImages {
  static const String welcome = 'assets/images/undraw_welcome_re_h3d9.svg';

  // instructions
  static const String bank = 'assets/images/undraw_online_banking_-7-jy4.svg';
  static const String night = 'assets/images/undraw_late_at_night_re_d3mx.svg';
  static const String balloon = 'assets/images/undraw_floating_re_xtcj.svg';
}

class AppIcons {
  static const String eye = 'assets/icons/eye.svg';
  static const String eyeClosed = 'assets/icons/eye_closed.svg';
  static const String menu = 'assets/icons/menu.svg';
  static const String balloon = 'assets/icons/balloon.svg';
  static const String clip = 'assets/icons/clip.svg';

  static String currencyIcon(String? symbol) {
    symbol = (symbol == '' ? 'BTC' : symbol)!.toLowerCase();

    return "assets/icons/currencies/${symbol}.svg";
  }
}

class AppBottomIconStyle {
  static const Color activeColor = AppColors.graphiteGray;
  static const Color inactiveColor = AppColors.gray;

  static const double defaultWidth = 23;
  static const double defaultHeight = 23;

  static const double buyAndSellWidth = 22;
  static const double buyAndSellHeight = 30;
}

class AppDrawerIconStyle {
  static const Color defaultColor = AppColors.celoColor;

  static const double defaultWidth = 18;
  static const double defaultHeight = 18;

  static const double buyAndSellWidth = 18;
  static const double buyAndSellHeight = 18;
}

class TradesIconStyle {
  static const Color defaultColor = AppColors.celoColor;

  static const double defaultWidth = 20;
  static const double defaultHeight = 20;
  static const double defaultSize = 20;
}

class BankLogoStyle {
  static const double width = 46;
  static const double height = 46;
}

class ExchangeLogoStyle {
  static const double width = 100;
}

class AppBarColors {
  static const Color pixCripto = AppColors.celoColor;
  static const Color white = AppColors.white;
  static const Color background = AppColors.background;
}

class AppBorderSides {
  static const BorderSide graphiteGray = BorderSide(
    color: AppColors.graphiteGrayOp10,
    style: BorderStyle.solid,
    width: AppSpacing.space1,
  );

  static const BorderSide white = BorderSide(
    color: AppColors.white,
    style: BorderStyle.solid,
    width: AppSpacing.space1,
  );
}

class AppDrawer {
  static const List<double> gradientStops = [0.0, 0.68];
  static const double headerBottomBorderWidth = 2.0;
  static const double profileImageBorderRadius = 100.0;
  static const double statusIconBorderRadius = 100.0;
  static const double statusIconSize = 18.0;
  static const double textWrapWidth = 130.0;
}

class AppTheme {
  static final base = ThemeData.light();
  static final theme = ThemeData(
    fontFamily: _defaultFontFamily,
    primaryColor: AppColors.celoColor,
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.white,
    textSelectionTheme: TextSelectionThemeData(
      selectionColor: AppColors.celoColor,
    ),
    errorColor: AppColors.red,
    appBarTheme: _appBarTheme,
    textTheme: _textTheme,
    buttonTheme: _defaultButtonTheme,
    elevatedButtonTheme: _defaultElevatedButtonTheme,
    outlinedButtonTheme: _defaultOutlinedButtonTheme,
    dividerColor: AppColors.graphiteGray,
    sliderTheme: SliderThemeData(
      activeTrackColor: AppColors.celoColor,
      inactiveTrackColor: AppColors.secondaryGray,
      thumbShape: AppSliderThumbShape(),
      overlayColor: AppColors.graphiteGray,
      showValueIndicator: ShowValueIndicator.never,
    ),
    colorScheme: ColorScheme.fromSwatch().copyWith(
      secondary: AppColors.celoColor,
    ),
    cardTheme: CardTheme(
      color: AppColors.white,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
    ),
  );

  static const String _defaultFontFamily = 'OpenSans';

  static AppBarTheme _appBarTheme = AppBarTheme(color: AppColors.celoColor);

  static ButtonThemeData _defaultButtonTheme = ButtonThemeData(
    textTheme: ButtonTextTheme.accent,
    padding: EdgeInsets.all(18),
    minWidth: AppSpacing.space150,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10.0),
    ),
    colorScheme: base.colorScheme.copyWith(
      primary: AppColors.celoColor,
      secondary: AppColors.graphiteGray,
      primaryVariant: AppColors.transparent,
      secondaryVariant: AppColors.gray,
    ),
  );

  static ElevatedButtonThemeData _defaultElevatedButtonTheme =
      ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: 0,
      padding: EdgeInsets.all(18),
      minimumSize: new Size(
        AppSpacing.space150,
        10,
      ),
      primary: AppColors.celoColor,
      onPrimary: AppColors.blackOp75,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(
          10.0,
        ),
      ),
    ),
  );

  static OutlinedButtonThemeData _defaultOutlinedButtonTheme =
      OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      minimumSize: new Size(
        AppSpacing.space150,
        10,
      ),
      primary: AppColors.celoColor,
      padding: EdgeInsets.all(18),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(
          10.0,
        ),
      ),
    ),
  );

  static TextTheme _textTheme = base.textTheme.copyWith(
    headline1: TextStyle(fontSize: 60.0, height: 1.25),
    headline2: TextStyle(fontSize: 32.0, height: 1.25),
    headline3: TextStyle(fontSize: 18.0, height: 1.25),
    headline4: TextStyle(fontSize: 16.0),
    headline5: TextStyle(fontSize: 12.0),
    headline6: TextStyle(fontSize: 10.0),
    bodyText2: TextStyle(fontSize: 10.0, color: AppColors.graphiteGrayOp30),
    button: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w600),
  );

  static const profileImageText = TextStyle(
      fontSize: 22.0,
      fontWeight: FontWeight.w700,
      color: AppColors.graphiteGray);

  static const button2 = TextStyle(
      fontSize: 9.0, letterSpacing: -0.27, color: AppColors.gray, height: 1.2);

  static final screenTitle32 =
      TextStyle(fontSize: 32.0, height: 1.25, color: AppColors.gray);

  static final formText =
      TextStyle(fontSize: 20.0, height: 1.50, color: AppColors.graphiteGray);

  static final formTextBold = TextStyle(
    fontSize: 20.0,
    height: 1.50,
    color: AppColors.graphiteGray,
    fontWeight: FontWeight.w600,
  );

  static final formTextError =
      TextStyle(fontSize: 16.0, height: 1.25, color: AppColors.red);

  static const textStyleFont14 = const TextStyle(
    fontSize: 14,
  );

  static const textStyleFont14BoldGray = const TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.gray,
  );

  static const textStyleFont14BoldRed = const TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.red,
  );

  static const textStyle12ItalicGray = TextStyle(
    fontSize: 12.0,
    fontStyle: FontStyle.italic,
    color: AppColors.gray,
  );

  static final percentageGainStyle = const TextStyle(
    fontSize: 13,
    letterSpacing: 0.5,
    color: AppColors.white,
    // Semi-bold
    fontWeight: FontWeight.w600,
  );

  static const accountVerificationTitle =
      TextStyle(fontSize: 28.0, height: 1.25, color: AppColors.graphiteGray);

  static const accountVerificationBodyText =
      TextStyle(fontSize: 16.0, height: 1.25, color: AppColors.graphiteGray);

  static const accountVerificationBodyTextBold = TextStyle(
      fontSize: 16.0,
      height: 1.25,
      color: AppColors.graphiteGray,
      fontWeight: FontWeight.bold);

  static const accountVerificationButtonText = TextStyle(
      fontSize: 16.0,
      height: 1.25,
      color: AppColors.graphiteGray,
      fontWeight: FontWeight.w600);

  static const accountVerificationCaptureImageTitle =
      TextStyle(fontSize: 18.0, height: 1.5, color: AppColors.white);

  static const accountVerificationPreviewImageText =
      TextStyle(fontSize: 12.0, color: AppColors.white);

  static const textStyle16BoldGraphyte = TextStyle(
      fontSize: 16.0,
      fontWeight: FontWeight.w600,
      color: AppColors.graphiteGray);

  static const profileName = TextStyle(
      fontSize: 19.0,
      height: 1.5,
      color: AppColors.graphiteGray,
      fontWeight: FontWeight.w500);

  static const errorScreenMessage =
      TextStyle(fontSize: 16.0, height: 1.25, color: AppColors.graphiteGray);

  static const withdrawalSelectorPriority = const TextStyle(
    fontSize: 10,
    color: AppColors.gray,
  );

  static const withdrawalSelectorPrioritySelected = const TextStyle(
    fontSize: 10,
    fontWeight: FontWeight.w600,
    color: AppColors.gray,
  );

  static const withdrawalSelectorValue = const TextStyle(
    fontSize: 12,
    color: AppColors.gray,
  );

  static const withdrawalSelectorValueSelected = const TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    color: AppColors.gray,
  );

  static const btcAddressDefaultStyle = TextStyle(
    fontSize: 18.0,
    height: 1.25,
    color: AppColors.graphiteGray,
    fontWeight: FontWeight.bold,
  );

  static const btcAddressDefaultStyleAlternate = TextStyle(
    fontSize: 16.0,
    color: AppColors.graphiteGray,
  );

  static const btcAddressHighlightStyleAlternate = TextStyle(
    fontSize: 16.0,
    color: AppColors.pink,
    fontWeight: FontWeight.bold,
  );

  static const btcAddressHighlightStyle = TextStyle(
    fontSize: 18.0,
    height: 1.25,
    color: AppColors.pink,
    fontWeight: FontWeight.bold,
  );

  static const alternateTitleStyle = TextStyle(
    fontSize: 28.0,
    color: AppColors.gray,
  );

  static const sectionStyle = TextStyle(
    fontSize: 18.0,
    color: AppColors.graphiteGray,
  );

  static const valueStyle = TextStyle(
    fontSize: 16.0,
    color: AppColors.graphiteGray,
    fontWeight: FontWeight.bold,
  );
}

class AppProportions {
  static const mainColumnWidth = 0.6;
}

final DateFormat formatter = DateFormat('dd/MM/yyy HH:mm:ss');

class AppFormats {
  static final NumberFormat moneyFormat = NumberFormat.currency(symbol: 'R\$ ');

  static String getFormattedDate(DateTime date) {
    return formatter.format(date);
  }
}

class AppShadows {
  static final BoxShadow smallIconShadow = BoxShadow(
    color: AppColors.gray.withOpacity(0.5),
    offset: const Offset(0, 2),
  );
}

class AppTableColumnWidth {
  static final depositInfoTable = {
    0: const FractionColumnWidth(0.1),
    1: const FractionColumnWidth(0.35)
  };
}

class AppSliderThumbShape extends SliderComponentShape {
  final double innerRadius;
  final double outterRadius;

  const AppSliderThumbShape({
    this.innerRadius = 7,
    this.outterRadius = 18,
  });

  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) {
    return Size.fromRadius(outterRadius);
  }

  @override
  void paint(PaintingContext context, Offset center,
      {Animation<double>? activationAnimation,
      Animation<double>? enableAnimation,
      bool? isDiscrete,
      TextPainter? labelPainter,
      RenderBox? parentBox,
      SliderThemeData? sliderTheme,
      // dart:ui.TextDirection might conflict package:intl.TextDirection
      TextDirection? textDirection,
      double? value,
      double? textScaleFactor,
      Size? sizeWithOverflow}) {
    final canvas = context.canvas;
    final innerPaint = Paint()
      ..color = AppColors.celoColor
      ..style = PaintingStyle.fill;
    final outterPaint = Paint()
      ..color = AppColors.graphiteGray
      ..style = PaintingStyle.fill;

    canvas.drawCircle(center, outterRadius, outterPaint);
    canvas.drawCircle(center, innerRadius, innerPaint);
  }
}
