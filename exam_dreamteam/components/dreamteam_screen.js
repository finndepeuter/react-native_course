import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

import Copyright from './layout/copyright';
import { useRecoilValue } from 'recoil';
import { dreamteamListState, playerState } from '../store';
import { INSERT_VOTE } from '../gql/queries';
import { useMutation } from '@apollo/client';

export default function DreamteamScreen({ navigation, id }) {
  const [vote, {data, loading, error}] = useMutation(INSERT_VOTE);
  const team = useRecoilValue(playerState);
  const players = useRecoilValue(dreamteamListState);
  console.log(players)
  console.log("team:", team)
  function handlePress(position){
    navigation.navigate('footballers', {position: position})
  }

  function handleVote(){
    vote({variables: {dreamteam: team, goalkeeper: players[0].firstname, fieldplayer: players[1], striker: players[2]}})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {team.dreamteam} {team.level}</Text>
      <Text style={styles.input}></Text>
      <Text style={styles.label}>Goalkeeper:</Text>
      <Pressable style={styles.button} onPress={() => handlePress("goalkeeper")}>
        <Image source={require('../images/goalkeeper.png')} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.buttontext}> {players[0].lastname} {players[0].firstname}</Text>
        </View>
      </Pressable>
      <Text style={styles.label}>Fieldplayer:</Text>
      <Pressable style={styles.button} onPress={() => handlePress("fieldplayer")}>
        <Image source={require('../images/fieldplayer.png')} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.buttontext}>{players[1].lastname} {players[1].firstname}</Text>
        </View>
      </Pressable>
      <Text style={styles.label}>Striker:</Text>
      <Pressable style={styles.button} onPress={() => handlePress("striker")}>
        <Image source={require('../images/striker.png')} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.buttontext}>{players[2].lastname} {players[2].firstname} </Text>
        </View>
      </Pressable>
      {players[0] !== "" && players[1] !== "" && players[2] !== "" &&
        <>
          <Text style={styles.label}>Vote:</Text>
          <Pressable style={styles.button} onPress={() => handleVote()}>
            <Image source={require('../images/level.png')} style={styles.image} />
            <View style={styles.column}>
              <Text style={styles.buttontext}>VOTE</Text>
            </View>
          </Pressable>
        </>
      }
      <Copyright />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start'
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 15,
    padding: 10,
  },
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