import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d5851a',
    borderRadius: 50,
    // height: '15%',
  },
  icon: {
    height: 30,
    width: 30
  }
});

export default function Meteo(props) {
  const {prev} = props;
  const getIconMeteo = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <View  style={styles.card}>
      <Text>{prev.hour}</Text>
      <Text>{prev.temp}°C</Text>
      <Image 
      source={{ uri: getIconMeteo(prev?.icon) }} 
      style={styles.icon}
      />
    </View>
  )
}