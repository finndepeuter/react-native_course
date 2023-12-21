import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import { getAuth, signOut } from 'firebase/auth';
import { FAB } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../../gql/queries';
import '../../config/firebase';
import Separator from '../seperator';
import CountryItem from '../item_country';
import { useAuthentication } from '../../hooks/use_authentication';

const auth = getAuth();

export default function WelcomeScreen() {

  const { user } = useAuthentication();
  const userId = user?.uid || '';
  
  // Apollo Client useQuery hook
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { uid: userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const countries = data?.visits.map((visit) => visit.country) || [];

  return (
    <View>
      {/* <Text style={styles.space}>Welcome {user?.email}!</Text>
      <Text style={styles.space}>UID: {user?.uid}</Text> */}
      {/* <Button title="Sign out" onPress={() => signOut(auth)} /> */}

      {/* Render de landen voor de gebruiker */}
      <FlatList
        data={countries}
        renderItem={({ item }) => <CountryItem country={item} />}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={Separator}
      />

      <FAB
        title="Sign out"
        placement="right"
        color="blue"
        onPress={() => signOut(auth)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    margin: 5
  }
});