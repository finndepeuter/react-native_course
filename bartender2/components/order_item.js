import { Image, View, Text, StyleSheet } from 'react-native';

import { beverages } from '../images/beverages';

export default function OrderItem({ item }) {
  console.log(item)
  const beverageImage = beverages.find((bev) => bev.name === item?.name)?.image;
  const countArray = Array.from({ length: item.count }, (_, index) => index);
  return (
    <View style={styles.container}>
      <Image source={beverageImage} style={styles.image}></Image>
      <Text style={styles.name}>{item.name} {countArray.map((item) => 'I').join('')}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  column: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5
  }
});