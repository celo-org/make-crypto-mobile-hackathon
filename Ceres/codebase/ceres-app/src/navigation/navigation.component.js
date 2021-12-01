//Importações Externas
import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

//Importações Internas
import {LocalizationContext} from '../locales';
import {ThemeContext} from '../../theme-context';
import {ChangePasswordScreen} from '../screens/changepassword';
import {EditProfileScreen} from '../screens/editprofile';
import {ForgotPasswordScreen} from '../screens/forgotpassword';
import FaqScreen from '../screens/faqscreen';
import {Homescreen} from '../screens/homescreen';
import {LegalScreen} from '../screens/legal';
import {LinkedAccountsScreen} from '../screens/linkedaccounts';
import {LoadingScreen} from '../screens/loadingscreen';
import {LoginScreen} from '../screens/loginscreen';
import {MyDataScreen} from '../screens/mydata';
import {PrivacyPolicyScreen} from '../screens/privacypolicy';
import {ProfileScreen} from '../screens/profilescreen';
import {HelpScreen} from '../screens/helpscreen';
import {ReferalScreen} from '../screens/referalscreen';
import {SettingsScreen} from '../screens/settingsscreen';
import {ShareApp} from '../screens/shareapp';
import {PromoCodeScreen} from '../screens/promoCode';
import {SignupScreen} from '../screens/signupscreen';
import {TaskAnsweringScreen} from '../screens/taskanswering';
import {TaskFinishedScreen} from '../screens/taskfinished';
import {TermsScreen} from '../screens/terms';
import {WelcomeScreen} from '../screens/welcomescreen';
import {RequestWithDrawScreen} from '../screens/requestwithdraw';
import {ConfirmWithdrawScreen} from '../screens/confirmwithdraw';
import {AddAccountScreen} from '../screens/addAccount';
import {ValidatePhoneScreen} from '../screens/validatePhone';
import {ValidateEmailScreen} from '../screens/validateEmail';
import {CreatePinScreen} from '../screens/createPin';
import {VerifyIdentityScreen} from '../screens/verifyIdentity';
import {VerifiedAccountScreen} from '../screens/verifiedAccount';
import Extrato from '../screens/extrato';
import {UploadDocumentScreen} from '../screens/uploadDocument';

import {navigationRef} from './NavigationService';
import {EditProfileDetailScreen} from '../screens/editProfileDetail';
import GanheScreen from '../screens/Ganhe';
import InvestmentsScreen from '../screens/Investments';
import ServicosScreen from '../screens/Servicos';
import NewsScreen from '../screens/Noticias';
import PortfolioScreen from '../screens/Investments/Portfolio';
import {FinancialAssetsListScreen} from '../screens/FinancialAssets';
import {FinancialAssetDetailScreen} from '../screens/FinancialAssets/AssetsDetail';
import {TriviaScreen} from '../screens/Trivia';
import {InvestorProfileScreen} from '../screens/InvestorProfile';
import {AchievementDetailScreen} from '../screens/InvestorProfile/AchievementDetail';

import {RankingScreen} from '../screens/Ranking';

// Pega o estado atual de navegação
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // Entra nos navigators aninhados
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

// Navegador Principal
export const AppNavigator = () => {
  const authState = useSelector((state) => state.authState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentRouteName = getActiveRouteName(currentState);
        const previousRouteName = getActiveRouteName(prevState);
        if (previousRouteName !== currentRouteName) {
          //envia para o analytics a tela atual
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }
      }}>
      {authState.logged ? <LoggedInNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// Navagador de tabs na parte principal
const BottomTab = createBottomTabNavigator();
const TabNavigator = () => (
  <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Inicio" component={Homescreen} />
    <BottomTab.Screen name="Investments" component={InvestmentsScreen} />
    {/* <BottomTab.Screen
      name="FinancialAssets"
      component={FinancialAssetsListScreen}
    /> */}
    {/* <BottomTab.Screen name="Ranking" component={RankingScreen} /> */}
    <BottomTab.Screen name="Trivia" component={TriviaScreen} />
    <BottomTab.Screen name="Investor" component={InvestorProfileScreen} />
    {/*<BottomTab.Screen name="Notícias" component={NewsScreen} />*/}
    <BottomTab.Screen name="Profile" component={ProfileScreen} />
  </BottomTab.Navigator>
);

// Botões do navegador inferior
const BottomTabBar = ({navigation, state}) => {
  //Tradução
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //initializeAppLanguage(); //
  // var activeRoute = 'Home';
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
    // console.log(state.routeNames[index]);
  };

  // console.log(state)
  // console.log('ROTA ' + activeRoute)
  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  return (
    <SafeAreaView
      style={{
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
      }}>
      {/* {console.log(state.routeNames[state.index])} */}

      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab
          title="Home"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        <BottomNavigationTab
          title="Carteira"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        {/* <BottomNavigationTab
          title="Ativos"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        /> */}
        {/* <BottomNavigationTab
          title="Ranking"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        /> */}
        <BottomNavigationTab
          title="Trivia"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        <BottomNavigationTab
          title="InvestorProfile"
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
        <BottomNavigationTab
          title={translations['bottomBar.profile']}
          style={{padding: 10}}
          titleStyle={{fontFamily: 'Poppins'}}
        />
      </BottomNavigation>
    </SafeAreaView>
  );
};

