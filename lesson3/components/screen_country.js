import { FlatList } from 'react-native';

import Fetching from './message_fetching';
import Error from './message_error';
import Separator from './seperator';

import CountryItem from './item_country';

export default function CountryScreen() {
  
  return (
    <FlatList
      renderItem={({ item }) => <CountryItem country={item} />}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={Separator}
    />
  );
}