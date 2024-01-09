import { Image, View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function LevelItem({level}) {
  
  const navigation = useNavigation();
  
  return (
    <Pressable style={styles.button} onPress={() => navigation.navigate('dreamteam')}>
      <Image source={require('../images/level.png')} style={styles.image} />
      <View style={styles.column}>
        <Text style={styles.buttontext}>{level.name}</Text>
      </View>
    </Pressable>
  );

};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'darkseagreen'
  },
  image: {
    width: 50,
    height: 50,
    margin: 5
  },
  column: {
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10
  }
});