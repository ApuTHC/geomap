import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mapa from '../screens/Mapa'
import Perfil from '../screens/Perfil'
import BasesDatos from '../screens/BasesDatos'
import RegistroEstaciones from '../screens/RegistroEstaciones'
import EstacionesGuardadas from '../screens/EstacionesGuardadas'
import TabBar from '../components/TabBar'

const TabBarNavigator = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={(props) => <TabBar {...props} />}>
      <TabBarNavigator.Screen name='Mapa' component={Mapa} />
      <TabBarNavigator.Screen name='Base Datos' component={BasesDatos} />
      <TabBarNavigator.Screen name='Registro' component={RegistroEstaciones} />
      <TabBarNavigator.Screen name='Guardadas' component={EstacionesGuardadas} />
      <TabBarNavigator.Screen name='Perfil' component={Perfil} />
    </TabBarNavigator.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
