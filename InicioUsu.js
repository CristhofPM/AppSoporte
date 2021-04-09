import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationInside } from './NavigationInside';

import { NuevaPeticion } from './pages/NuevaPeticion';
import { Planificacion } from './pages/Planificacion';
import { Problemas } from './pages/Problemas';
import { Recurrente } from './pages/Recurrentes';
import { Cambios } from './pages/Cambios'
import { Estadisticas } from './pages/Estadisiticas'


import { killsession, searchVal, getItem, USER, REQUESTTYPE } from './redux/app'
import { 
    getItemTicket, TICKETS, 
    FOLLOWUPTEMPLATE, TASKTEMPLATE, 
    DOCUMENTCATEGORY, SOLUTIONTEMPLATE, 
    SOLUTION_TYPE 
} from './redux/tickets'

import { useDispatch, useSelector } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { Avatar, Overlay, Button, Icon } from 'react-native-elements'
const Drawer = createDrawerNavigator();

export const InicioUsu = () => {
    const auth = useSelector((store) => store.app.session.session_token)
    const server = useSelector((store) => store.app.session.server)
    const search_val = useSelector((store) => store.app.valSearch);
    const profiles = useSelector((store) => store.app.profiles)
    const token_app = useSelector((store) => store.app.session.app_token)
    const countTicket = useSelector((store) => store.app.countTicket)
    const valTok = useSelector((store) => store.app.session.valTok)

    const dispatch = useDispatch()
    const [va, setVa] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVa(search_val)
        if (auth) {
            const getItemF = async () => {
                if (profiles && countTicket) {
                    dispatch(getItemTicket('Ticket', server, auth, '0-10', false, token_app, valTok, TICKETS))
                    dispatch(getItem('User', server, auth, 0, false, token_app, valTok, USER))
                    dispatch(getItem('requesttype', server, auth, 0, false, token_app, valTok, REQUESTTYPE))
                    dispatch(getItemTicket('taskTemplate', server, auth, null, false, token_app, valTok, TASKTEMPLATE))
                    dispatch(getItemTicket('itilfollowuptemplate', server, auth, null, false, token_app, valTok, FOLLOWUPTEMPLATE))
                    dispatch(getItemTicket('documentcategory', server, auth, null, false, token_app, valTok, DOCUMENTCATEGORY))
                    dispatch(getItemTicket('solutiontemplate', server, auth, null, false, token_app, valTok, SOLUTIONTEMPLATE))
                    dispatch(getItemTicket('solutiontype', server, auth, null, false, token_app, valTok, SOLUTION_TYPE))

                }
            }
            getItemF()
        }

    }, [profiles, server, auth, countTicket])


    const toggleOverlay = () => {
        setVisible(!visible);
    }


    const cerrar = () => {
        dispatch(killsession(auth, server, valTok, token_app))
    }


    const cerrarSearchBar = () => {
        setVa(!va)
        dispatch(searchVal(va))

    }


    return (
        <>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View>
                    <Text>Hello from Overlay!</Text>
                    <Button title='Cerrar sesión' onPress={() => cerrar()} ></Button>
                </View>
            </Overlay>
            <Drawer.Navigator initialRouteName='Peticiones' screenOptions={{
                headerShown: true, headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            containerStyle={{ paddingTop: 5, paddingRight: 10 }}
                            style={{ paddingTop: 20 }}
                            size={20}
                            name='search'
                            type='font-awesome'
                            color='black'
                            onPress={() => cerrarSearchBar()} />
                        <Avatar rounded icon={{ name: 'person', color: 'black', size: 25 }} onPress={() => setVisible(true)} />
                    </View>
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