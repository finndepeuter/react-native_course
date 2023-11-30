import { TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function DetailsPresident() {
  const [president, setPresident] = useState({id: 0, name: '', term: ''});
  
  function handleChangeName(value) {
    setPresident({ ...president, name: value });
  }

  function handleChangeTerm(value) {
    setPresident({ ...president, term: value });
  }
  
  function handleOnPress() {

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
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.name}>Update</Text>
      </TouchableOpacity>
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