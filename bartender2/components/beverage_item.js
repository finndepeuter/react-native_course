import { Image, TouchableOpacity, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import { beverages } from '../images/beverages';
import { useRecoilState } from 'recoil';
import { orderListState } from '../store';

export default function BeverageItem({ beverage }) {
  const beverageImage = beverages.find((item) => item.name === beverage.name)?.image;

  const [orderList, setOrderList] = useRecoilState(orderListState);

  const addToOrderList = () => {
    const existingBeverage = orderList.find((item) => item.id === beverage.id);

    if (existingBeverage) {
      // If the beverage is already in the order list, update the count
      const updatedOrderList = orderList.map((item) =>
        item.id === beverage.id ? { ...item, count: item.count + 1 } : item
      );
      setOrderList(updatedOrderList);
    } else {
      // If the beverage is not in the order list, add it with count=1
      setOrderList([...orderList, { ...beverage, count: 1 }]);
    }
  };
  console.log(orderList)

  return (
    <Pressable style={styles.container}>
      <Image source={beverageImage} style={styles.image}></Image>
      <View style={styles.column}>
        <Text style={styles.name}>{beverage.name}</Text>
        <Text style={styles.price}>€ {beverage.price}</Text>
      </View>
      <TouchableOpacity style={styles.circle} onPress={addToOrderList}>
        <Ionicons name="add" style={styles.plus}/>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
  },
  small: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  image: {
    width: 50,
    height: 50,
    margin: 10
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'firebrick',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  plus: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  }
});