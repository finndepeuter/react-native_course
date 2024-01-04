import { FlatList, View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import Fetching from './layout/message_fetching';
import Error from './layout/message_error';
import Separator from './layout/seperator';
import { useEffect } from 'react';
import BeverageItem from './beverage_item';
import { categoryState } from '../store';
import { useQuery } from '@apollo/client';
import { GET_FILTERED_BEVERAGES } from '../gql/queries';

export default function ListBeverages() {

  const selectedCategory = useRecoilValue(categoryState);

  const {loading,error,data,refetch} = useQuery(GET_FILTERED_BEVERAGES, {
    variables: {categoryId: selectedCategory},
    skip: !selectedCategory
  });

  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory, refetch])

  if (loading) {
    return <Fetching/>;
  }

  const beverages = data ? data.beverages : [];

  return (
    <View style={styles.container}>
      <FlatList
      data={beverages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BeverageItem beverage={item}/> }
      ItemSeparatorComponent={Separator}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
});