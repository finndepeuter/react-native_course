import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { orderListState } from '../store'; // Import your actual Recoil store
import Separator from './layout/seperator';
import OrderItem from './order_item';

export default function ListOrder() {
  // Retrieve the orderListState from Recoil
  const orderList = useRecoilValue(orderListState);
  console.log(orderList);
  // Render each order item
  const renderItem = ({ item }) => <OrderItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orderList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name} // Use a unique identifier for each item
        ItemSeparatorComponent={Separator} // Separator component between items
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
});
