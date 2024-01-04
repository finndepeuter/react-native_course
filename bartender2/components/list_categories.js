import { View, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';

export default function ListCategories({ }) {

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'

  },
  button: {
    marginTop: 15,
    margin: 5
  },
  name: {
    color: 'white',
    fontSize: 20
  },
});