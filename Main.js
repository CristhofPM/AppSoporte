import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import {InicioUsu} from './InicioUsu'
import { useDispatch, useSelector } from 'react-redux';

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

export const Main = () => {
    const [isAuth, setAuth] = useState(false)
    const auth = useSelector((store) => store.app.session.session_token)

    useEffect(() => {
        if (auth !== '') {
            setAuth(true)
           


        }


    })
    return (
        <NavigationContainer >
                {
                    !isAuth ? (
                        <Stack.Navigator initialRouteName='Login'>

                        <>
                            <Stack.Screen name='Login' component={Login} options={MyTheme}></Stack.Screen>
                        </>           
                        </Stack.Navigator>

                    ) : (
                       
                        <InicioUsu></InicioUsu>
                        )
                }

        </NavigationContainer >

    )
}