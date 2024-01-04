import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import UsaDB from '../usa_db';
import { Picker } from '@react-native-picker/picker';

export default function DetailsPresident({ route, navigation }) {
  const { id } = route.params;
  const [president, setPresident] = useState({ id: 0, name: '', term: '', party: '' });
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");

  useEffect(() => {
    async function fetchParties() {
      const partyData = await UsaDB.getParties();
      setParties(partyData);
    }
  
    async function fetchPresidentData() {
      let presidentData = { id: 0, name: '', term: '', party: '' };
  
      if (id !== 0) {
        presidentData = await UsaDB.getPresidentById(id);
      }
  
      setPresident(presidentData);
    }
  
    fetchParties();
    fetchPresidentData();
  }, [id, selectedParty]);

  function handleChangeName(value) {
    setPresident({ ...president, name: value });
  }

  function handleChangeTerm(value) {
    setPresident({ ...president, term: value });
  }

  function handleChangeParty(value) {
    setSelectedParty(value);
    setPresident({ ...president, party: selectedParty });
  }

  async function updatePresident(president) {
    await UsaDB.updatePresident(president);
  }

  function handleOnPress() {
    updatePresident(president);
    navigation.goBack();
  }

  async function deletePresident(id) {
    await UsaDB.deletePresident(id);
  }

  function handleDelete() {
    deletePresident(president.id);
    navigation.goBack();
  }

  async function insertPresident(president) {
    await UsaDB.insertPresident(president);
  }

  function handleInsert() {
    insertPresident(president);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChangeName}
        style={styles.input}
        value={president.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={handleChangeTerm}
        style={styles.input}
        value={president.term}
        keyboardType='numeric'
        placeholder="Term"
      />

      {/* Party selection dropdown */}
      <Picker
        selectedValue={selectedParty}
        onValueChange={handleChangeParty}
        style={styles.input}
      >
        {/* <Picker.Item label="Select Party" value="" style={{ fontSize: 14 }} /> */}
        {parties.map((party) => (
          <Picker.Item key={party.id} label={party.name} value={party.name} style={{ fontSize: 14 }} />
        ))}
      </Picker>

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  button: {
    backgroundColor: '#cceeff',
    padding: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
  dropdownContainer: {
    borderWidth: 0.5,
    marginTop: 5,
    maxHeight: 150,
  },
  dropdownItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});
