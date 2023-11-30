import axios from 'axios';
import { Text, View, StyleSheet } from 'react-native';

import configData from "../config.json";

const weatherBaseUrl = configData.weatherapi + "api/weather";

function action() {
  return new Promise((resolve, reject) => {
    // do some action, i.e. a database transaction
    setTimeout(() => resolve("RESULT"), 2000);
    // setTimeout(() => reject("ERROR"), 2000);
  })
}

function version1() {
  console.log("before action");

  var promise = action();

  promise.then(
    function (response) {
      console.log('Response from the endpoint: ' + response);
    },
    function (error) {
      console.log('An error occurred: ' + error);
    });

  console.log("after action");
}

function version2() {
  console.log("before action");

  var response = action();

  console.log('Response from the endpoint')
  console.log(response);

  console.log("after action");
}

async function version3() {
  console.log("before action");

  try {
    let response = await action();
    console.log('Response from the endpoint: ' + response);
  } catch (error) {
    console.log('An error occurred: ' + error)
  }

  console.log("after action");
}

function weatherapi(){
  console.log("before action");

  var promise = axios.get(weatherBaseUrl + "?type=slow&city=Antwerp");
  promise.then(
    function (response) {
        console.log('Response from the endpoint: ' + response);
    },
    function (error) {
        console.log('An error occurred: ' + error)
    });

    console.log("after action");
}

export default function Promises() {

  useEffect(() => {
    weatherapi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.center}>What are promises?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  center: {
    textAlign: 'center'
  }
});