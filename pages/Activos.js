import React,{useEffect}from 'react';
import {View} from 'react-native'
import { useSelector } from 'react-redux';
export const Activos = ()=>{
    const computer = useSelector((store)=>store.app.computer)
    useEffect(()=>{
            console.log(computer)
        
    })
    return <View></View>
}