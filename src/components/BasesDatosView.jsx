import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BDComponent from './BDComponent'
import Bases from '../data/basesDatos'

export default function BasesDatosView () {
  const basesDatos = Bases.map((base) => <BDComponent key={base.id} name={base.name} DBref={base.ref} fileName={base.fileName} />)
  return (
    <View style={styles.container}>
      {basesDatos}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})
