import React, { useState, useEffect } from 'react';
import { View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Step2Screen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [duration, setDuration] = useState(5); // Durée d'affichage par défaut (en secondes)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://mysnapchat.epidoc.eu/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelection = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie pour sélectionner une image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecipientSelection = (recipient) => {
    setSelectedRecipient(recipient);
  };

  const handleSendSnap = async () => {
    if (!selectedImage || !selectedRecipient) {
      Alert.alert('Erreur', 'Veuillez sélectionner une image et un destinataire.');
      return;
    }

    try {
      // Envoyer l'image à l'API
      const imageFormData = new FormData();
      imageFormData.append('image', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'snap.jpg',
      });
      const imageResponse = await axios.post('https://mysnapchat.epidoc.eu/api/images', imageFormData);

      // Envoyer le snap à l'API
      const snapData = {
        recipient: selectedRecipient,
        duration: duration,
        imageId: imageResponse.data.id,
      };
      await axios.post('https://mysnapchat.epidoc.eu/api/snaps', snapData);

      // Réinitialiser les valeurs
      setSelectedImage(null);
      setSelectedRecipient(null);
      setDuration(5);

      Alert.alert('Snap envoyé', 'Votre snap a été envoyé avec succès !');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi du snap. Veuillez réessayer.');
    }
  };

  return (
    <View>
      <Button title="Sélectionner une image" onPress={handleImageSelection} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      
      <View>
        {users.map(user => (
          <TouchableOpacity key={user.id} onPress={() => handleRecipientSelection(user.id)}>
            <Text>{user.username}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text>Sélectionnez la durée d'affichage (en secondes) :</Text>
      <TextInput
        value={duration.toString()}
        onChangeText={text => setDuration(parseInt(text))}
        keyboardType="numeric"
      />
      
      <Button title="Envoyer le snap" onPress={handleSendSnap} />
    </View>
  );
};

export default Step2Screen;
