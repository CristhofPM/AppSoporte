import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Inicio } from './pages/Inicio'
import { Activos } from './pages/Activos';
import { Peticiones } from './pages/Peticiones';
import {NuevaPeticion} from './pages/NuevaPeticion';
import {Planificacion} from './pages/Planificacion';
import {Problemas} from './pages/Problemas';
import {Recurrente} from './pages/Recurrentes';
import {Cambios} from './pages/Cambios'
import {Estadisticas} from './pages/Estadisiticas'
import { getProfile, getfullSession,getItem } from './redux/app'
import { useDispatch, useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

export const InicioUsu =()=>{
    const auth = useSelector((store) => store.app.session.session_token)
    const server = useSelector((store)=>store.app.session.server)
    const val = useSelector((store)=>store.app.val)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log(val)
        if(auth){
            
            dispatch(getProfile(server, auth))
            dispatch(getfullSession(server, auth))
            if(val){
                dispatch(getItem('Computer',server,auth))

            dispatch(getItem('Monitor',server,auth))
            dispatch(getItem('NetworkEquipment',server,auth))
            dispatch(getItem('Peripheral',server,auth))
            dispatch(getItem('Printer',server,auth))
            dispatch(getItem('Phone',server,auth))
            dispatch(getItem('Software',server,auth))
            dispatch(getItem('DCRoom',server,auth))
            dispatch(getItem('Rack',server,auth))
            dispatch(getItem('Enclosure',server,auth))
            dispatch(getItem('Ticket',server,auth))
            dispatch(getItem('cartridgeitem',server,auth))
            dispatch(getItem('consumableitem',server,auth))
            dispatch(getItem('pdu',server,auth))
            dispatch(getItem('passivedcequipment',server,auth))
            dispatch(getItem('Item_DeviceSimcard',server,auth))
            }
            
        }
       
    })
    return(
        <Drawer.Navigator initialRouteName='Inicio' screenOptions={
            {
              headerShown:true
            }
        }>

            <>
                <Drawer.Screen name='Inicio' component={Inicio} ></Drawer.Screen>
                <Drawer.Screen name='Peticiones' component={Peticiones}></Drawer.Screen>
                <Drawer.Screen name='Nueva Peticion' component={NuevaPeticion}></Drawer.Screen>
                <Drawer.Screen name='Planificacion' component={Planificacion}></Drawer.Screen>
                <Drawer.Screen name='Problemas' component={Problemas}></Drawer.Screen>
                <Drawer.Screen name='Peticiones Recurrentes' component={Recurrente}></Drawer.Screen>
                <Drawer.Screen name='Cambios' component={Cambios}></Drawer.Screen>
                <Drawer.Screen name='Estadisticas' component={Estadisticas}></Drawer.Screen>

            </>
            </Drawer.Navigator>
    )
}