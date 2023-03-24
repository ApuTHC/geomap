import React from 'react'
import 'expo-dev-client'
import AppNavigator from './src/navigation/AppNavigator'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  return (
    <>
      <StatusBar style='light' />
      <AppNavigator />
    </>
  )
}
