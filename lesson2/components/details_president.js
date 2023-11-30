import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import UsaDB from '../usa_db';

export default function DetailsPresident({ route, navigation }) {
  const { id } = route.params;
  const [president, setPresident] = useState({id: 0, name: '', term: ''});
  
  async function getPresidentById(id) {
    const result = await UsaDB.getPresidentById(id);
    setPresident(result);
  }

  useEffect(() => {
    if (id !== 0) {
    getPresidentById(id);
    }
  }, []);

  function handleChangeName(value) {
    setPresident({ ...president, name: value });
  }

  function handleChangeTerm(value) {
    setPresident({ ...president, term: value });
  }
  
  async function updatePresident(president){
    await UsaDB.updatePresident(president);
  }
  
  function handleOnPress() {
    updatePresident(president);
    navigation.goBack()
  }

  async function deletePresident(id){
    await UsaDB.deletePresident(id);
  }
  
  function handleDelete() {
    deletePresident(president.id);
    navigation.goBack()
  }

  async function insertPresident(president) {
    await UsaDB.insertPresident(president);
  }
  
  function handleInsert() {
    insertPresident(president);
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChangeName}
        style={styles.input}
        value={president.name}
      />
      <TextInput
        onChangeText={handleChangeTerm}
        style={styles.input}
        value={president.term}
        keyboardType='numeric'
      />
      {id !== 0 &&
  <>
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={styles.name}>Update</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Text style={styles.name}>Delete</Text>
    </TouchableOpacity>
  </>
}
{id === 0 &&
  <>
    <TouchableOpacity style={styles.button} onPress={handleInsert}>
      <Text style={styles.name}>Insert</Text>
    </TouchableOpacity>
  </>
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  button: {
    backgroundColor: '#cceeff',
    padding: 20,
    marginBottom: 10
  },
  name: {
    fontSize: 20,
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
});