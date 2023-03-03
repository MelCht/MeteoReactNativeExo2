import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#045A57',
    borderRadius: 50,
    marginRight: 20,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30
  },
  text: {
    color: 'white'
  }
});

export default function Meteo(props) {
  const {prev} = props;
  const getIconMeteo = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <View  style={styles.card}>
      <Text style={styles.text}>{prev.hour}</Text>
      <Text style={styles.text}>{prev.temp}°C</Text>
      <Image 
      source={{ uri: getIconMeteo(prev?.icon) }} 
      style={styles.icon}
      />
    </View>
  )
}