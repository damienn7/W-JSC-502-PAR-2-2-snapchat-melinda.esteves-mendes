import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import Logo from './components/Logo';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

// Importez votre source d'image ici
const Images = require('./assets/snapchat.png');

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Utilisez la variable Images dans placeholderImageSource */}
        <Logo placeholderImageSource={Images} />
      </View>
      <Text style={styles.text}>Bonjour jeune Papillon !{'\n'}Rejoins l'essaim dès maintenant</Text>
      <View style={styles.buttonContainer}>
        <Button
          label="Inscription"
          onPress={handleSignUpClick}
          buttonStyle={styles.buttonInscription}
        />
        <Button
          label="Connexion"
          onPress={handleSignInClick}
          buttonStyle={styles.buttonConnexion}
        />
      </View>
      {showSignIn && <SignInScreen />}
      {showSignUp && <SignUpScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 50,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonInscription: {
    backgroundColor: '#DA012D',
    marginBottom: 5,
  },
  buttonConnexion: {
    backgroundColor: '#007FFF',
  },
});
