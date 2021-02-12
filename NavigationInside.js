import React, { useEffect } from 'react';
import { DetallePeticion } from './pages/DetallePeticion'
import { createStackNavigator } from '@react-navigation/stack';
import { Peticiones } from './pages/Peticiones';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Seguimiento} from './pages/Tickets/Seguimiento' 
import {Caso} from './pages/Tickets/Caso';
import {EstadisiticaPeticion} from './pages/Tickets/Estadistica'
import {Aprobaciones} from './pages/Tickets/Aprobaciones'
import {BaseConocimiento} from './pages/Tickets/BaseConocimiento'
import {Elementos} from './pages/Tickets/Elementos'
import {Costos} from './pages/Tickets/Costos'
import {Proyectos} from './pages/Tickets/Proyectos'
import {TareaProyectos} from './pages/Tickets/TareaProyectos'
import {ProblemasPeticion} from './pages/Tickets/ProblemasPeticion'
import {Cambios} from './pages/Tickets/Cambios'
import {Historico} from './pages/Tickets/Historico'
import {Todo} from './pages/Tickets/Todo'
import { useSelector } from 'react-redux';
const InicioStack = createStackNavigator();


export const NavigationInside = () => {
    const session= useSelector((store)=>store.app.fullsession)
    useEffect(() => {
        console.log(session)
    }, [])
    return (
        <InicioStack.Navigator screenOptions={{headerShown:false}}  initialRouteName="Peticiones">
            <InicioStack.Screen name="Peticiones" component={Peticiones}/>
            <InicioStack.Screen name="Detalle" component={DetallePeticion} />
            <InicioStack.Screen name='Seguimiento' component={Seguimiento}/>
            <InicioStack.Screen name='Caso' component={Caso}/>
            <InicioStack.Screen name='Estadisticas Peticion' component={EstadisiticaPeticion}/>
            <InicioStack.Screen name='Aprobaciones' component={Aprobaciones}/>
            <InicioStack.Screen name='Base de conocimiento' component={BaseConocimiento}/>
            <InicioStack.Screen name='Elementos' component={Elementos}/>
            <InicioStack.Screen name='Costos' component={Costos}/>
            <InicioStack.Screen name='Proyectos' component={Proyectos}/>
            <InicioStack.Screen name='Tareas de Proyecto' component={TareaProyectos}/>
            <InicioStack.Screen name='Problemas Peticion' component={ProblemasPeticion}/>
            <InicioStack.Screen name='Cambios' component={Cambios}/>
            <InicioStack.Screen name='Histórico' component={Historico}/>
            <InicioStack.Screen name='Todo' component={Todo}/>

        </InicioStack.Navigator>
    )
}