import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:pixcripto/stores/settings_store.dart';
import 'package:pixcripto/styles.dart';
import 'package:provider/provider.dart';

class Instructions extends StatelessWidget {
  Instructions({Key? key}) : super(key: key);

  Future<void> confirmInstructions(BuildContext context) async {
    SettingsStore settingsStore =
        Provider.of<SettingsStore>(context, listen: false);

    await settingsStore.toggleInstructionsPix();

    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    List<PageViewModel> listPagesViewModel = [
      PageViewModel(
        title: "Envie um Pix a qualquer hora do dia, ou da noite",
        decoration: PageDecoration(
          titleTextStyle: Theme.of(context).textTheme.headline2!,
        ),
        bodyWidget: Row(
          mainAxisAlignment: MainAxisAlignment.center,
        ),
        image: SvgPicture.asset(
          AppImages.night,
          height: AppSpacing.space200,
        ),
      ),
      PageViewModel(
        title:
            "O ativo que estiver com este símbolo será comprado automaticamente",
        decoration: PageDecoration(
          titleTextStyle: Theme.of(context).textTheme.headline2!,
        ),
        bodyWidget: Row(
          mainAxisAlignment: MainAxisAlignment.center,
        ),
        image: SvgPicture.asset(
          AppImages.balloon,
          height: AppSpacing.space200,
        ),
      ),
      PageViewModel(
        title:
            "Utilize uma conta de mesmo CPF, caso contrário não reconheceremos o Pix",
        decoration: PageDecoration(
          titleTextStyle: Theme.of(context).textTheme.headline2!,
        ),
        bodyWidget: Row(
          mainAxisAlignment: MainAxisAlignment.center,
        ),
        image: SvgPicture.asset(
          AppImages.bank,
          height: AppSpacing.space200,
        ),
      ),
    ];

    return IntroductionScreen(
      pages: listPagesViewModel,
      onDone: () => this.confirmInstructions(context),
      showSkipButton: false,
      next: const Icon(
        Icons.navigate_next,
        color: AppColors.celoColor,
      ),
      done: const Text(
        "Entendido",
        style: TextStyle(
          fontWeight: FontWeight.w600,
          color: AppColors.celoColor,
        ),
      ),
      dotsDecorator: DotsDecorator(
        size: const Size.square(
          10.0,
        ),
        activeSize: const Size(
          20.0,
          10.0,
        ),
        activeColor: AppColors.celoColor,
        color: Colors.black26,
        spacing: const EdgeInsets.symmetric(
          horizontal: 3.0,
        ),
        activeShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25.0),
        ),
      ),
    );
  }
}
