import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Friends({ friend, onClick }) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <Text>{friend}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
