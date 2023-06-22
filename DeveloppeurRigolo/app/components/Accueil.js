import React from 'react';
import { View, Text, Button } from 'react-native';

const Accueil = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'application</Text>
      <Button title="Inscription" onPress={() => console.log('Bouton Inscription pressé')} />
      <Button title="Connexion" onPress={() => console.log('Bouton Connexion pressé')} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
};

export default Accueil;
