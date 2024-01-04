import { View, Text, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import BeveragesScreen from './components/beverages_screen';
import OrderScreen from './components/order_screen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.dummy}>
      <Text>you can get rid of this</Text>
    </View>

    /*
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
    */

  );
}

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});