## Run the Project
1. `npm install` to install all dependencies  
2. `npm start` to start local expo server

## Libraries
* [react-native-snap-carousel](https://github.com/meliorence/react-native-snap-carousel)
* [react-navigation-transitions](https://github.com/plmok61/react-navigation-transitions)

## Error Debugging
If you see the following errors while running the app:
* Invariant Violation: Tried to register two views with the same name RNCSafeAreaProvider
* Invariant Violation: "main" has not been registered.  

Try fixing with: [source](https://stackoverflow.com/questions/64931250/invariant-violation-tried-to-register-two-views-with-the-same-name-rncsafeareap)
* open your app route folder ==> node_modules ==> invariant ==> browser.js
* in browser.js file remove the [if condition code] (line number 28 to 46 )


## Template
This project is modified from the client folder (react native part) of [Celo Truffle Box](https://github.com/critesjosh/celo-dappkit).