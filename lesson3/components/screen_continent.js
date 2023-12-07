import { SectionList } from 'react-native';
import { useQuery } from "@apollo/client";
import { GET_CONTINENTS_COUNTRIES } from "../gql/queries";
import Fetching from './message_fetching';
import Error from './message_error';
import Separator from './seperator';

import CountryItem from './item_country';
import ContinentHeader from './header_continent';

export default function ContinentScreen() {
  const { data, loading, error } = useQuery(GET_CONTINENTS_COUNTRIES);

  if (loading) return <Fetching />
  if (error) return <Error error={error} />

  return (
    <SectionList
      sections={data.continents}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <CountryItem country={item} />}
      ItemSeparatorComponent={Separator}
      renderSectionHeader={({ section }) => <ContinentHeader continent={section} />
      }
    />
  );
}