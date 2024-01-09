import { Text, StyleSheet } from 'react-native';

export default function Copyright() {
  return (
    <Text style={styles.name}>{'\u00A9'}Finn De Peuter - r0831240</Text>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});