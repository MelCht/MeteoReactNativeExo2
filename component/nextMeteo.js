import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { format } from "date-fns";
import { fr } from 'date-fns/locale'
import Meteo from './meteo';

const styles = StyleSheet.create({
  width: {
    width: '17%'
  }
});
    
  export default function NextMeteo(props) {
    const {data} = props;
    const [prevision, setPrevision] = useState([])

      // Récupération des données que je veux affichée ; jour, heure, température et icone
      useEffect(() => {
        const previsionsData = data.list.map(p => {
          const date = new Date(p.dt * 1000)
          return ({
            date: date,
            hour: date.getHours(),
            temp: Math.round(p.main.temp),
            icon: p.weather[0].icon,
            day: format(date, 'EEEE', { locale:fr })
          })
        })

        // Eviter les doublons de nom de jours
        // Récupérer dans un tableau juste les noms des jours
        let newPrevisionsData = previsionsData.map(prevision => {
          return prevision.day
        }).filter((dayName, index, self) => {

          // Utilisation de filter pour supprimer les doublons
          return self.indexOf(dayName) === index
        }).map((dayName) => {
          // Création de l'objet avec les doublons en moins
          return {
            day: dayName,
            data: previsionsData.filter((prevision) => prevision.day === dayName)
          }
        })
        setPrevision(newPrevisionsData)
      }, [data])

  return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    
    >
      {prevision.map(p => (
        <View style={styles.width}>
          <Text>{p.day}</Text>
          {p.data.map(m => <Meteo prev={m} />)}
        </View>
      ))}
    </ScrollView>
  )
}