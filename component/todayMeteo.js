import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    meteoTitle: {
      // backgroundColor: 'red',
    },
  });
  
  export default function Meteo(props) {
    const { location } = props;

    return (
    <View style={styles.meteoTitle}>
      <Text>Voici la météo à {location.coords.latitude}</Text>
    </View>
  )
}