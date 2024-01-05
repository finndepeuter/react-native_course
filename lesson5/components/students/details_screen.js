import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

import { useState, useEffect } from 'react';

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';

import { useQuery, useMutation } from "@apollo/client";
import { GET_STUDENTS, GET_STUDENT, INSERT_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "../../gql/students/queries";

export default function StudentsDetailsScreen({ route, navigation }) {
  // variables
  const { id } = route.params;
  const [student, setStudent] = useState({ id: 0, firstname: '', lastname: '' });
  const { data, loading, error } = useQuery(GET_STUDENT, { variables: { id }, skip: id === 0 });

  // mutations
  const [insertStudent] = useMutation(INSERT_STUDENT, {
    refetchQueries: [
      { query: GET_STUDENTS }
    ],
  });
  
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [
      { query: GET_STUDENTS }
    ],
  });
  
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [
      { query: GET_STUDENTS }
    ],
  });

  // functions
  function handleInsert() {
    insertStudent({ variables: { firstname: student.firstname, lastname: student.lastname } });
    navigation.goBack();
  }

  function handleUpdate() {
    updateStudent({ variables: { id: student.id, firstname: student.firstname, lastname: student.lastname } });
    navigation.goBack();
  }

  function handleDelete() {
    deleteStudent({ variables: { id: student.id } });
    navigation.goBack();
  }

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  function handleChangeFirstname(value) {
    setStudent({ ...student, firstname: value });
  }

  function handleChangeLastname(value) {
    setStudent({ ...student, lastname: value });
  }

  // fetch students in the beginning and every data reload
  useEffect(() => {
    if (data) {
      setStudent(data.students_by_pk);
    }
  }, [data]);
   

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First name"
        onChangeText={handleChangeFirstname}
        style={styles.input}
        value={student.firstname}
      />
      <TextInput
      placeholder="Last name"
        onChangeText={handleChangeLastname}
        style={styles.input}
        value={student.lastname}
      />
      {id !== 0 &&
        <>
          <Button title="Update" buttonStyle={styles.button} onPress={handleUpdate} />
          <Button title="Delete" type="outline" buttonStyle={styles.button} onPress={handleDelete} />
        </>
      }
      {id === 0 &&
        <Button title="Add" buttonStyle={styles.button} onPress={handleInsert} />
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
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 10,
  },
});