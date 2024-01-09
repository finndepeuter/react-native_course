import { View, Text, Pressable, StyleSheet } from 'react-native';
import { dreamteamListState } from '../store';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
export default function FootballerItem({footballer, navigation, position}) {
  const navigate = useNavigation();
  const [dreamteamList, setDreamteamList] = useRecoilState(dreamteamListState)
  
  function handlePress() {
    var newlist = dreamteamList
    if (position == "striker") {
      newlist = [...dreamteamList[2], dreamteamList[0], dreamteamList[1], {...footballer}]
    }
    if (position == "goalkeeper") {
      newlist = [...dreamteamList[0], {...footballer}, dreamteamList[1], dreamteamList[2]]
    }

    if (position === "fieldplayer") {
      newlist = [...dreamteamList[1], dreamteamList[0], {...footballer} , dreamteamList[2]]
    }
    
    setDreamteamList(newlist)
    console.log("teamlist", dreamteamList)
  }

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <View style={styles.column}>
        <Text style={styles.buttontext}>{footballer.lastname} {footballer.firstname}</Text>
        <Text style={styles.buttontextsmall}>{footballer.nationality.name}</Text>
      </View>
      <Text style={styles.emoji}>{footballer.nationality.emoji}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'darkseagreen'
  },
  image: {
    width: 50,
    height: 50,
    margin: 10
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10
  },
  buttontextsmall: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10
  },
  emoji: {
    fontSize: 40,
    textAlign: 'center',
    marginRight: 5,
    justifyContent: 'center',
  }
});