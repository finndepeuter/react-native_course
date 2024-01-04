import { Image, View, Text, StyleSheet } from 'react-native';

import { beverages } from '../images/beverages';

export default function OrderItem({ item }) {
  return (
    <View style={styles.container}>
      <Text>??</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  column: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5
  }
});