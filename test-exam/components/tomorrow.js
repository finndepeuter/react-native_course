import axios from 'axios';

import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';

import configData from "../config/api.json";

export default function Tomorrow() {
  const [forecast, setForecast] = useState();

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1)
  let formatdate = tomorrow.getDate() + "/" + parseInt(tomorrow.getMonth()+1) + "/" + tomorrow.getFullYear();

  async function weatherapi(){
    var response = await axios.get(configData.weatherapi + "api/weather" + "?type=slow&city=Antwerp");
    setForecast(response.data.list[0]);
  }

  useEffect(() => {
    weatherapi();
  }, []);

  if (forecast == undefined) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{forecast.main.temp} °C - {forecast.weather[0].description}</Text>
      <Image source={{uri :configData.weatherapi + "static/" + forecast.weather[0].icon + ".png"}}
             style={styles.biglogo}/>
      <Text style={styles.city}>Geel - {formatdate}</Text>
      <Text style={styles.name}>{'\u00A9'} name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    color: 'white',
    fontSize: 15
  },
  temp: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginBottom: 20
  },
  city: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginTop: 20
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    marginTop: 100
  },
  biglogo: {
    width: 250,
    height: 250,
  },
});