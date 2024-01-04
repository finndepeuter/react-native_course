import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-elements';
import { useRecoilCallback } from 'recoil';
import { orderListState } from '../store'; // Import your actual Recoil store
import ListOrder from './list_order';

export default function OrderScreen() {
  const clearOrderList = useRecoilCallback(({ set }) => async () => {
    // Clear the orderListState by setting it to an empty array
    set(orderListState, []);
  });

  return (
    <View style={styles.container}>
      <ListOrder />
      <FAB
        icon={{ name: 'delete', color: 'white' }}
        size="large"
        placement="right"
        color="firebrick"
        onPress={clearOrderList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
