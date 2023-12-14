import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { countries } from '../data';

// pick random countries function
function pick3RandomCountries(countries) {
    const allCountries = [...countries];
    let the3Countries = [];
  
    for (let i = 0; i < 3; i++) {
      let randomPosition = Math.floor(allCountries.length * Math.random());
      let randomCountry = allCountries.splice(randomPosition, 1);
      the3Countries.push(...randomCountry);
    }
  
    return the3Countries;
}

export default function Game() {
    // state variables
    const [score, setScore] = useState(0);
    const [country, setCountry] = useState('');
    const [flags, setFlags] = useState([]);

    // initialize the nextCountry when the app starts
    useEffect(() => {
        nextCountry();
      }, []);

    // next country function
    function nextCountry() {
        const randomCountries = pick3RandomCountries(countries.name);
        const randomCountry = randomCountries[Math.floor(Math.random() * 3)];
        setFlags(randomCountries);
        setCountry(randomCountry);
    };

    function handleOnPress() {
        if (selectedCountry === country) {
            // User selected the correct country, increase score
            setScore(score + 1);
          }
      
          // Show a new challenge
          nextCountry();
    };

    return (
        <View style={styles.container}>
      <Text style={styles.text}>Choose the right flag!</Text>

      <Text style={styles.country}>{country}</Text>
      <View style={styles.imagecontainer}>
        {flags.map((flag, index) => (
          <TouchableOpacity key={index} onPress={() => handleOnPress(flag.name)}>
            <Image source={flag.image} style={styles.smalllogo} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.text}>Score: {score}</Text>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 30,
    },
    smalllogo: {
        width: 100,
        height: 100,
    },
    imagecontainer: {
        flexDirection: 'row',
        marginTop: 20, 
    },
    country: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50, 
        marginBottom: 20,
        color: 'white',
    },
    text: {
        color: 'white',
        marginTop: 100, 
    },
  });