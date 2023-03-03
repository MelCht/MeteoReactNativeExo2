import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { format } from "date-fns";
import { fr } from 'date-fns/locale'
import Meteo from './meteo';

const styles = StyleSheet.create({
 ligne: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3%',
  height: 75,
  width: '100%',
  marginLeft: '3%'
 },
  day: {
    marginTop: '3%',
    marginLeft: '3%'
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
    <>
      {prevision.map(p => (
        <View>
          <View>
            <Text style={styles.day}>{p.day.toUpperCase()}</Text>
          </View>
          <ScrollView 
          horizontal
          style={styles.ligne}>
            {p.data.map(m => <Meteo prev={m} />)}
          </ScrollView>
        </View>
      ))}
      </>
  )
}