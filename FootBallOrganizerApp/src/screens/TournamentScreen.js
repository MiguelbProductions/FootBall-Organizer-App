import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import styles from '../styles/styles';

const TournamentScreen = ({ route, navigation }) => {
  const { matchups } = route.params;
  const [rounds, setRounds] = useState([matchups]);
  const [currentRound, setCurrentRound] = useState(0); 

  useEffect(() => {
    const initializedGames = rounds[currentRound].map(matchup => ({
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

  const processNextRound = () => {
    const winners = rounds[currentRound].map(game => {
      return game.team1Goals > game.team2Goals ? game.team1 : game.team2;
    });

    let nextRoundMatchups = [];
    for (let i = 0; i < winners.length; i += 2) {
      nextRoundMatchups.push({
        team1: winners[i],
        team2: winners[i + 1] ? winners[i + 1] : "Nobody",
        team1Goals: '',
        team2Goals: '',
        completed: false,
      });
    }

    if (nextRoundMatchups.length > 1) {
      setRounds([...rounds, nextRoundMatchups]);
      setCurrentRound(currentRound + 1);
    } else {
      Alert.alert("Campeão", `O campeão do torneio é ${nextRoundMatchups[0].team1}!`);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rounds[currentRound]}
        keyExtractor={item => item.team1 + item.team2}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.team1} vs {item.team2}</Text>
            <TextInput
              style={styles.input}
              placeholder="Gols - Equipe 1"
              keyboardType="numeric"
              onChangeText={text => updateGameResult(index, text, item.team2Goals)}
              value={item.team1Goals}
            />
            <TextInput
              style={styles.input}
              placeholder="Gols - Equipe 2"
              keyboardType="numeric"
              onChangeText={text => updateGameResult(index, item.team1Goals, text)}
              value={item.team2Goals}
            />
            {item.completed && <Text>Resultado Registrado</Text>}
          </View>
        )}
      />
      <Button title="Processar Próxima Rodada" onPress={processNextRound} style={styles.button} />
    </View>
  );
};

export default TournamentScreen;