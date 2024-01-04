import { FlatList, View, StyleSheet } from 'react-native';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Separator from './layout/seperator';

import BeverageItem from './beverage_item';

export default function ListBeverages() {

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
});