import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home screen!</Text>
      <Button title="Sign in" buttonStyle={styles.button} />
      <Button title="Sign up" type="outline" buttonStyle={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 25,
    fontSize: 20
  },
  button: {
    margin: 5
  }
});