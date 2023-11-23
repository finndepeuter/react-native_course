//import { StatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, View } from 'react-native';
import LotsOfStyles from './components/lots_of_styles';

export default function App() {
  return (
    <View style={styles.container}>
      <LotsOfStyles/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
