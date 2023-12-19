import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';

import ListOrder from './list_order';

export default function OrderScreen() {

  return (
    <View style={styles.container}>
      <ListOrder />
      <FAB
        icon={{ name: 'delete', color: 'white' }}
        size="large"
        placement="right"
        color="firebrick"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});