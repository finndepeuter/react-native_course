import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function Game() {

    function handleOnPress() {
      }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Choose the right flag!</Text>
            
                <Text style={styles.country}>Mexico</Text>
                <View style={styles.imagecontainer}>
                    <TouchableOpacity onPress={handleOnPress}>
                        <Image source={require('../images/jp.png')} style={styles.smalllogo}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnPress}>
                        <Image source={require('../images/mx.png')} style={styles.smalllogo}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnPress}>
                        <Image source={require('../images/au.png')} style={styles.smalllogo}/>
                    </TouchableOpacity>
                </View>
           
            <Text style={styles.text}>Score: 0</Text>
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