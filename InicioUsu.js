import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Inicio } from './pages/Inicio'
import { Activos } from './pages/Activos';
import {  NavigationInside} from './NavigationInside';
import { NuevaPeticion } from './pages/NuevaPeticion';
import { Planificacion } from './pages/Planificacion';
import { Problemas } from './pages/Problemas';
import { Recurrente } from './pages/Recurrentes';
import { Cambios } from './pages/Cambios'
import { Estadisticas } from './pages/Estadisiticas'
import { getItem,killsession } from './redux/app'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { Avatar, Overlay,Button } from 'react-native-elements'
const Drawer = createDrawerNavigator();

export const InicioUsu = () => {
    const auth = useSelector((store) => store.app.session.session_token)
    const server = useSelector((store) => store.app.session.server)
    const val = useSelector((store) => store.app.val)
    const profiles = useSelector((store) => store.app.profiles)
    const dispatch = useDispatch()
    const [va, setVa] = useState(true)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (auth) {
            const getItemF = async () => {
                if (profiles) {
                    profiles.helpdesk_item_type.map(e => {

                        dispatch(getItem(e, server, auth))
                    })
                    dispatch(getItem('itilcategory', server, auth))
                    dispatch(getItem('user', server, auth))
                    dispatch(getItem('group', server, auth))
                    dispatch(getItem('Supplier', server, auth))
                    dispatch(getItem('state', server, auth))
                    dispatch(getItem('RequestType', server, auth))
                    dispatch(getItem('Location', server, auth))
                    dispatch(getItem('Ticket', server, auth))

                }
            }


            getItemF()

        }
        if (val) {
            setVa(val)
        }

    }, [profiles,server,auth])

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const cerrar=()=>{
        dispatch(killsession(auth,server))
    }

    return (
        <>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                <Text>Hello from Overlay!</Text>
                <Button title='Cerrar sesión' onPress={()=>cerrar()} ></Button>
                </View>
            </Overlay>
            <Drawer.Navigator initialRouteName='Peticiones' screenOptions={{
                headerShown: true, headerRight: () => (
                    <Avatar rounded icon={{ name: 'person', color: 'black' }} onPress={() => setVisible(true)} />

                ), headerStyle: { backgroundColor: '#9EC9F0' }, headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
            }}>

                <Drawer.Screen name='Peticiones' component={NavigationInside}></Drawer.Screen>
                <Drawer.Screen name='Nueva Peticion' component={NuevaPeticion}></Drawer.Screen>
                <Drawer.Screen name='Planificacion' component={Planificacion}></Drawer.Screen>
                <Drawer.Screen name='Problemas' component={Problemas}></Drawer.Screen>
                <Drawer.Screen name='Peticiones Recurrentes' component={Recurrente}></Drawer.Screen>
                <Drawer.Screen name='Cambios' component={Cambios}></Drawer.Screen>
                <Drawer.Screen name='Estadisticas' component={Estadisticas}></Drawer.Screen>
            </Drawer.Navigator>
        </>
    )
}