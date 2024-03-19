import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/styles';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.containerAligned} >
        <Button title="Create Tournament" onPress={() => navigation.navigate('CreateTournament')} />
      </View>
    );
  }
  