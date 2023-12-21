import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import UsaDB from '../usa_db';

export default function DetailsPresident({ route, navigation }) {
  const { id } = route.params;
  const [president, setPresident] = useState({ id: 0, name: '', term: '', party: '' });
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    async function fetchParties() {
      const partyData = await UsaDB.getParties();
      setParties(partyData);
    }

    if (id !== 0) {
      getPresidentById(id);
    }
    fetchParties();
  }, []);
  async function getPresidentById(id) {
    const result = await UsaDB.getPresidentById(id);
    setPresident(result);
  }
  
  function handleChangeName(value) {
    setPresident({ ...president, name: value });
  }

  function handleChangeTerm(value) {
    setPresident({ ...president, term: value });
  }

  function handlePartyPress(selectedParty) {
    setPresident({ ...president, party: selectedParty });
    setShowPartyDropdown(false);
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

      {/* Display selected party */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPartyDropdown(!showPartyDropdown)}
      >
        <Text>{president.party || 'Select Party'}</Text>
      </TouchableOpacity>

      {/* Party selection dropdown */}
      {showPartyDropdown && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={parties}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePartyPress(item.name)}>
                <Text style={styles.dropdownItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

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
