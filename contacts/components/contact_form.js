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
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = {...updatedContacts[index], name: value};
      return updatedContacts;
    })
  }

  function handleCategoryidChange(value) {
    // update category in contacts, do not mutate array!
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = { ...updatedContacts[index], categoryid: value };
      return updatedContacts;
    })
  }

  function handleTelChange(value) {
    // update tel in contacts, do not mutate array!
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = { ...updatedContacts[index], tel: value };
      return updatedContacts;
    });
  }

  function handlePrevious() {
    // scroll to previous contact (if not first), use index
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  function handlePhone() {
    // make a call to contact
  }

  function handleNext() {
    // scroll to next contact (if any left), use index
    if (index < contacts.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  async function handleAdd() {
    // insert a new empty contact in db
    const newContact = await ContactsDB.insertContact();

  if (newContact) {
    // Update the contacts state with the new contact
    setContacts(prevContacts => [...prevContacts, newContact]);

    // Set the index to the newly added contact
    setIndex(prevIndex => prevIndex + 1);

    console.log('New contact added successfully:', newContact);
  } else {
    console.error('Failed to add a new contact.');
  }
  }

  async function handleUpdate() {
    // update current contact in db
    const currentContact = contacts[index];

    await ContactsDB.updateContact(currentContact);

    const updatedContacts = await ContactsDB.getContacts();
    setContacts(updatedContacts);
    console.log('Contact updated succesfully')
  }

  async function handleDelete() {
    // delete current contact from db
    // Get the current contact
    const currentContact = contacts[index];

    // Delete the contact from the database
    await ContactsDB.deleteContact(currentContact.id);

    // Optionally, you may want to refresh the contacts from the database
    const updatedContacts = await ContactsDB.getAllContacts();
    setContacts(updatedContacts);

    // Show the first contact after deletion
    setIndex(0);

    // Log success or perform any additional actions
    console.log('Contact deleted successfully!');
  }

  useEffect(() => {
    // read all contacts and categories
    const fetchData = async () => {
      try {
        // Read all categories and contacts from the database
        const allCategories = await ContactsDB.getCategories();
        const allContacts = await ContactsDB.getContacts();

        // Set categories and contacts in state
        setCategories(allCategories);
        setContacts(allContacts);

        // Set index to 0
        setIndex(0);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };

    fetchData();
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