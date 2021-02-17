import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';

export const FormValidation = () => {
    const name = useSelector((store) => store.app.fullsession)
    const users = useSelector((store) => store.app.user)
    const group = useSelector((store) => store.app.group)
    //item
    const [user, setUser] = useState('...')
    const [usersItem, setUsersItem] = useState([{ label: 'Buscando...', value: 0 }])
    const [groupItem, setGroupItem] = useState([{ label: 'Buscando...', value: 0 }])

    //form
    const [type, setType] = useState(0)
    const [validatorTypeId, setValidatorTypeId] = useState(0)
    const [comentario, setComentario] = useState('')
    useEffect(() => {

        const json = async () => {
            if (users != undefined) {
                let arrayUsers = []
                users.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arrayUsers.push(obj)
                });
                setUsersItem(arrayUsers)
            }
            if (group != undefined) {
                let arrayGroup = [];
                group.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arrayGroup.push(obj)
                });
                setGroupItem(arrayGroup)
            }
        }
        json()
        if (name.glpiname != undefined) {
            setUser(name.glpiname)
        }
    }, [name, users, group])
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ backgroundColor: '#E0E0E0', padding: 20, flexDirection: 'row' }}>
                <Text>Nuevo elemento - Validación</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text>Solicitante de la validación</Text>
                <Text style={{ marginLeft: 20 }}>{user}</Text>
            </View>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <Text>Responsable de validación</Text>
                <RNPickerSelect
                    style={{
                        viewContainer: {
                            width: 200,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            color: 'black',
                            marginBottom: 10
                        }
                    }}
                    key='Templates'
                    placeholder={{
                        label: '----------',
                        value: type,
                        color: 'blue'
                    }}
                    onValueChange={text => setType(text)}
                    items={
                        [{ label: '------', value: 0 }, { label: 'Usuario', value: 1 }, { label: 'Grupo', value: 2 }]
                    }
                    value={type}
                />
                {
                    type !== 0 ? (
                        <RNPickerSelect
                            style={{
                                viewContainer: {
                                    width: 200,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 5,
                                    color: 'black',
                                    marginBottom: 10
                                }
                            }}
                            key='Validator'
                            placeholder={{
                                label: '----------',
                                value: validatorTypeId,
                                color: 'blue',
                                inputLabel: validatorTypeId
                            }}
                            onValueChange={text => setValidatorTypeId(text)}
                            items={type === 1 ? usersItem : groupItem}
                            value={validatorTypeId}
                        />
                    ) : null
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text>Comentarios</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            color: 'black',
                            marginBottom: 10,
                            textAlignVertical: 'top',
                            padding: 10
                        }}

                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setComentario({ text })}
                        value={comentario} />
                    <Button title='Añadir' buttonStyle={{backgroundColor:'#FEDA90',marginTop:10}} ></Button>
                </View>
            </View>
        </View>
    )
}