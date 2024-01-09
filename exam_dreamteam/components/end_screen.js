import { View, StyleSheet, Text, Image } from 'react-native'

import Copyright from './layout/copyright';

export default function EndScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.big}>Dreamteam ... registered!</Text>
      <Image source={require('../images/level.png')} style={styles.image} />
      <Text style={styles.big}>...</Text>
      <Copyright />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  big: {
    margin: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 200,
    margin: 10
  }
});