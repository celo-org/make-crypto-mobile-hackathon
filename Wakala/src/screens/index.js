import * as React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "./Onboarding";

import ToC from "./Auth/ToC";
import SignUpScreen from "./Auth";
import SetPIN from "./Auth/SetPIN";
import VerifyNumber from "./Auth/VerifyNumber";
import ConnectPhone from "./Auth/ConnectPhone";
import VerifyCeloCodes from "./Auth/VerifyCeloCodes";
import PhoneVerificationLoader from "./Auth/PhoneVerification";

import DrawerNav from "../components/DrawerNav";

const RootStack = createStackNavigator();
function Screens(props) {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {props.finishedBoarding !== true ? (
        <>
          <RootStack.Screen name="Landing" component={OnboardingScreen} />
          <RootStack.Screen name="Signup" component={SignUpScreen} />
          <RootStack.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootStack.Screen name="ToC" component={ToC} />
          <RootStack.Screen name="SetPIN" component={SetPIN} />
          <RootStack.Screen name="ConnectPhone" component={ConnectPhone} />
          <RootStack.Screen
            name="PhoneVerificationLoader"
            component={PhoneVerificationLoader}
          />
          <RootStack.Screen
            name="VerifyCeloCodes"
            component={VerifyCeloCodes}
          />
        </>
      ) : (
        <>
          <RootStack.Screen name="Drawer Nav" component={DrawerNav} />
        </>
      )}
    </RootStack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    finishedBoarding: state.finishedBoarding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: async (action) => {
      await dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);
