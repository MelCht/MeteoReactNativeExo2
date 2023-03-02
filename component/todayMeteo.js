import { useEffect, useState } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { isSameDay } from "date-fns";

const styles = StyleSheet.create({
    icon: {
      width: 150,
      height: 150
    }
  });
  
  export default function Meteo(props) {
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
      {/* Récupération de l'image correspondant à la météo */}
       <Image 
      source={{ uri: icon }} 
      style={styles.icon}
      />
      {/* Récupération température arrondie */}
      <Text>{Math.round(meteoActuelle?.main.temp)}°C</Text>
      {/* Description de la météo */}
      <Text>{meteoActuelle?.weather[0].description}</Text>
    </>
    )
}