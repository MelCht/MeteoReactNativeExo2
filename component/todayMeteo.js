import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { isSameDay } from "date-fns";

const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '-7%',
  }, 
  icon: {
    width: 150,
    height: 150
  },
  temp: {
    fontSize: 60,
    color: '#045A57',
  },
  minMax: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    marginBottom: '3%',
  },
  min: {
    backgroundColor: '#c1d5fe',
    width: '35%',
    textAlign: 'center',
    borderRadius: 50
  },
  max: {
    backgroundColor: '#feccc1',
    width: '35%',
    marginLeft: '15%',
    textAlign: 'center',
    borderRadius: 50
  }
});
  
  export default function TodayMeteo(props) {
    const {data} = props;
    const [meteoActuelle, setMeteoActuelle] = useState(null)
    const [icon, setIcon] = useState()
    const getIconMeteo = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`

  // Récupération données API
  // -> Ville
  // -> Météo du moment
  // -> Prévisions
    useEffect(() => {
      const todayMeteo = data.list.filter(forecast => {
        const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
        const forecastDate = new Date(forecast.dt * 1000)
        return isSameDay(today, forecastDate)
      })
      setMeteoActuelle(todayMeteo[0])
      setIcon(getIconMeteo(todayMeteo[0]?.weather[0].icon))
    }, [data])


    return (
    <>
    <View style={styles.topContainer}>
      {/* Récupération de l'image correspondant à la météo */}
       <Image 
      source={{ uri: icon }} 
      style={styles.icon}
      />
      <View>
        {/* Description de la météo */}
        <Text style={styles.description}>{meteoActuelle?.weather[0].description.toUpperCase()}</Text>
        {/* Récupération température arrondie */}
        <Text style={styles.temp}>{Math.round(meteoActuelle?.main.temp)}°C</Text>
      </View>
    </View>
    <View style={styles.minMax}>
      <Text style={styles.min}>Minimum: {Math.round(meteoActuelle?.main.temp_min)}</Text>
      <Text style={styles.max}>Maximum: {Math.round(meteoActuelle?.main.temp_max)}</Text>
    </View>
    </>
    )
}