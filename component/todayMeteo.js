import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { isSameDay } from "date-fns";

const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    top: 65,
    width: '95%',
    height: '40%',
    alignItems: 'center',
    // borderRadius: 15,
    // shadowColor: '#d5851a',
    // shadowOpacity: 15,
    // shadowOffset: { width: 2, height: 2 }, 
    // shadowOpacity: 0.8,  
    // elevation: 5 
  }, 
  icon: {
      width: 150,
      height: 150
    },
    temp: {
      fontSize: 75,
      color: '#6d440e',
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
    <View style={styles.topContainer}>
      {/* Récupération de l'image correspondant à la météo */}
       <Image 
      source={{ uri: icon }} 
      style={styles.icon}
      />
      <View>
        {/* Description de la météo */}
        <Text>{meteoActuelle?.weather[0].description}</Text>
        {/* Récupération température arrondie */}
        <Text style={styles.temp}>{Math.round(meteoActuelle?.main.temp)}°C</Text>
      </View>
    </View>
    )
}