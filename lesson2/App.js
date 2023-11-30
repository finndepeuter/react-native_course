import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
// import Promises from './components/promises';
import ListPresidents from './components/list_presidents';
import UsaDB from './usa_db';

import DetailsPresident from './components/details_president';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ListPresidents navigation={navigation} />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <DetailsPresident route={route} navigation={navigation} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    UsaDB.initDb();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'All presidents' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});