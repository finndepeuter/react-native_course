import { SectionList } from 'react-native';

import Fetching from './message_fetching';
import Error from './message_error';
import Separator from './seperator';

import CountryItem from './item_country';
import ContinentHeader from './header_continent';

export default function ContinentScreen() {

  return (
    <SectionList
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <CountryItem country={item} />}
      ItemSeparatorComponent={Separator}
       />
  );
}
