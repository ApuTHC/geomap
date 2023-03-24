import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const DEFAULT_COORDINATE = {
  lat: 37.78825,
  lng: -122.4324
}
const DEFAULT_COORDINATE1 = {
  lat: 37.789,
  lng: -122.433
}

const RepositoryItem = (e) => (
  // console.log(e);
  e.event === 'onMapMarkerClicked' ? Alert.alert('pulso el marcadorcon id: ' + e.payload.mapMarkerID) : 1 + 1
)

export default function Mapa () {
  return (
    <View style={styles.container}>
      {/* <Text>Mapa</Text>
      <Text>{auth().currentUser.displayName}</Text>
      <StatusBar style='auto' /> */}
      <LeafletView
        mapMarkers={[
          {
            id: 1,
            position: DEFAULT_COORDINATE,
            icon: '📍',
            size: [32, 32]
          },
          {
            id: 2,
            position: DEFAULT_COORDINATE1,
            icon: '📍',
            size: [32, 32]
          }
        ]}
        onMessageReceived={RepositoryItem}
        mapCenterPosition={DEFAULT_COORDINATE}
      />

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
