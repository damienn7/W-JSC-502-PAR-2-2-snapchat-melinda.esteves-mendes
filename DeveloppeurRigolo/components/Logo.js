import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

export default function Logo() {
  return (
    <View style={styles.img}>
      <Image source={require('../assets/snapchat.png')}
      style={{ width: 400, height: 400 }} />
    </View>
  )
}

const styles = StyleSheet.create({
    img: {
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'rotate(180deg)',
    }
})