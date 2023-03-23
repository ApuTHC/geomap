import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'



export default function Mapa () {
  return (
    <View style={styles.container}>
      <Text>Mapa</Text>
      <Text>{auth().currentUser.displayName}</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
