//Importações Externas
import { Platform } from 'react-native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { GoogleSignin, GoogleSigninButton, statusCodes,} from '@react-native-community/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';

//Importações Internas
import { loginApi } from '../../../api/login';
import { registerApi } from '../../../api/signup';
import { setUser, setUserPhoto} from '../../../store/actions/user';
import { loginStart, loginFailure, signUpFailure, loginSuccess, } from '../../../store/actions/auth';
import { emailConfirmation } from '../../../api/emailConfirmation';

const GoogleIcon = (props) => (
  <Icon {...props} name='google'/>
);

const FacebookIcon = (props) => (
  <Icon {...props} name='facebook'/>
);

export const SocialAuth = props => {
  
  useEffect(() => {
    //PROD
    GoogleSignin.configure({
      webClientId: '522049972574-5ihc6of012bi4330eqhrtl6552irea2t.apps.googleusercontent.com',
    });

    // //DEV
    // GoogleSignin.configure({
    //   webClientId: '940937104065-nos2p4h9o37hqq7l22m31r6ehsv1doj9.apps.googleusercontent.com',
    // });
}, []);
 

async function onFacebookButtonPress() {
  dispatch(loginStart('Facebook'))
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    dispatch(loginFailure(result))
    throw 'User cancelled the login process';
  } 

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    dispatch(loginFailure('Something went wrong obtaining access token'))
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential).then(result =>{
    var user = result.user; 
    registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
      // auth().currentUser.sendEmailVerification()
      try{
        // auth().currentUser.sendEmailVerification()
        await emailConfirmation() 
      }catch(error){
        console.log('Login api error: ' + error.message)
      }
      try{
        const response = await loginApi()
        const userAPI = response.data.user_data;
        console.log('USER ' + JSON.stringify(userAPI))
        dispatch(loginSuccess())
        dispatch(setUser(userAPI))
        dispatch(setUserPhoto(auth().currentUser.photoURL))
      }catch ( error ) {
        console.log('Login api error: ' + error.message)
        dispatch(loginFailure(error.message))
      }
    }).catch( async error => {
      if ( error == 'Error: Request failed with status code 400'){
        try{
          const response = await loginApi()
          var userAPI = response.data.user_data;
          dispatch(loginSuccess())
          dispatch(setUser(userAPI))
          dispatch(setUserPhoto(user.photoURL))
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
        }
      }else{
        console.log("Tente novamente " + error);
        dispatch(signUpFailure(error))
      }
    });







  });
}


  const onPressFacebook = () => {
    dispatch(loginStart('Facebook'))
    LoginManager.logOut()
    LoginManager.logInWithPermissions([
      "public_profile",
      "email"
      ]).then(
        result => {
          if (result.isCancelled) {
            console.log("Login cancelado pelo usuário");
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const credential =  auth.FacebookAuthProvider.credential(
                data.accessToken
              );
              auth()
                .signInWithCredential(credential)
                .then(result => {
                  var user = result.user;
                  console.log('USER ==>' + user)
                  registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
                    loginApi().then( response => {
                      dispatch(loginSuccess())
                      dispatch(setUser(response))
                      dispatch(setUserPhoto(user.photoURL))
                    })
                  })
                })
                .catch(error => {
                  console.log("Tente novamente " + error);
                  dispatch(loginFailure(error))
                });
            });
          }
        },
        error => {
          console.log("Erro ao logar com facebook " + error);
          dispatch(loginFailure(error))
        });
  };
 

 const onAppleButtonPress = async() => {

  dispatch(loginStart('Apple'))

  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  await auth().signInWithCredential(appleCredential).then(result => {
    var user = result.user;
    registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
      try{
        // auth().currentUser.sendEmailVerification()
        await emailConfirmation() 
      }catch(error){
        console.log('Login api error: ' + error.message)
      }
      try{
        const response = await loginApi()
        var userAPI = response.data.user_data;
        dispatch(loginSuccess())
        //dispatch(setUser(userAPI))
        //dispatch(setUserPhoto(user.photoURL))
      }catch ( error ) {
        console.log('Login api error: ' + error.message)
        dispatch(loginFailure(error.message))
      }
    }).catch( async error => {
      if ( error == 'Error: Request failed with status code 400'){
        try{
          const response = await loginApi()
          var userAPI = response.data.user_data;
          dispatch(loginSuccess())
          dispatch(setUser(userAPI))
          dispatch(setUserPhoto(user.photoURL))
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
        }
      }else{
        console.log("Tente novamente " + error);
        dispatch(signUpFailure(error))
      }
    });
  }).catch(error => {
    dispatch(loginFailure(error.message))
  })
}

  const onGoogleButtonPress = async () => {

    dispatch(loginStart('Google'))
 
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
       

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential).then(result => {

        var user = result.user;
      registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
        try{
          // auth().currentUser.sendEmailVerification()
          await emailConfirmation() 
        }catch(error){
          console.log('Login api error: ' + error.message)
        }
        try{
          const response = await loginApi()
          var userAPI = response.data.user_data;
          dispatch(loginSuccess())
          //dispatch(setUser(userAPI))
          //dispatch(setUserPhoto(user.photoURL))
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
        }
      }).catch( async error => {
        if ( error == 'Error: Request failed with status code 400'){
          try{
            const response = await loginApi()
            var userAPI = response.data.user_data;
            dispatch(loginSuccess())
            dispatch(setUser(userAPI))
            dispatch(setUserPhoto(user.photoURL))
          }catch ( error ) {
            console.log('Login api error: ' + error.message)
            dispatch(loginFailure(error.message))
          }
        }else{
          console.log("Tente novamente " + error);
          dispatch(signUpFailure(error))
        }
      });

      });
    } catch (error) {
      dispatch(loginFailure(error.message))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow

        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }


    // Get the users ID token
    //const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    //const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  {/**
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then( result =>{
      var user = result.user;
      registerApi(user.email, user.displayName, user.uid, authState.referedBy).then( async () => {
        auth().currentUser.sendEmailVerification()
        try{
          const response = await loginApi()
          var userAPI = response.data.user_data;
          dispatch(loginSuccess())
          dispatch(setUser(userAPI))
          dispatch(setUserPhoto(user.photoURL))
        }catch ( error ) {
          console.log('Login api error: ' + error.message)
          dispatch(loginFailure(error.message))
        }
      }).catch( async error => {
        if ( error == 'Error: Request failed with status code 400'){
          try{
            const response = await loginApi()
            var userAPI = response.data.user_data;
            dispatch(loginSuccess())
            dispatch(setUser(userAPI))
            dispatch(setUserPhoto(user.photoURL))
          }catch ( error ) {
            console.log('Login api error: ' + error.message)
            dispatch(loginFailure(error.message))
          }
        }else{
          console.log("Tente novamente " + error);
          dispatch(signUpFailure(error))
        }
      });
    }).catch(error => {
      console.log("Tente novamente " + error);
      dispatch(loginFailure(error))
    });

 */}

  }
   
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  
  return (
    <View style = {styles.container}>
      <View style = {{backgroundColor: 'transparent', marginTop: 48}}>
        <Text status = 'primary' category = 'p1'>ou entre com</Text>
      </View>
      <View style = {{paddingTop: 32, flexDirection: 'column', width: '100%', alignItems: 'center'}}>
        {/* <Button style={{backgroundColor: '#3b5998', borderColor: '#3b5998', marginLeft: 4, marginRight: 4}} status='info' accessoryLeft={FacebookIcon} onPress = {() => onFacebookButtonPress()}>
          Facebook
        </Button>  */}
        <GoogleSigninButton
          style={{marginTop: 16}}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => onGoogleButtonPress()}/>
          { Platform.OS == 'ios' &&
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
              style={{
                marginTop: 24,
                width: 192,
                height: 45,
              }}/>
          }
        
      </View>
    </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
