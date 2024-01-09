import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { RecoilRoot } from 'recoil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LevelScreen from './components/level_screen';
import DreamteamScreen from './components/dreamteam_screen';
import FootballerScreen from './components/footballer_screen';
import EndScreen from './components/end_screen';

import configData from "./config/graphql.json";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    'x-hasura-admin-secret': configData.qlkey
  },
  cache: new InMemoryCache()
});


export default function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="levels">
        <Stack.Screen name="levels" component={LevelScreen} options={{ title: 'Best footballers' }} />
        <Stack.Screen name="dreamteam" component={DreamteamScreen} options={{ title: "My Dreamteam"}} />
        <Stack.Screen name="footballers" component={FootballerScreen} options={({route}) => ({ title:"choose a "+ route.params.position})} />
      </Stack.Navigator>
        </NavigationContainer>
        
      </ApolloProvider>
    </RecoilRoot>
  );
}