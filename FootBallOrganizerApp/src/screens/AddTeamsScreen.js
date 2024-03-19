import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';
import styles from '../styles/styles';

const generateMatchups = (teams) => {
    let shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    let matchups = [];

    while (shuffledTeams.length > 1) {
        let team1 = shuffledTeams.pop();
        let team2 = shuffledTeams.pop();
        matchups.push({ team1: team1.name, team2: team2.name });
    }

    return matchups;
};
  
export default function AddTeamsScreen({ navigation }) {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);

  const addTeam = () => {
    setTeams(currentTeams => [...currentTeams, { id: Math.random().toString(), name: teamName }]);
    setTeamName('');
  };

  const finishTournamentCreation = () => {
    if (teams.length < 2) {
      Alert.alert("Erro", "Você precisa adicionar pelo menos duas equipes para criar um torneio.");
      return;
    }

    const generatedMatchups = generateMatchups(teams);
    navigation.navigate('Tournament', { matchups: generatedMatchups });
    Alert.alert("Torneio Criado", "O torneio foi criado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Equipe"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />
      <Button
        title="Adicionar Equipe"
        onPress={addTeam}
      />
      <FlatList
        data={teams}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
      />
      {matchups.length > 0 && (
        <View>
          <Text style={styles.title}>Emparelhamentos:</Text>
          <FlatList
            data={matchups}
            keyExtractor={item => item.team1 + item.team2}
            renderItem={({ item }) => <Text style={styles.listItem}>{item.team1} vs {item.team2}</Text>}
          />
        </View>
      )}
      <Button
        title="Finalizar Criação do Torneio"
        onPress={finishTournamentCreation}
      />
    </View>
  );
}