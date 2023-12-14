import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useState, useEffect } from 'react';

import call from 'react-native-phone-call';
import { Picker } from '@react-native-picker/picker';

import Buttons from './buttons';
import ContactsDB from '../contacts_db';

export default function ContactForm() {
  const [index, setIndex] = useState(0); // index of current contact
  const [contacts, setContacts] = useState([]); // all contacts
  const [categories, setCategories] = useState([]); // all categories

  function handleNameChange(value) {
    // update name in contacts, do not mutate array!
  }

  function handleCategoryidChange(value) {
    // update category in contacts, do not mutate array!
  }

  function handleTelChange(value) {
    // update tel in contacts, do not mutate array!
  }

  function handlePrevious() {
    // scroll to previous contact (if not first), use index
  }

  function handlePhone() {
    // make a call to contact
  }

  function handleNext() {
    // scroll to next contact (if any left), use index
  }

  function handleAdd() {
    // insert a new empty contact in db
  }

  function handleUpdate() {
    // update current contact in db
  }

  function handleDelete() {
    // delete current contact from db
  }

  useEffect(() => {
    // read all contacts and categories
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titletext}>My Contacts</Text>
      </View>
      {
        contacts.length == 0 && (
          <View style={styles.content}>
            <Text style={styles.titletext}>No contacts...</Text>
          </View>
        )
      }
      {
        contacts.length != 0 && (
          <View style={styles.content}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              onChangeText={handleNameChange}
              style={styles.input}
              value={contacts[index].name}
            />
            <Text style={styles.text}>Category</Text>
            <View style={{ borderColor: 'gray', borderWidth: 0.5 }}>
              <Picker selectedValue={contacts[index].categoryid} onValueChange={handleCategoryidChange} style={styles.input}>
                {
                  categories.map((category) => (
                    <Picker.Item key={category.id} label={category.name.toUpperCase()} value={category.id} />
                  ))
                }
              </Picker>
            </View>
            <Text style={styles.text}>Phone</Text>
            <TextInput
              onChangeText={handleTelChange}
              style={styles.input}
              value={contacts[index].tel}
              keyboardType='numeric'
            />
          </View>
        )
      }
      <View style={styles.buttons}>
        <Buttons handlePrevious={handlePrevious} handlePhone={handlePhone} handleNext={handleNext} handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 10,
    padding: 10
  },
  text: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  title: {
    flex: 2,
    justifyContent: 'center'
  },
  titletext: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 4,
    justifyContent: 'center'
  },
  buttons:{
    flex: 3,
    justifyContent: 'center'
  }
});