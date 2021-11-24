# A simple Celo React Native app w/ Expo

This directory contains a simple [React Native](https://reactnative.dev/) app with the [Expo](https://expo.io/) development framework. 

Look in [App.js](App.js) to see an example of how to use the [Celo DappKit SDK](https://docs.celo.org/developer-guide/overview/introduction/dappkit).



If errors:
Invariant Violation: Tried to register two views with the same name RNCSafeAreaProvider
Invariant Violation: "main" has not been registered.

Fix: https://stackoverflow.com/questions/64931250/invariant-violation-tried-to-register-two-views-with-the-same-name-rncsafeareap
open your app route folder ==> node_modules ==> invariant ==> browser.js
in browser.js file remove the [if condition code] (line number 28 to 46 )


library: 
react-native-snap-carousel: https://github.com/meliorence/react-native-snap-carousel
react-navigation-transitions: https://github.com/plmok61/react-navigation-transitions