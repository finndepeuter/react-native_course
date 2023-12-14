import { Text, Pressable, StyleSheet } from 'react-native';

export default function StudentItem() {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.circle}>A</Text>
      <Text style={styles.name}>firstname lastname</Text>
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
  name: {
    fontSize: 15,
    height: 50,
    textAlignVertical: 'center',
  },
});