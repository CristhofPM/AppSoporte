import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

export const Peticiones = () => {
    const peticiones = useSelector((store) => store.app.ticket)
    const config = useSelector((store) => store.app.config)
    const [pet, setPet] = useState([])
    const [pri1, setPri1] = useState('black')
    const [pri2, setPri2] = useState('black')
    const [pri3, setPri3] = useState('black')
    const [pri4, setPri4] = useState('black')
    const [pri5, setPri5] = useState('black')
    const [pri6, setPri6] = useState('black')

    useEffect(() => {
        if (peticiones) {
            console.log(config)
            console.log(peticiones)

            setPet(peticiones)
        }
        if (config) {
            setPri1(config.cfg_glpi.priority_1)
            setPri2(config.cfg_glpi.priority_2)
            setPri3(config.cfg_glpi.priority_3)
            setPri4(config.cfg_glpi.priority_4)
            setPri5(config.cfg_glpi.priority_5)
            setPri6(config.cfg_glpi.priority_6)

        }
    },[peticiones])

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
        <View>
            <ScrollView>
                {
                    pet.map((l, i) => (
                        <ListItem key={i} bottomDivider>
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
            <TouchableOpacity onPress={() => console.log('ss')} style={{

                position: 'absolute',
                bottom: 1,
                right: 10,
            }}>
                <View
                    style={{
                        backgroundColor: '#2CAADE',
                        width: 60,
                        height: 60,
                        borderRadius: 45,
                        alignContent:'center',
                        flexDirection:'column',
                        flex:1
                    }}
                >
                <Icon size={35} name='add' color='white' type='ionicon' style={{marginTop:10}} />
                </View>
            </TouchableOpacity>
        </View>

    )
}