import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, ScrollView, View, ImageBackground } from 'react-native';
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import TodayMeteo from "./component/todayMeteo";
import NextMeteo from './component/nextMeteo';
import axios from "axios"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItem: 'center',
  },
  meteoTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: '15%',
    alignSelf: 'center',
    color: '#045A57'
  },
  image: {
    width: '100%'
  }
});

export default function App() {
  const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8160103deb46cbb771dfb59bff9e2e61&lang=fr&units=metric`
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
      getCoords(userLocation)
    }
    getLocation()
  }, [])

 
  // Récupération données API
  // -> Ville
  // -> Météo du moment
  // -> Prévisions

  const getCoords = async (location) => {
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
        <ImageBackground source={require('./assets/background.jpg')} style= {styles.image}>
        <ScrollView>
            {/* Récupération nom de la ville */}
            <Text style={styles.meteoTitle}>Météo à {data?.city?.name}</Text>
          <StatusBar style="auto" />
          <TodayMeteo
          data={data} />
          <NextMeteo
          data={data} 
          style= {styles.position}/>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}


