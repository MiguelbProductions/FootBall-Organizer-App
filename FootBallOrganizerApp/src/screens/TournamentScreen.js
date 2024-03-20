import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { TournamentContext } from '../../App'; 

const TournamentScreen = ({ route, navigation }) => {
  const { matchups } = route.params;
  const { selectedTournament } = useContext(TournamentContext);
  const [rounds, setRounds] = useState([matchups]);
  const [currentRound, setCurrentRound] = useState(0); 

  useEffect(() => {

    const initializedGames = matchups.map(matchup => ({
      ...matchup,
      team1Goals: '',
      team2Goals: '',
      completed: false,
    }));
    setRounds([initializedGames]);
  }, []);

  const updateGameResult = (index, team1Goals, team2Goals) => {
    const updatedRounds = [...rounds];
    updatedRounds[currentRound][index] = {
      ...updatedRounds[currentRound][index],
      team1Goals,
      team2Goals,
      completed: true,
    };
    setRounds(updatedRounds);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.gameItem}>
      <Text style={styles.listText}>{item.team1} vs {item.team2}</Text>
      <TextInput
        style={styles.input}
        placeholder="Gols - Equipe 1"
        keyboardType="numeric"
        onChangeText={(text) => updateGameResult(index, text, item.team2Goals)}
        value={item.team1Goals}
      />
      <TextInput
        style={styles.input}
        placeholder="Gols - Equipe 2"
        keyboardType="numeric"
        onChangeText={(text) => updateGameResult(index, item.team1Goals, text)}
        value={item.team2Goals}
      />
      {item.completed && <Text>Resultado Registrado</Text>}
    </View>
  );

  const processNextRound = () => {
    const completedGames = rounds[currentRound];
    const empates = [];
    const vencedoresTemporarios = rounds.length > currentRound + 1 ? rounds[currentRound + 1].map(game => game.team1) : []; // Vencedores de empates anteriores, se houver
    
    // Separa jogos empatados dos jogos com vencedores
    completedGames.forEach(game => {
      if (game.team1Goals === game.team2Goals) {
        empates.push({ ...game, completed: false, team1Goals: '', team2Goals: '' });
      } else {
        vencedoresTemporarios.push(game.team1Goals > game.team2Goals ? game.team1 : game.team2);
      }
    });
  
    // Se houver empates, prepara uma nova rodada apenas com os empates
    if (empates.length > 0) {
      setRounds([...rounds.slice(0, currentRound + 1), empates, vencedoresTemporarios.map(name => ({team1: name, team1Goals: '', team2Goals: '', completed: false}))]); // Inclui rodada de desempate e mantém vencedores para a próxima rodada
      setCurrentRound(currentRound + 1);
      return;
    }
  
    // Aqui, todos os jogos da rodada atual foram decididos (incluindo desempates)
    const nextRoundMatchups = [];
    // Utiliza 'vencedoresTemporarios' que já inclui vencedores de jogos não empatados e possíveis vencedores de desempates
    for (let i = 0; i < vencedoresTemporarios.length; i += 2) {
      if (vencedoresTemporarios[i + 1]) { // Se existe um próximo competidor para o matchup
        nextRoundMatchups.push({
          team1: vencedoresTemporarios[i],
          team2: vencedoresTemporarios[i + 1],
          team1Goals: '',
          team2Goals: '',
          completed: false,
        });
      }
    }
  
    if (nextRoundMatchups.length === 1 && !nextRoundMatchups[0].team2) {
      // Declara o campeão se só restar um vencedor
      Alert.alert("Campeão", `O campeão do torneio é ${nextRoundMatchups[0].team1}!`);
      return;
    }
  
    // Prepara para a próxima rodada com todos os vencedores
    setRounds([...rounds.slice(0, currentRound + 1), nextRoundMatchups]); // Remove rodadas de desempate anteriores, se houver
    setCurrentRound(currentRound + rounds.slice(currentRound + 1).length); // Ajusta a rodada atual considerando as rodadas de desempate
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rodada Atual: {currentRound + 1}</Text>
      <FlatList
        data={rounds[currentRound]}
        keyExtractor={(item, index) => `match-${index}`}
        renderItem={renderItem}
      />
      <Button title="Processar Próxima Rodada" onPress={processNextRound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gameItem: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TournamentScreen;
