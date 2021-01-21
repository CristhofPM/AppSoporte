import React, { useEffect } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements'
import { getItem } from '../redux/app'
import { Alert } from 'react-native';
export const Inicio = ({navigation}) => {
    const auth = useSelector((store) => store.app.session.session_token)
    const server = useSelector((store) => store.app.session.server)
    const dispatch = useDispatch()
    useEffect(() => {

        


    })

    const enterActives = ()=>{
       /* if(fullsession){
                let array = fullsession.session.glpiactiveprofile.helpdesk_item_type;
                array.forEach(element => {
                    dispatch(getItem(element,server,auth))
                });
                navigation.navigate('Activos')
            
        }*/
    }
    return (
        <View style={{ padding: 5, flexDirection: 'row' }}>
            <TouchableHighlight onPress={() => enterActives()} style={{ backgroundColor: '#ffffff' }}>

                <Card containerStyle={{ padding: 10, backgroundColor: '#9EC9F0', borderRadius: 10, width: 150 }} >
                    <Card.Image source={require('../assets/ayudar.png')} style={{ height: 100, width: 100 }}>
                    </Card.Image>
                    <View style={{ flex: 0, alignItems: 'center', margin: 10 }}>
                        <Text h4 style={{ color: '#FFFFFF' }} > Soporte</Text>
                    </View>
                </Card>
            </TouchableHighlight>

            <TouchableHighlight>
                <Card containerStyle={{ padding: 10, backgroundColor: '#9EC9F0', borderRadius: 10, width: 150 }} >
                    <Card.Image source={require('../assets/dispositivo.png')} style={{ height: 100, width: 100 }}>
                    </Card.Image>
                    <View style={{ flex: 0, alignItems: 'center', margin: 10 }}>
                        <Text h4 style={{ color: '#FFFFFF' }}> Activos</Text>
                    </View>
                </Card>
            </TouchableHighlight>

        </View>

    )
}