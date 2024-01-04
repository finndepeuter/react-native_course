//import { StatusBar } from 'expo-status-bar';
import { StatusBar, StyleSheet, View } from 'react-native';
//import LotsOfStyles from './components/lots_of_styles';
//import FixedDimensions from './components/height_and_width';
//import FlexDimensions from './components/height_and_width';
//import PercentageDimensions from './components/height_and_width';
import FlexStyles from './components/flex_styles';
// import Buttons from './components/buttons';
// import UserInput from './components/user_input';
//import ScrollStudents from './components/scroll_students';
//import Images from './components/images';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LotsOfStyles/> */}
      {/* <FixedDimensions/> */}
      {/* <PercentageDimensions/> */}
      <FlexStyles/>
      {/* <Buttons/> */}
      {/* <UserInput/> */}
      {/* <ScrollStudents/> */}
      {/* <Images/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', // vertical allignment at the bottom
  },
});
