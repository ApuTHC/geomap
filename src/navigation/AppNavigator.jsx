import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mapa from '../screens/Mapa'
import Perfil from '../screens/Perfil'
import BasesDatos from '../screens/BasesDatos'
import RegistroEstaciones from '../screens/RegistroEstaciones'
import EstacionesGuardadas from '../screens/EstacionesGuardadas'
import TabBar from '../components/TabBar'
import Colors from '../constants/Colors'

const TabBarNavigator = createBottomTabNavigator()

const screenOptions = {
  headerTitleStyle: {
    color: Colors.white
  },
  headerStyle: {
    backgroundColor: Colors.primary
  }
}

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator initialRouteName='Registro' screenOptions={screenOptions} tabBar={(props) => <TabBar {...props} />}>
      <TabBarNavigator.Screen name='Mapa' options={{ title: 'GeoVisor' }} component={Mapa} />
      <TabBarNavigator.Screen name='Base Datos' options={{ title: 'Bases de Datos' }} component={BasesDatos} />
      <TabBarNavigator.Screen name='Registro' options={{ title: 'Registro de Estaciones' }} component={RegistroEstaciones} />
      <TabBarNavigator.Screen name='Guardadas' options={{ title: 'Estaciones Guardadas' }} component={EstacionesGuardadas} />
      <TabBarNavigator.Screen name='Perfil' options={{ title: 'Perfil de Usuario' }} component={Perfil} />
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
