import { StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';

import LevelItem from './level_item';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Copyright from './layout/copyright';
import { useQuery } from '@apollo/client';
import { GET_LEVELS } from '../gql/queries';
import { useRecoilState } from 'recoil';
import { playerState } from '../store';

export default function LevelScreen({ navigation }) {

  const {data, loading, error} = useQuery(GET_LEVELS);
  console.log(data)
  const levels = data ? data.levels : [];
  const [player, setPlayer]= useRecoilState(playerState);
  
  if (loading) {
    return <Fetching/>
  }

  const handleOnPress = (id) => {
    console.log("button pressed")
    const newPlayer = ["", levels[id]];
    setPlayer(newPlayer)
    navigation.navigate('dreamteam', {id: id})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        placeholder='Enter your dream team name'
        style={styles.input}
        onSubmitEditing={(e) => setPlayer({...player, dreamteam: e.target.value})}
        type="text"
      />
      <Text style={styles.label}>Experience level:</Text>
      
      <FlatList
        data={levels}
        renderItem={({ item }) => 
        <TouchableOpacity onPress={() => handleOnPress(item.id)}><LevelItem level={item} /></TouchableOpacity>
        }
        keyExtractor={(item, index) => index}
      />
      <Copyright />
    </View>
  );
};

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
    borderWidth: 0.5,
    padding: 10,
  }
});