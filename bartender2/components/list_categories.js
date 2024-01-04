import { View, StyleSheet, Text } from 'react-native'
import { Button } from '@rneui/themed';

import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../gql/queries';
import { useRecoilState } from 'recoil';
import { categoryState } from '../store';

export default function ListCategories({ }) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <Fetching />;
  }

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  return (
    <View style={styles.container}>
      {data.categories.map((category) => (
        <Button
        key={category.id}
        onPress={() => handleCategoryPress(category.id)}
        style={styles.button}
        >
          <Text style={styles.name}>{category.name}</Text>
        </Button>
      ))}
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
    fontSize: 18
  },
});