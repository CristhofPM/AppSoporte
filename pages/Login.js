import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, Button, Alert, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsj, initSession } from '../redux/app'
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'

export const Login = () => {
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
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>

            <View style={styles.container}>
                <RNPickerSelect
                    style={{ viewContainer: styles.select }}
                    onValueChange={text => setServer(text)}
                    placeholder={{
                        label: '------',
                        value: server,
                        color: 'blue'
                    }}
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

                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => setPass(text)}
                    value={pass}
                    placeholder='Contraseña'
                />
                <View style={styles.btn}>
                    <Button

                        title="Iniciar Sesión"
                        onPress={() => sendData()}
                        disabled={load}
                    />{
                        load ? (<ActivityIndicator size="large" color="#9EC9F0" />) : (null)
                    }
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        height: 50,
        padding: 5
    },
    select: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    container: {
        width: 300
    },
    btn: {
        marginTop: 20,
        flexDirection: 'column'
    }


});