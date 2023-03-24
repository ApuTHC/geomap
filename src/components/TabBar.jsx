import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const TabBar = ({ state, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {
        state.routes.map((route, index) => {
          const focused = state.index === index
          const isRegister = route.name === 'Registro'
          const itemColor = focused ? Colors.primary : Colors.secondary
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
            if (isRegister) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
          }
          let iconName
          switch (route.name) {
            case 'Perfil':
              iconName = 'person'
              break
            case 'Base Datos':
              iconName = 'cloud-download'
              break
            case 'Guardadas':
              iconName = 'save'
              break
            default:
              iconName = 'map'
              break
          }
          const animatedValue = new Animated.Value(1)
          const onPressIn = () => {
            Animated.spring(animatedValue, {
              toValue: 0.9,
              useNativeDriver: true
            }).start()
          }
          const onPressOut = () => {
            Animated.spring(animatedValue, {
              toValue: 1,
              useNativeDriver: true
            }).start()
          }
          const animatedStyle = {
            transform: [{ scale: animatedValue }]
          }
          return (
            <Animated.View
              key={route.name}
              style={[styles.tabItem, animatedStyle, isRegister ? { marginTop: 7 } : { marginTop: 15 }]}
            >
              <TouchableOpacity
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.tabItemContainer}
              >
                {
                  isRegister
                    ? (
                      <View style={{ alignItems: 'center' }}>
                        <View style={styles.actionsButton}>
                          <Ionicons style={{ marginStart: 4 }} name='create' size={20} color='white' />
                        </View>
                        <Text style={[{ color: itemColor, marginTop: 3 }, styles.tabBarText]}>{route.name}</Text>
                      </View>
                      )
                    : (
                      <View style={{ alignItems: 'center' }}>
                        <Ionicons name={iconName} size={20} color={itemColor} style={{ marginBottom: 2 }} />
                        <Text style={[{ color: itemColor }, styles.tabBarText]}>{route.name}</Text>
                      </View>
                      )
                }
              </TouchableOpacity>
            </Animated.View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 85,
    borderColor: 'white',
    borderTopColor: Colors.border,
    borderWidth: 1,
    justifyContent: 'space-between'
  },
  tabItem: {
    width: 60
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '700'
  },
  actionsButton: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignSelf: 'center'
  }
})

export default TabBar
