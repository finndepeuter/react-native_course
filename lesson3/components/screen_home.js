import { FlatList } from 'react-native'

import Fetching from './message_fetching';
import Error from './message_error';
import Separator from './seperator';

import ContinentItem from './item_continent';

export default function HomeScreen() {

  return (
    <FlatList
      renderItem={({ item }) => <ContinentItem continent={item} />}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={Separator}
    />
  );
}