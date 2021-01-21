import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Login} from './pages/Login';
import {Inicio} from './pages/Inicio'
import {Activos} from './pages/Activos';
import {getProfile,getfullSession} from './redux/app'
import { Avatar } from 'react-native-elements';
const Stack = createStackNavigator();
const MyTheme = {
    headerStyle: {
        backgroundColor: '#9EC9F0'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
};

export const Main = ()=>{
    const auth = useSelector((store)=>store.app.session.session_token)
    const server = useSelector((store)=>store.app.session.server)
    const {profiles,session,fullsession} = useSelector((store)=>store.app)
    const [isAuth,setAuth] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(auth!==''){
            setAuth(true)
            dispatch(getProfile(server,auth))
            dispatch(getfullSession(server,auth))
            
            
        }

        
    })
    return(
        <NavigationContainer >
        <Stack.Navigator initialRouteName='Login'>
            {
                !isAuth  ? (
                    <>
                    <Stack.Screen name='Login' component={Login} options={MyTheme}></Stack.Screen>
                    </>
                ):(
                    <>
                    <Stack.Screen name='Inicio'  component={Inicio} options={{
                         headerStyle: {
                            backgroundColor: '#9EC9F0'
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                        },
                            headerRight: () => (
                                <Avatar rounded icon={{name: 'user', type: 'font-awesome'}}   overlayContainerStyle={{backgroundColor: 'black'}}
                                />
                            )
                        }}></Stack.Screen>
                        <Stack.Screen name="Activos" component={Activos}></Stack.Screen>
                    </> 
                )
            }

        </Stack.Navigator>
        </NavigationContainer >

    )
}