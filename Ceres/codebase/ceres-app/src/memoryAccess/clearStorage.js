import { AsyncStorage } from "react-native";

export const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      console.log('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }