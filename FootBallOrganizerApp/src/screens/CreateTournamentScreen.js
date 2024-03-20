import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles'; 

import { TournamentContext } from '../../App';

export default function CreateTournamentScreen({ navigation }) {
  const { addTournament } = useContext(TournamentContext);
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentType, setTournamentType] = useState("Qualifiers");

  const handleCreateTournament = () => {
    if (tournamentName.trim() === "") {
      Alert.alert("Error", "Please, insert a name for tournament.");
    } else {
      const newTournament = { name: tournamentName, type: tournamentType };
      addTournament(newTournament);
      Alert.alert("Sucess", "Tournament Created!");

      navigation.navigate('AddTeams')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournament Name:</Text>
      <TextInput
        style={styles.input}
        value={tournamentName}
        onChangeText={setTournamentName}
      />
      <Text style={styles.title}>Tipo de Torneio:</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={tournamentType}
          onValueChange={(itemValue, itemIndex) => setTournamentType(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Qualifiers" value="Qualifiers" />
          <Picker.Item label="Round Robin" value="RoundRobin" />
          <Picker.Item label="Qualifiers + Round Robin" value="QualifiersRoundRobin" />
        </Picker>
      </View>
      {tournamentType && (
        <Image
          source={getImageForTournamentType(tournamentType)}
          style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }} 
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Create" onPress={handleCreateTournament} color="#1E90FF" />
      </View>
    </View>
  );
}

const getImageForTournamentType = (type) => {
  switch (type) {
    case 'Qualifiers':
      return require('../img/Qualifiers.png');
    case 'RoundRobin':
      return require('../img/RoundRobin.png'); 
    case 'QualifiersRoundRobin':
      return require('../img/TogetherRoundRobinQualifiers.png'); 
    default:
      return {};
  }
};
