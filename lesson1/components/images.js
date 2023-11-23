import { StyleSheet, View, Image } from 'react-native';

export default function Images() {
  return (
    <View style={styles.container}>
      <Image source={require('../images/react-logo.png')} style={styles.smalllogo}/>
      <Image source={require('../images/react-logo.png')} style={styles.biglogo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  smalllogo: {
    width: 150,
    height: 150,
  },
  biglogo: {
    width: 300,
    height: 300,
  },
});