import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getCurrentLocation } from '../utils/helpers'

export default function RegistroEstacionesView () {
  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation()
      if (response.status) {
        console.log(response.location)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Registro Estaciones</Text>
      <Text>Inicie Sesión</Text>
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
