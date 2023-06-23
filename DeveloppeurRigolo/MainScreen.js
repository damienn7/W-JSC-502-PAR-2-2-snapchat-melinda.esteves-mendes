import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
import Logo from './components/Logo';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();

  const handleSignInClick = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUpClick = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: randomElement,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 50,
    textAlign: 'center',
    fontSize: 18,
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

export default MainScreen;
