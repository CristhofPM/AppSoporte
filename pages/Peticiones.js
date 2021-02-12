import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { View, ScrollView, Text, ActivityIndicator } from "react-native"
import { ListItem, Icon } from "react-native-elements"
export const Peticiones = ({ navigation }) => {
    const peticiones = useSelector((store) => store.app.ticket)
    const config = useSelector((store) => store.app.config)
    const [load, setLoad] = useState(true)
    const [pet, setPet] = useState([])
    const [pri1, setPri1] = useState('black')
    const [pri2, setPri2] = useState('black')
    const [pri3, setPri3] = useState('black')
    const [pri4, setPri4] = useState('black')
    const [pri5, setPri5] = useState('black')
    const [pri6, setPri6] = useState('black')
    useEffect(() => {
        if (peticiones) {
            setLoad(false)
            setPet(peticiones)
        }
        if (config !== undefined) {
            if (config.cfg_glpi !== undefined) {
                setPri1(config.cfg_glpi.priority_1 || 'white')
                setPri2(config.cfg_glpi.priority_2 || 'white')
                setPri3(config.cfg_glpi.priority_3 || 'white')
                setPri4(config.cfg_glpi.priority_4 || 'white')
                setPri5(config.cfg_glpi.priority_5 || 'white')
                setPri6(config.cfg_glpi.priority_6 || 'white')
            }

        }
    }, [peticiones])
    const Icono = (estado) => {
        if (estado == 1) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='ellipse' color='green' type='ionicon' />
                <Text>Nuevo</Text>
            </View>
        } else if (estado == 2) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='ellipse-outline' color='green' type='ionicon' />
                <Text>En curso(asignada)</Text>
            </View>
        } else if (estado == 3) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='calendar-clean' color='blue' type='ionicon' />
                <Text>En curso(planificada)</Text>
            </View>
        } else if (estado == 4) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='ellipse' color='orange' type='ionicon' />
                <Text>En espera</Text>
            </View>
        } else if (estado == 5) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='ellipse-outline' color='black' type='ionicon' />
                <Text>Resuelto</Text>
            </View>
        } else if (estado == 6) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='ellipse' color='black' type='ionicon' />
                <Text>Cerrado</Text>
            </View>
        }
    }
    const IconPriority = (pri) => {
        if (pri == 1) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='square' color={pri1} type='ionicon' />
                <Text>Muy baja</Text>
            </View>
        } else if (pri == 2) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='square' color={pri2} type='ionicon' />
                <Text>Baja</Text>
            </View>
        } else if (pri == 3) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='square' color={pri3} type='ionicon' />
                <Text>Mediana</Text>
            </View>
        } else if (pri == 4) {
            return <View style={{ flexDirection: 'row' }}><Icon size={20} name='square' color={pri4} type='ionicon' /><Text>Urgente</Text></View>
        } else if (pri == 5) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='square' color={pri5} type='ionicon' />
                <Text>Muy urgente</Text>
            </View>
        } else if (pri == 6) {
            return <View style={{ flexDirection: 'row' }}>
                <Icon size={20} name='square' color={pri6} type='ionicon' />
                <Text>Mayor</Text>
            </View>
        }
    }
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ padding: 20 }}>
                {
                    load ? (<ActivityIndicator size="large" color="#9EC9F0" />) : (null)
                }
                {
                    pet.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Detalle', {
                            ticket:l
                          })}>
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.time_to_resolve}</ListItem.Subtitle>
                                {l.status !== null ? Icono(l.status) : <Text>Sin estado</Text>}
                            </ListItem.Content>
                            {IconPriority(l.priority)}
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    )
}