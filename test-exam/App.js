import { StyleSheet, View } from 'react-native';

import Tomorrow from './components/tomorrow';

export default function App() {
  return (
    <View style={styles.container}>
      <Tomorrow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cc0066',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
