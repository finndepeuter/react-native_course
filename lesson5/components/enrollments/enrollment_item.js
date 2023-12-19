import { Text, Pressable, StyleSheet } from 'react-native';

export default function EnrollmentItem({ enrollment, onPress }) {
    return (
      <Pressable style={styles.container} onPress={() => onPress(enrollment)}>
        <Text style={styles.circle}>{enrollment.grade}</Text>
        <Text style={styles.title}>{enrollment.course.title} ({enrollment.student.firstname} {enrollment.student.lastname})</Text>
      </Pressable>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 8,
      alignContent: 'center',
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 50,
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
      backgroundColor: 'tomato',
      marginLeft: 10,
      marginRight: 20,
    },
    title: {
      fontSize: 15,
      height: 50,
      textAlignVertical: 'center',
    },
  });    