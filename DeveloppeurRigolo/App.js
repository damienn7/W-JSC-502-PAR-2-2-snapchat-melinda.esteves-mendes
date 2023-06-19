import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';

const Images = require('./assets/papillon.jpg');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={Images}/>
      </View>
      <Text style={styles.text}>Bonjour jeune Papillon !</Text>
      <Text style={styles.text}>Allons chasser des papillons ensemble</Text>
      <View style={styles.footerContainer}>
        <Button label="Appuie"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 200,
  },
  text: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 48,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
