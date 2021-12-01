import { AsyncStorage } from "react-native";

export async function saveData(KEY, DATA){
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(DATA)).then(() => {
            console.log(KEY+':'+ DATA + ' was saved successfully')
        });
    } catch (error) {
        console.log(error.message);
        console.log('error saving data '+ KEY)
    }
}