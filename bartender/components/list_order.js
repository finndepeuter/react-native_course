import { FlatList, View, StyleSheet } from 'react-native';

import Separator from './layout/seperator';
import OrderItem from './order_item';

export default function ListOrder() {

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  }
});