import { View, TextInput, StyleSheet, Input } from 'react-native';
import { Button } from '@rneui/themed';

import { useState, useEffect } from 'react';

import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';

import { useQuery, useMutation } from "@apollo/client";
import { GET_ENROLLMENTS } from "../../gql/enrollments/queries";

export default function EnrollmentsDetailsScreen({ route, navigation}) {
    const { id } = route.params;
    const [enrollment, setEnrollment] = useState({ id: 0, studentId: 0, courseId: 0, grade: ''});
    const { data, loading, error } = useQuery(GET_ENROLLMENT, { variables: { id }, skip: id === 0 });

    useEffect(() => {
        if (data) {
          setCourse(data.enrollments_by_pk);
        }
      }, [data]);
}