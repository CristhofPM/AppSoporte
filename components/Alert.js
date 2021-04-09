import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View } from 'react-native';


export const Alerta = ({title,descripcion})=>{
    const [visible,setVisible] = useState(true)
    const toggleOverlay = ()=>{
        setVisible(!visible)
    }
    return(
        <Overlay isVisible={visible}  onPress={toggleOverlay} >
            <View>
                <Text>{title}</Text>
                <Text>{descripcion}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Button title="Aceptar" ></Button>
            </View>
        </Overlay>
    )
}