//Navigator de autenticação
const AuthStack = createStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Referal" component={ReferalScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Forgot" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="Terms" component={TermsScreen} />
    <AuthStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
  </AuthStack.Navigator>
);

// Home Stack
const Stack = createStackNavigator();

const LoggedInNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="FinancialAssetsList" component={FinancialAssetsListScreen} />
    
    <Stack.Screen name="Task" component={SurveyNavigator} />
    <Stack.Screen name="Withdraw" component={WithdrawNavigator} />
    <Withdraw.Screen name="Requestwithdraw" component={RequestWithDrawScreen} />
    <Withdraw.Screen name="Addaccount" component={AddAccountScreen} />
    <Withdraw.Screen
      name="Confirmwithdraw"
      options={{gestureEnabled: false}}
      component={ConfirmWithdrawScreen}
    />

    <ProfileStack.Screen name="Extrato" component={Extrato} />
    <SettingsStack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
    />
    <ProfileStack.Screen
      name="VefifiedStatus"
      component={VerifiedAccountScreen}
    />
    <ProfileStack.Screen name="Detail" component={EditProfileScreen} />
    <ProfileStack.Screen name="EditData" component={EditProfileDetailScreen} />
    <ProfileStack.Screen name="ValidatePhone" component={ValidatePhoneScreen} />
    <ProfileStack.Screen name="ValidateEmail" component={ValidateEmailScreen} />
    <ProfileStack.Screen
      name="VerifyIdentity"
      component={VerifyIdentityScreen}
    />
    <ProfileStack.Screen
      name="UploadDocument"
      component={UploadDocumentScreen}
    />
    <ProfileStack.Screen name="Settings" component={SettingsNavigator} />
    <ProfileStack.Screen name="Pin" component={CreatePinScreen} />
    <ProfileStack.Screen
      name="AssociedAccounts"
      component={LinkedAccountsScreen}
    />
    <ProfileStack.Screen name="ShareApp" component={ShareApp} />
    <ProfileStack.Screen name="PromoCode" component={PromoCodeScreen} />
    <ProfileStack.Screen name="Legal" component={LegalNavigator} />
    <ProfileStack.Screen name="Suport" component={SupportNavigator} />
    <Wallet.Screen name="PoolWallet" component={WalletNavigator} />
    <FinancialAssets.Screen
      name="FinancialAssets"
      component={FinancialAssetsNavigator}
    />
    <FinancialAssets.Screen
      name="FinancialAssetDetail"
      component={FinancialAssetDetailScreen}
    />
    <InvestorProfile.Screen
      name="InvestorProfile"
      component={InvestorProfileNavigator}
    />
    <InvestorProfile.Screen
      name="AchievementDetail"
      component={AchievementDetailScreen}
    />
  </Stack.Navigator>
);

// const HomeNavigator = () => (

//   <Stack.Navigator  headerMode="none">
//       <Stack.Screen name="Home" component={ Homescreen } />
//       <Stack.Screen name="Task" component={SurveyNavigator} />
//       <Stack.Screen name="Withdraw" component={WithdrawNavigator} />
//       <ProfileStack.Screen name="Detail" component={EditProfileScreen}  />
//       <ProfileStack.Screen name="Extrato" component={Extrato}  />
//       <ProfileStack.Screen name="UploadDocument" component={UploadDocumentScreen} />
//       <ProfileStack.Screen name="PromoCode" component={PromoCodeScreen} />
//       <ProfileStack.Screen name="Pin" component={CreatePinScreen} />
//       <ProfileStack.Screen name="VefifiedStatus" component={VerifiedAccountScreen} />
//       <ProfileStack.Screen name="VerifyIdentity" component={VerifyIdentityScreen} />
//       <ProfileStack.Screen name="ValidateEmail" component={ValidateEmailScreen} />
//       <ProfileStack.Screen name="ValidatePhone" component={ValidatePhoneScreen} />
//       <ProfileStack.Screen name="ShareApp" component={ShareApp} />
//   </Stack.Navigator>

