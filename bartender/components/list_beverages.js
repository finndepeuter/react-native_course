import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@apollo/client';
import { GET_FILTERED_BEVERAGES } from '../gql/queries'; // Import your actual GraphQL query
import { categoryState } from '../store';
import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Separator from './layout/seperator';
import BeverageItem from './beverage_item';

export default function ListBeverages() {
  const selectedCategory = useRecoilValue(categoryState);

  // Query to fetch beverages based on the selected category
  const { loading, error, data, refetch } = useQuery(GET_FILTERED_BEVERAGES, {
    variables: { categoryId: selectedCategory },
    skip: !selectedCategory, // Skip the query if selectedCategory is falsy
  });

  // Trigger a refetch whenever selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory, refetch]);

  console.log('selectedCategory:', selectedCategory);
  console.log('loading:', loading);
  console.log('error:', error);
  console.log('data:', data);

  if (loading) {
    return <Fetching />;
  }

  const beverages = data ? data.beverages : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={beverages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BeverageItem beverage={item} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});