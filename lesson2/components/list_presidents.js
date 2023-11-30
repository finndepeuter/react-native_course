import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FAB } from 'react-native-elements';
import UsaDB from '../usa_db';
import { StatusBar } from 'react-native';

export default function ListPresidents({ navigation }) {
  const [data, setData] = useState([]);

  async function getPresidents() {
    const result = await UsaDB.getPresidents();
    setData(result);
  }

  useEffect(() => {
    //getPresidents();
  }, []);

  useFocusEffect(() => {
    getPresidents();
  })

  function handleOnPress(id) {
    navigation.navigate('Details', { id: id });
  }

  function handleInsert() {
    navigation.navigate('Details', { id: 0 });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOnPress(item.id)} style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.term}>{item.term} ({item.party})</Text>
          </TouchableOpacity>
        )}
      />
      <FAB
      icon={{ name: 'add', color: 'white' }}
      size="large"
      placement="right"
      color="#206587"
      onPress={handleInsert}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
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