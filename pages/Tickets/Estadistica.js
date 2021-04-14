import React, { useState, useEffect } from 'react';
import { View, SectionList, StyleSheet, StatusBar, Text, SafeAreaView, ScrollView } from 'react-native';
import { strtotime } from '../../redux/strtotime';
import { Icon } from 'react-native-elements'


export const EstadisiticaPeticion = ({ navigation, route }) => {
  const { ticket } = route.params;
  const date = require('strtotime');





  const [dataS, setData] = useState({
    title: "Fechas",
    data: [{
      date: 'fecha',
      title: 'Tiempo interno de respuesta',
      icon: 'check-circle',
      type: 'font-awesome-5',
      final: false,
      color:'#696969',
      bg:'#696969',
      txtcolor:'black'


    }]
  })

  useEffect(() => {
    let array = []


    array.push({
      date: ticket.date,
      title: 'Fecha de apertura',
      icon: 'asterisk',
      type: 'font-awesome-5',
      final: false,
      color:'white',
      bg:'#696969',
      txtcolor:'black'

    })

    if (ticket.internal_time_to_own || ticket.internal_time_to_own !== '') {

      array.push({
        date: ticket.internal_time_to_own,
        title: 'Tiempo interno de respuesta',
        icon: 'check-circle',
        type: 'font-awesome-5',
        final: false,
        color:'red',
        bg:'white',
        txtcolor:'red'



      })
    }
    if (ticket.time_to_own || ticket.time_to_own != '') {
      array.push({
        date: ticket.time_to_own,
        title: 'Tiempo de respuesta',
        icon: 'check-circle',
        type: 'font-awesome-5',
        final: false,
        color:'red',
        bg:'white',
        txtcolor:'red'



      })
    }
    if (ticket.date_creation || ticket.date_creation != null) {
      array.push({
        date: ticket.date_creation,
        title: 'A tener en cuenta',
        icon: 'check-circle',
        type: 'font-awesome-5',
        final: false,
        color:'white',
        bg:'#696969',
        txtcolor:'black'



      })
    }
    if (ticket.solvedate || ticket.solvedate != '') {
      array.push({
        date: ticket.solvedate,
        title: 'Fecha de resolución',
        icon: 'check-circle',
        type: 'font-awesome-5',
        final: false,
        color:'white',
        bg:'#696969',
        txtcolor:'black'



      })
    }

    if (ticket.closedate || ticket.closedate != '') {
      array.push({
        date: ticket.closedate,
        title: 'Fecha de cierre',
        icon: 'flag',
        type: 'font-awesome-5',
        final: true,
        color:'white',
        bg:'#696969',
        txtcolor:'black'



      })
    }

    setData({ title: 'Fechas', data: array })


  }, [])

  const Item = ({ date, descripcion, icono, tipo, val, color, bg, textcolor }) => (
    <View style={{ marginTop: 0, flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>


      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            backgroundColor: bg, borderRadius: 30, marginLeft: -10,
            alignContent: 'center', justifyContent: 'center', height: 30
          }}>
            <Icon
              type={tipo}
              name={icono}
              color={color}
              size={!val ? 30 : 20}
              style={{
                zIndex: 2, padding: 2
              }} />
          </View>
        </View>
        {
          !val ? (
            <View style={{
              zIndex: -1,
              margin: 0,
              paddingTop: -10,
              marginTop: -10,
              marginBottom: -20,
              paddingRight: 10,
              borderStyle: 'dotted',
              height: 100,
              borderLeftWidth: 10,
              borderColor: '#696969'
            }} />
          ) : (null)
        }


      </View>
      {
        !val ? (
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: -55, paddingLeft: 10 }}>
            <Text style={{color:textcolor}}>{date}</Text>
            <Text style={{color:textcolor}}>{descripcion}</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 0, paddingLeft: 10 }}>
            <Text style={{color:textcolor}}>{date}</Text>
            <Text style={{color:textcolor}}>{descripcion}</Text>
          </View>
        )
      }

    </View>

  );

  return (
    <SafeAreaView>
      <ScrollView>

        {
          dataS ? (<>
            <View style={{ paddingBottom: 30 }}>
              <Text style={{ fontSize: 25, padding: 10 }}>{dataS.title}</Text>
            </View>
            {
              dataS.data.map((item, l) => (
                item.date ? (
                  <Item
                    key={l}
                    date={item.date}
                    descripcion={item.title}
                    icono={item.icon}
                    tipo={item.type}
                    val={item.final}
                    color={item.color}
                    bg={item.bg}
                    textcolor={item.txtcolor}
                  ></Item>) : (null)
              ))
            }

          </>) : (null)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

