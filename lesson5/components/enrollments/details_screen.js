import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ENROLLMENTS,
  GET_ENROLLMENT,
  INSERT_ENROLLMENT,
  UPDATE_ENROLLMENT,
  DELETE_ENROLLMENT
} from "../../gql/enrollments/queries";
import { GET_COURSES } from '../../gql/courses/queries';
import { GET_STUDENTS } from '../../gql/students/queries';
import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';

export default function EnrollmentsDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [enrollment, setEnrollment] = useState({ id: 0, studentId: 0, courseId: 0, grade: '' });
  const { data, loading, error } = useQuery(GET_ENROLLMENT, { variables: { id }, skip: id === 0 });
  const { data: studentsData, loading: studentsLoading, error: studentsError } = useQuery(GET_STUDENTS);
  const { data: coursesData, loading: coursesLoading, error: coursesError } = useQuery(GET_COURSES);


  // useEffect(() => {
  //   if (data) {
  //     setEnrollment(data.enrollments_by_pk);
  //   }
  // }, [data, studentsData, coursesData]);

  useEffect(() => {
    console.log("Students Data:", studentsData.students);
    console.log("Students Loading:", studentsLoading);
    console.log("Students Error:", studentsError);

    console.log("Courses Data:", coursesData.courses);
    console.log("Courses Loading:", coursesLoading);
    console.log("Courses Error:", coursesError);

    if (data) {
      console.log("Enrollment Data:", data.enrollments_by_pk);
      setEnrollment(data.enrollments_by_pk);
    }
  }, [data, studentsData, coursesData, studentsLoading, coursesLoading, studentsError, coursesError]);

  const [insertEnrollment] = useMutation(INSERT_ENROLLMENT, {
    refetchQueries: [
      { query: GET_ENROLLMENTS }
    ],
  });

  const [updateEnrollment] = useMutation(UPDATE_ENROLLMENT, {
    refetchQueries: [
      { query: GET_ENROLLMENTS }
    ],
  });

  const [deleteEnrollment] = useMutation(DELETE_ENROLLMENT, {
    refetchQueries: [
      { query: GET_ENROLLMENTS }
    ],
  });

  function handleInsert() {
    insertEnrollment({ variables: { grade: enrollment.grade, courseId: enrollment.courseId, studentId: enrollment.studentId } });
    navigation.goBack();
  }

  function handleUpdate() {
    updateEnrollment({ variables: { id: enrollment.id, grade: enrollment.grade, courseId: enrollment.courseId, studentId: enrollment.studentId } });
    navigation.goBack();
  }

  function handleDelete() {
    deleteEnrollment({ variables: { id: enrollment.id } });
    navigation.goBack();
  }

  if (loading) return <Fetching />;
  if (error) return <Error error={error} />;

  function handleChangeGrade(value) {
    setEnrollment({ ...enrollment, grade: value });
  }

  function handleChangeStudent(value) {
    setEnrollment({ ...enrollment, studentId: value });
  }

  function handleChangeCourse(value) {
    setEnrollment({ ...enrollment, courseId: value });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Grade"
        onChangeText={handleChangeGrade}
        style={styles.input}
        value={enrollment.grade}
      />
      <Picker
        selectedValue={enrollment.studentId}
        onValueChange={handleChangeStudent}
      >
        {studentsLoading ? (
          <Picker.Item label="Loading Students..." value={0} />
        ) : studentsError ? (
          <Picker.Item label="Error loading students" value={0} />
        ) : studentsData && studentsData.students ? (
          <>
            <Picker.Item label="Select Student" value={0} />
            {studentsData.students.map(student => (
              <Picker.Item key={student.id} label={`${student.firstname} ${student.lastname}`} value={student.id} />
            ))}
          </>
        ) : (
          <Picker.Item label="No Students available" value={0} />
        )}
      </Picker>
      <Picker
        selectedValue={enrollment.courseId}
        onValueChange={handleChangeCourse}
      >
        {coursesLoading ? (
          <Picker.Item label="Loading Courses..." value={0} />
        ) : coursesError ? (
          <Picker.Item label="Error loading courses" value={0} />
        ) : coursesData && coursesData.courses ? (
          <>
            <Picker.Item label="Select Course" value={0} />
            {coursesData.courses.map(course => (
              <Picker.Item key={course.id} label={course.title} value={course.id} />
            ))}
          </>
        ) : (
          <Picker.Item label="No Courses available" value={0} />
        )}
      </Picker>
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
}

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
