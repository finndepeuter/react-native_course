import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { createTheme, ThemeProvider } from '@rneui/themed';

import { RecoilRoot } from 'recoil';
import configData from "./config/graphql.json";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BeveragesScreen from './components/beverages_screen';
import OrderScreen from './components/order_screen';

const Tab = createBottomTabNavigator();
const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    'x-hasura-admin-secret': configData.qlkey
  },
  cache: new InMemoryCache()
});

const theme = createTheme({
  lightColors: {
    primary: 'firebrick',
  },
  darkColors: {
    primary: '#000',
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <NavigationContainer style={styles}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case "Beverages":
                    iconName = focused ? 'md-beer' : 'md-beer-outline';
                    break;
                  case "Order a drink":
                    iconName = focused ? 'hand-right-sharp' : 'hand-right-outline';
                    break;
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'firebrick',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Beverages" component={BeveragesScreen} />
            <Tab.Screen name="Order a drink" component={OrderScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </ApolloProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});