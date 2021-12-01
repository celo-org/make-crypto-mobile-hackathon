
//Importações Externas
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
 
//Imporatações Internas
import { loginApi } from '../../../api/login'
import { registerApi } from '../../../api/signup'

export const onPressFacebook = ( ) => {
  var userData = null
  LoginManager.logInWithPermissions([
    "public_profile",
    "email"
    ]).then(
      result => {
        if (result.isCancelled) {
          console.log("Login cancelado pelo usuário");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            auth()
              .signInWithCredential(credential)
              .then(result => {
                var user = result.user;
                // console.log('USUARIO + ============ > ' + JSON.stringify(user))    
                registerApi(user.email, user.displayName, user.uid, null).then( async () => {
                  loginApi().then( response => {
                    userData = response;
                    return userData;
                  })
                })
              })
              .catch(error => {
                console.log("Tente novamente " + error);
              });
          });
        }
      },
      error => {
        console.log("Erro ao logar com facebook " + error);
      }
    );
    // return userData
};