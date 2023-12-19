import { FlatList, View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-elements';

import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../gql/courses/queries";

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';
import Separator from '../layout/seperator';

import CourseItem from './course_item';

export default function CoursesListScreen({ navigation }) {
    const { data, loading, error } = useQuery(GET_COURSES);
  
    if (loading) return <Fetching />
    if (error) return <Error error={error} />
  
  
    function handleDetails(course) {
      navigation.navigate('CourseDetails', { id: course.id });
    }
    
    function handleInsert() {
      navigation.navigate('CourseDetails', { id: 0 });
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data.courses}
          renderItem={({ item }) => <CourseItem course={item} onPress={handleDetails} />}
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