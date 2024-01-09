import { View, StyleSheet, FlatList } from 'react-native'

import FootballerItem from './footballer_item';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Copyright from './layout/copyright';
import { useQuery } from '@apollo/client';
import { GET_FOOTBALLERS } from '../gql/queries';

export default function FootballerScreen({ route, navigation }) {
  const {position} = route.params;
  console.log("position:" ,position)
  const {data, loading, error} = useQuery(GET_FOOTBALLERS, {
    variables: {filter: position}
  });
  if (loading ) {
    return <Fetching/>
  }
  console.log(data.footballers)
  const footballers = data ? data.footballers : [];
  return (
    <View style={styles.container}>
      <FlatList
      data={footballers}
        renderItem={({ item }) => <FootballerItem footballer={item} position={position}/>}
        keyExtractor={(item, index) => index}
      />
      <Copyright />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
});