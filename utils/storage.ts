import AsyncStorage from "@react-native-community/async-storage";

export class DeviceStorage {
  static saveData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(error);
    }
  };

  static getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      throw new Error(error);
    }
  };

  static removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
}
