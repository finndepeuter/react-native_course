import { FlatList, View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';

import { useQuery } from "@apollo/client";
import { GET_ENROLLMENTS } from "../../gql/enrollments/queries";

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';
import Separator from '../layout/seperator';

import EnrollmentItem from './enrollment_item';

export default function EnrollmentsListScreen({ navigation }) {
    const { data, loading, error } = useQuery(GET_ENROLLMENTS);

    if (loading) return <Fetching />
    if (error) return <Error error={error} />

    function handleDetails(enrollment) {
        navigation.navigate('EnrollmentDetails', { id: enrollment.id });
    }

    function handleInsert() {
        navigation.navigate('EnrollmentDetails', { id: 0 })
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={data.enrollments}
            renderItem={({ item }) => <EnrollmentItem enrollment={item} onPress={handleDetails} />}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={Separator}
            />
            <FAB
            icon={{ name: 'add', color: 'white' }}
            size="large"
            placement="right"
            color="tomato"
            onPress={handleInsert} 
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });