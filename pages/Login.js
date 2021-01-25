import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, Button, Alert, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsj, initSession } from '../redux/app'
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'

export const Login = ( ) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [server, setServer] = useState('');
    const [load, setLoad] = useState(null);
    const msj = useSelector((store) => store.app.error);
    const session_token = useSelector((store) => store.app.session.session_token)
    const dispatch = useDispatch()

    useEffect(() => {
        if (msj) {
            setLoad(false)
            Alert.alert('Error', msj, [
                {
                    text: "Ok",
                    onPress: () => dispatch(clearMsj()),
                    style: "cancel"
                }
            ])
        }
        

    })
    const sendData = () => {
        setLoad(true)
        if (user !== '' || !user && pass !== '' || !pass && server !== '' || !server) {
            dispatch(initSession(user, pass, server))
        } else {
            Alert.alert('Completa todos los campos')

        }
    }
    return (
        <View style={{
            flexDirection: "column",
            height: 100,
            padding: 20
        }}>


            <RNPickerSelect
                onValueChange={text => setServer(text)}
                items={[
                    { label: 'Server Prueba', value: 'https://workana.with6.glpi-network.cloud' },
                    
                ]}
                value={server}
                
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setUser(text)}
                value={user}
                placeholder='Usuario'
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setPass(text)}
                value={pass}
                placeholder='Contraseña'
            />
            <Button
                title="Iniciar Sesión"
                onPress={() => sendData()}
                disabled={load}
            />{
                load ? (<ActivityIndicator size="large" color="#00ff00" />) : (null)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    }

});