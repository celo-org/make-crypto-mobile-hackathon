import { AsyncStorage } from "react-native";

export const getData = async(KEY) =>{
  let DATA = null;
  try {
    DATA = await AsyncStorage.getItem(KEY) || null;
  } catch (error) {
    console.log(error.message);
  }
  return DATA != null ? JSON.parse(DATA) : null
}
  