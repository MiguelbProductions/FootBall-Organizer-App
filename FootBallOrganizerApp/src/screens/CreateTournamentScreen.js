import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../styles/styles';

export default function CreateTournamentScreen({ navigation }) {
  const [tournamentName, setTournamentName] = useState('');

  return (
    <View style={styles.container}>
      <Text>Tournament Name:</Text>
      <TextInput value={tournamentName} onChangeText={setTournamentName} />
      <Button title="Next: Add Teams" onPress={() => navigation.navigate('AddTeams', { tournamentName })} />
    </View>
  );
}
