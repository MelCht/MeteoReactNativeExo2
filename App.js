import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import { useEffect, useState } from 'react';
import Meteo from "./component/todayMeteo"

export default function App() {
  // Récupération de la localisation de l'utilisateur (avec pop-up d'accord)
  const [location, setlocation] = useState(null)
  
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {        
        return
      } 
      const userLocation = await Location.getCurrentPositionAsync()
      setlocation(userLocation)
    }
    getLocation()
  }, [])

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>J'ai besoin de ta location</Text>
      </View>
    )
  }
  // Récupération données API
  // -> Ville
  // -> Météo du moment
  // -> Prévisions
  return (
    <View style={styles.container}>
      <Text>METEO</Text>
      <Meteo
        location={location}
      ></Meteo>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
