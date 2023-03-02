import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import Meteo from "./component/todayMeteo";
import axios from "axios"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0526873bd2aaf4e98ead041cf09c76c&lang=fr&units=metric`
  // Récupération de la localisation de l'utilisateur (avec pop-up d'accord)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {        
        return
      } 
      const userLocation = await Location.getCurrentPositionAsync()
      getMeteo(userLocation)
    }
    getLocation()
  }, [])

 
  // Récupération données API
  // -> Ville
  // -> Météo du moment
  // -> Prévisions

  const getMeteo = async (location) => {
    try {
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))
      setData(response.data)
      setLoading(false)
    } catch(error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>METEO</Text>
      <StatusBar style="auto" />
      <Meteo
      data={data} />
    </View>
  );
}


