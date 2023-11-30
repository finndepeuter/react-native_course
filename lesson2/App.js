import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Promises from './components/promises';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Promises />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});