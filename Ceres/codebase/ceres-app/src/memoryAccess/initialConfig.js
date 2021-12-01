import { AsyncStorage } from "react-native";

export async function initialConfig( ){
    try {
        await AsyncStorage.setItem('@darkMode', 'false');
        await AsyncStorage.setItem('@checkedApp', 'true');
        await AsyncStorage.setItem('@checkedEmail', 'true');
   
    } catch (error) {
        console.log(error.message);
        console.log('error saving data ')
    }
}