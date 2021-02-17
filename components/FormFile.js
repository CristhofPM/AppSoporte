import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile, clearMsjG } from '../redux/app'
export const FormFile = ({id}) => {
    const dispatch = useDispatch()
    //store
    const document_category = useSelector((store) => store.app.documentCategory)
    const session = useSelector((store) => store.app.session)
    const msj = useSelector((store) => store.app.msj);
    const fullsession= useSelector((store)=>store.app.fullsession)

    //items
    const [DocumentCategory, setDocumentCategory] = useState([{ label: 'Buscando...', value: 0 }])
    //form
    const [dcategory, setDcategory] = useState('')
    const [fileName, setFileName] = useState({ name: '', size: 0 })
    const [file, setFile] = useState(null)
    useEffect(() => {
        if (msj) {
            Alert.alert('', msj, [
                {
                    text: "Ok",
                    onPress: () => dispatch(clearMsjG()),
                    style: "cancel"
                }
            ])
        }
        const json = async () => {
            if (document_category != undefined) {
                let arrayDoc = []
                document_category.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arrayDoc.push(obj)
                });
                setDocumentCategory(arrayDoc)
            }
        }
        json()
    }, [document_category, session, msj])

    const OpenFileSystem = () => {
        const res = DocumentPicker.getDocumentAsync()
        res.then(r => {
            setFile(r)
            setFileName({ name: r.name, size: r.size })

        })
    }
    const sendData = () => {
        if (fileName.name !== '' && fileName.size !== 0 && file !== null && fullsession.glpiID!==undefined) {
            let raw = JSON.stringify({ 
                "input": { 
                    "name": "Upload", 
                    "_filename": [fileName.name],
                    "items_id": id,
                    "itemtype": "Ticket",
                    "entities_id": 0,
                    "is_recursive": 0,
                    "users_id": fullsession.glpiID,
                }
             })
            dispatch(uploadFile(file, raw, session.server, session.session_token, session.app_token, session.valTok))
        }

    }
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ backgroundColor: '#E0E0E0', padding: 20, flexDirection: 'row' }}>
                <Text>Añadir un documento</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ padding: 10 }}>Encabezado</Text>
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
                        value: dcategory,
                        color: 'blue'
                    }}
                    onValueChange={text => setDcategory(text)}
                    items={DocumentCategory}
                    value={dcategory}
                />
            </View>
            <Button title='Archivo(s) (20 MB máx.) ' buttonStyle={{ backgroundColor: 'gray' }} onPress={() => OpenFileSystem()}></Button>
            <Button title='Añadir' buttonStyle={{ backgroundColor: '#FEDA90', marginTop: 10 }} onPress={() => sendData()} ></Button>

        </View>
    )
}