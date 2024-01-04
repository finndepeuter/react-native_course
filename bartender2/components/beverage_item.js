import { Image, TouchableOpacity, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import { beverages } from '../images/beverages';

export default function BeverageItem({ beverage }) {

  return (
    <Pressable style={styles.container}>
      <Text style={styles.name}>{beverage.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
  },
  small: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  image: {
    width: 50,
    height: 50,
    margin: 10
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'firebrick',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  plus: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  }
});