import { Text, Pressable, StyleSheet } from 'react-native';

export default function EnrollmentItem({ enrollment, onPress }) {
    return (
      <Pressable style={styles.container} onPress={() => onPress(student)}>
        <Text style={styles.circle}>{student.lastname.charAt(0).toUpperCase()}</Text>
        <Text style={styles.name}>{student.firstname} {student.lastname}</Text>
      </Pressable>
    );
  };