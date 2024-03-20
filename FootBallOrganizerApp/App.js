import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CreateTournamentScreen from './src/screens/CreateTournamentScreen';
import AddTeamsScreen from './src/screens/AddTeamsScreen';
import TournamentScreen from './src/screens/TournamentScreen';
import styles from './src/styles/styles';

export const TournamentContext = createContext();
const Stack = createNativeStackNavigator();

function App() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const addTournament = (newTournament) => {
    setTournaments([...tournaments, newTournament]);
    setSelectedTournament(newTournament);
  };

  return (
    <TournamentContext.Provider value={{ tournaments, addTournament, selectedTournament, setSelectedTournament }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="CreateTournament" component={CreateTournamentScreen} options={{ title: 'Create Tournament' }} />
          <Stack.Screen name="AddTeams" component={AddTeamsScreen} options={{ title: `${selectedTournament ? selectedTournament.name : ""} - Add Teams` }} />
          <Stack.Screen name="Tournament" component={TournamentScreen} options={{ title: `${selectedTournament ? selectedTournament.name : ""} - Tournament` }} />
        </Stack.Navigator>
      </NavigationContainer>
    </TournamentContext.Provider>
  );
}

export default App;
