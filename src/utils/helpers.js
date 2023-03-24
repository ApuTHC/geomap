// // import { ImagePicker } from 'expo-image-picker'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'

export const getCurrentLocation = async () => {
  const response = { status: false, location: null }
  const resultPermissions = await Location.requestForegroundPermissionsAsync()
  if (resultPermissions.status === 'denied') {
    Alert.alert('Se debe asignar los permisos de localización para asignar las coordenadas en las estaciones y localizarse en el mapa.')
    return response
  }
  const position = await Location.getCurrentPositionAsync({})
  const location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  }
  response.status = true
  response.location = location
  return response
}

export const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(e)
    return false
  }
}
