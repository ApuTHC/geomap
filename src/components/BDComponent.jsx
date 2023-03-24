import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Button, Animated, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'
import database from '@react-native-firebase/database'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'

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

class BDComponents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      texto: 'Cargando',
      fileName: props.fileName,
      names: props.name,
      DBref: props.DBref,
      ciclo: false,
      estiloStatu: 'textName'
    }
    this.existArchivo = this.existArchivo.bind(this)
    this.DownloadDB = this.DownloadDB.bind(this)
  }

  DownloadDB (BDref, fileName) {
    console.log(BDref, fileName)
    const directorio = FileSystem.documentDirectory + fileName
    database()
      .ref(BDref)
      .once('value')
      .then(snapshot => {
        (async () => {
          try {
            await FileSystem.writeAsStringAsync(directorio, JSON.stringify(snapshot.val()))
            console.log('Archivo guardado correctamente.')
          } catch (error) {
            console.error(error)
          }
        })()
        // console.log('Data: ', snapshot.val())
        console.log('Descargó')
      })
  }

  existArchivo (fileName) {
    (async () => {
      try {
        await FileSystem.readAsStringAsync(fileName)
        // console.log('Contenido del archivo:', JSON.parse(contenidoArchivo))
        this.setState({ texto: 'Guardada', estiloStatu: 'textStatusTrue' })
      } catch (error) {
        console.error(error)
        this.setState({ texto: 'Sin Guardar', estiloStatu: 'textStatusFalse' })
      }
    })()
  }

  render () {
    if (!this.state.ciclo) {
      this.existArchivo(FileSystem.documentDirectory + this.state.fileName)
      this.setState({ ciclo: true })
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textName}>{this.state.names}</Text>
        <Text style={styles[this.state.estiloStatu]}>{this.state.texto}</Text>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            onPress={() => this.DownloadDB(this.state.DBref, this.state.fileName)}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.tabItemContainer}
          >
            <View style={styles.actionsButton}>
              <Ionicons name='cloud-download' size={20} color='white' />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

export default BDComponents

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: Colors.white,
    borderRightColor: Colors.white,
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 3
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text
  },
  textStatusTrue: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 18
  },
  textStatusFalse: {
    color: Colors.positiveRed,
    fontWeight: 'bold',
    fontSize: 18
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
