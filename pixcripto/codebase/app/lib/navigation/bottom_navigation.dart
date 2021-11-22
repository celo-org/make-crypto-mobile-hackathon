import 'package:bottom_navy_bar/bottom_navy_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:pixcripto/screens/home/home.dart';
import 'package:pixcripto/screens/send/send.dart';
import 'package:pixcripto/screens/settings/settings.dart';
import 'package:pixcripto/styles.dart';

class BottomNavigation extends StatefulWidget {
  @override
  _BottomNavigationState createState() => _BottomNavigationState();
}

class _BottomNavigationState extends State<BottomNavigation> {
  int _currentIndex = 0;
  final List<Widget> _telas = [
    Home(),
    Send(),
    Settings(),
  ];

  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: null,
      body: SizedBox.expand(
        child: PageView(
          controller: _pageController,
          onPageChanged: (index) {
            setState(() => _currentIndex = index);
          },
          children: _telas,
        ),
      ),
      bottomNavigationBar: BottomNavyBar(
        selectedIndex: _currentIndex,
        showElevation: true,
        onItemSelected: onTabTapped,
        itemCornerRadius: AppBorderRadius.radius10,
        curve: Curves.linear,

        // backgroundColor: AppColors.celoColor,

        items: [
          BottomNavyBarItem(
            icon: Icon(Icons.home_filled),
            title: Text("Home"),
            inactiveColor: AppColors.celoColor,
            activeColor: AppColors.celoColor,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.qr_code_scanner_outlined),
            title: Text("Enviar"),
            inactiveColor: AppColors.celoColor,
            activeColor: AppColors.celoColor,
          ),
          BottomNavyBarItem(
            icon: SvgPicture.asset(AppIcons.menu, color: AppColors.celoColor),
            title: Text("Menu"),
            inactiveColor: AppColors.celoColor,
            activeColor: AppColors.celoColor,
          ),
        ],
      ),
    );
  }

  void onTabTapped(int index) {
    setState(
      () {
        _currentIndex = index;
        _pageController.animateToPage(
          index,
          duration: Duration(milliseconds: 300),
          curve: Curves.ease,
        );
      },
    );
  }
}
