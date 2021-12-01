//Importações Externas
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
 
export const onGoogleButtonPress = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