// );

//WalletStack

const Wallet = createStackNavigator();

const WalletNavigator = () => (
  <Wallet.Navigator headerMode="none">
    <Wallet.Screen name="PoolWallet" component={PortfolioScreen} />
  </Wallet.Navigator>
);

//FinancialAssetsStack

const FinancialAssets = createStackNavigator();

const FinancialAssetsNavigator = () => (
  <FinancialAssets.Navigator headerMode="none">
    <FinancialAssets.Screen
      name="FinancialAssetDetail"
      component={FinancialAssetDetailScreen}
    />
  </FinancialAssets.Navigator>
);
const InvestorProfile = createStackNavigator();

const InvestorProfileNavigator = () => (
  <InvestorProfile.Navigator headerMode="none">
    <InvestorProfile.Screen
      name="AchievementDetail"
      component={AchievementDetailScreen}
    />
  </InvestorProfile.Navigator>
);

// Survey Stack
const Survey = createStackNavigator();
const SurveyNavigator = () => (
  <Survey.Navigator headerMode="none">
    <Survey.Screen name="Task" component={TaskAnsweringScreen} />
    <Survey.Screen name="TaskFinished" component={TaskFinishedScreen} />
  </Survey.Navigator>
);

// Navegador da retirada
const Withdraw = createStackNavigator();
const WithdrawNavigator = () => (
  <Withdraw.Navigator headerMode="none">
    <Withdraw.Screen name="Linkedaccounts" component={LinkedAccountsScreen} />
    <Withdraw.Screen name="Requestwithdraw" component={RequestWithDrawScreen} />
    <Withdraw.Screen name="Addaccount" component={AddAccountScreen} />
    <Withdraw.Screen
      name="Confirmwithdraw"
      options={{gestureEnabled: false}}
      component={ConfirmWithdrawScreen}
    />
  </Withdraw.Navigator>
);

//Navegador da parte de Configurações
const SettingsStack = createStackNavigator();
const SettingsNavigator = () => (
  <SettingsStack.Navigator headerMode="none">
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
    />
  </SettingsStack.Navigator>
);

//Navegador do Perfil
const ProfileStack = createStackNavigator();
const ProfileNavigator = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen
      name="VefifiedStatus"
      component={VerifiedAccountScreen}
    />
    <ProfileStack.Screen name="Detail" component={EditProfileScreen} />
    <ProfileStack.Screen name="ValidatePhone" component={ValidatePhoneScreen} />
    <ProfileStack.Screen name="ValidateEmail" component={ValidateEmailScreen} />
    <ProfileStack.Screen
      name="VerifyIdentity"
      component={VerifyIdentityScreen}
    />
    <ProfileStack.Screen
      name="UploadDocument"
      component={UploadDocumentScreen}
    />
    <ProfileStack.Screen name="Settings" component={SettingsNavigator} />
    <ProfileStack.Screen name="Pin" component={CreatePinScreen} />
    <ProfileStack.Screen
      name="AssociedAccounts"
      component={LinkedAccountsScreen}
    />
    <ProfileStack.Screen name="ShareApp" component={ShareApp} />
    <ProfileStack.Screen name="PromoCode" component={PromoCodeScreen} />
    <ProfileStack.Screen name="Legal" component={LegalNavigator} />
    <ProfileStack.Screen name="Suport" component={SupportNavigator} />
  </ProfileStack.Navigator>
);

const SupportStack = createStackNavigator();
const SupportNavigator = () => (
  <SupportStack.Navigator headerMode="none">
    <SupportStack.Screen name="FAQ" component={FaqScreen} />
    <SupportStack.Screen name="Help" component={HelpScreen} />
  </SupportStack.Navigator>
);

//Navegador da parte de informações legais
const LegalStack = createStackNavigator();
const LegalNavigator = () => (
  <LegalStack.Navigator headerMode="none">
    <LegalStack.Screen name="Legal" component={LegalScreen} />
    <LegalStack.Screen name="Terms" component={TermsScreen} />
    <LegalStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <LegalStack.Screen name="MyData" component={MyDataScreen} />
  </LegalStack.Navigator>
);
