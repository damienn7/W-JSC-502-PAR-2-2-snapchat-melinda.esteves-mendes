// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image } from 'react-native';

// import Button from './app/components/Button';
// import Logo from './app/components/Logo';

// const Images = require('./assets/snapchat.png');

// const array = ['#FFD700', '#FFEE75', '#b0f2b6', '#8F00FF' ];
// const randomElement = array[Math.floor(Math.random() * array.length)];

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <Logo placeholderImageSource={Images} />
//       </View>
//       <Text style={styles.text}>Bonjour jeune Papillon ! {'\n'}Rejoins l'essaim dès maintenant</Text>
//       <View style={styles.buttonContainer}>
//         <Button
//           label="Inscription"
//           onPress={() => console.log('Bouton Inscription pressé')}
//           buttonStyle={styles.buttonInscription}
//         />
//         <Button
//           label="Connexion"
//           onPress={() => console.log('Bouton Connexion pressé')}
//           buttonStyle={styles.buttonConnexion}
//         />
//       </View>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: randomElement,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 150,
//   },
//   text: {
//     color: 'black',
//     fontWeight: 'bold',
//     paddingBottom: 50,
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 30,
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
//   buttonInscription: {
//     backgroundColor: '#DA012D', 
//     marginBottom: 5,
//   },
//   buttonConnexion: {
//     backgroundColor: '#007FFF',
//   },
// });

import React from "react";
import CameraScreen from "./app/screens/CameraScreen";

const App = () => {
  return(
    <CameraScreen />
  )
}

export default App;