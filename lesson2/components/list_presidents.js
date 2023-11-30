import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function ListPresidents() {
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#cceeff',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 20,
  },
  term: {
    fontSize: 10,
  },
});