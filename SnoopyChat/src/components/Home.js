import React from 'react';
import { View, Text } from 'react-native';
import { Button } from "./Button";

export default function Home({onPressLogin,onPressRegister}) {
  return (
    <View style={styles.buttonContainer}>
      <Button label="Inscription" buttonStyle={styles.buttonInscription} onPress={onPressRegister} />
      <Button label="Connexion" buttonStyle={styles.buttonConnexion} onPress={onPressLogin} />
    </View>
  );
};
