import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import 'expo-dev-client'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import Colors from '../constants/Colors'

export default function Perfil () {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  GoogleSignin.configure({
    webClientId: '629279692498-qmb79vh73rpghk3vlo6tvgq5pa5bde7o.apps.googleusercontent.com'
  })

  function onAuthStateChanged (user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const onGoogleButtonPress= async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential)
    user_sign_in.then((user) => {
      console.log(user)
      console.log(auth().currentUser)
    }).catch((error) => {
      console.log(error)
    })
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }

  if (initializing) return null
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLogin}>Por favor inicie sesión</Text>
        <GoogleSigninButton
          style={styles.button}
          onPress={onGoogleButtonPress}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageLogin}
        source={{ uri: user.photoURL }}
      />
      <Text style={styles.textLogin}>{user.displayName}</Text>
      <Text style={styles.textLogin}>{user.email}</Text>
      <View style={styles.btnLogout}>
        <Button color={Colors.primary} title='LogOut' onPress={signOut} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 300,
    height: 65,
    marginTop: 300
  },
  textLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.text
  },
  imageLogin: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: Colors.text,
    borderWidth: 2,
    marginBottom: 20
  },
  btnLogout: {
    width: 100,
    marginTop: 30,
    backgroundColor: Colors.primary
  }
})
