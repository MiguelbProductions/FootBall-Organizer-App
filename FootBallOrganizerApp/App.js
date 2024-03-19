import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CreateTournamentScreen from './src/screens/CreateTournamentScreen';
import AddTeamsScreen from './src/screens/AddTeamsScreen';
import TournamentScreen from './src/screens/TournamentScreen';
import styles from './src/styles/styles';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="CreateTournament" component={CreateTournamentScreen} options={{ title: 'Create Tournament' }} />
        <Stack.Screen name="AddTeams" component={AddTeamsScreen} options={{ title: 'Add Teams' }} />
        <Stack.Screen name="Tournament" component={TournamentScreen} options={{ title: 'Tournament' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
