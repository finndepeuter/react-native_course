import { TextInput, View, StyleSheet, Text, FlatList } from 'react-native';

import { useEffect, useState } from 'react';
import { GET_FILTERED_COUNTRIES } from '../gql/queries';
import { useLazyQuery } from '@apollo/client';
import CountryItem from './item_country';

export default function SearchScreen() {
  const [searchFilter, setSearchFilter] = useState('');
  const [getFilteredCountries, { loading, data, error }] = useLazyQuery(GET_FILTERED_COUNTRIES);

  // modify the filter as it doesn't work in graphql itself to work with wildcards
  const filter = searchFilter;
  const modifiedFilter = `${filter}%`;

  // use wildcard filter to search
  useEffect(() => {
    getFilteredCountries({
      variables: { filter: modifiedFilter},
    })
  }, [searchFilter, getFilteredCountries]);

  console.log('Data:', data);
  console.log('Error', error)

  function handleChangeFilter(value) {
    setSearchFilter(value);
  }

  return (
    <View>
      <TextInput
        placeholder="-- enter some letters --"
        onChangeText={handleChangeFilter}
        style={styles.input}
        value={searchFilter}
      />
      {loading && <Text>Fetching Data...</Text>}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
      {data && (
        <FlatList
          data={data.countries}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View>
              <CountryItem country={item}/>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});