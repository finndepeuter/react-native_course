import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';

export default function Buttons() {

  function handleOnPress() {
    alert('You clicked the button!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleOnPress}
          title="Press Me"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleOnPress}
          title="Press Me"
          color="#841584"
        />
      </View>
      <View style={styles.multiButtonContainer}>
        <Button
          onPress={handleOnPress}
          title="A disabled button"
          disabled={true}
        />
        <Button style={styles.bigButton}
          onPress={handleOnPress}
          title="OK!"
          color="#841584"
        />
      </View>
      <View>
      <TouchableOpacity
          style={styles.bigbutton}
          onPress={handleOnPress} >
          <Text style={styles.textbutton}>Press Here</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bigbutton: {
    height: 100,
    backgroundColor: '#841584',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbutton: {
    fontSize: 50,
    color: 'white',
    fontStyle: 'italic'
  },
});