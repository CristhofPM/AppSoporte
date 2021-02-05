import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, Button, Alert, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsj, initSession } from '../redux/app'
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'
import { CheckBox } from 'react-native-elements';

export const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [server, setServer] = useState('');
    const [check,setCheck]=useState(false)
    const [load, setLoad] = useState(null);
    const [app_token,setApp_token]=useState('')
    
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


    },[user,pass,server,check,app_token])
    const sendData = () => {
        setLoad(true)
        if (user !== '' || !user && pass !== '' || !pass && server !== '' || !server) {
            dispatch(initSession(user, pass, server,app_token,check))
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
                <TextInput
                    style={styles.input}
                    onChangeText={text => setServer(text)}
                    value={server}
                    placeholder='http://glpi.com'
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
                <View style={{flexDirection:'row'}}>
                <CheckBox checked={check} onPress={()=>setCheck(!check)}>

                </CheckBox>
                <Text>App Token</Text>
                </View>
                {
                    check ? <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => setApp_token(text)}
                    value={app_token}
                    placeholder='App token'
                />:null
                }
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