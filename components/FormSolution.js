import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Button } from 'react-native-elements';
import {itemForm,TICKET_SOLUTION} from '../redux/tickets'

export const FormSolution = ({ richText, id }) => {
    const { solutionTemplate, solutiontype } = useSelector((store) => store.ticket);
    const name = useSelector((store) => store.app.fullsession)
    const session= useSelector((store)=>store.app.session)

    const  dispatch = useDispatch()

    //items
    const [templates, setTemplate] = useState([{ label: 'Buscando...', value: 0 }])
    const [solType, setSolType] = useState([{ label: 'Buscando...', value: 0 }])
    //form
    const [templateValue, setTemplateValue] = useState(0)
    const [solTypeValue, setSolTypeValue] = useState(0)
    const [content, setContent] = useState('')

    
    useEffect(() => {
        const json = async () => {
            if (solutionTemplate != undefined) {
                let arrayTemplates = []
                solutionTemplate.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arrayTemplates.push(obj)
                });
                setTemplate(arrayTemplates)
            }
            if (solutiontype != undefined) {
                let arraySolType = []
                solutiontype.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arraySolType.push(obj)
                });
                setSolType(arraySolType)
            }
        }
        json()
    }, [solutionTemplate, solutiontype, name, session])


    const editorInitializedCallback = () => {
        richText.current?.registerToolbar(function (items) {
        });
    }

    const SaveSolution = () => {
        var f=new Date();

        if (content !== '' && name.glpiID!==undefined) {
            let raw = JSON.stringify({
                "input": {
                    "itemtype": "Ticket",
                    "solutiontypes_id": 0,
                    "solutiontype_name": null,
                    "content": content,
                    "date_creation": `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`,
                    "date_mod": `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`,
                    "date_approval": null,
                    "users_id": name.glpiID,
                    "user_name": null,
                    "users_id_editor": 0,
                    "users_id_approval": 0,
                    "user_name_approval": null,
                    "status": 2,
                    "itilfollowups_id": null,
                }
            })
            dispatch(itemForm(raw, session.server, session.session_token, 'Ticket/' + id + '/ITILSolution', session.app_token, session.valTok, 'post',TICKET_SOLUTION))

        } else {

        }
    }
    return (
        <View>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ backgroundColor: '#E0E0E0', padding: 20, flexDirection: 'row' }}>
                    <Text>Nuevo elemento - Tarea de una petición</Text>
                </View>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Text>Plantilla de solución	</Text>
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
                            value: templateValue,
                            color: 'blue'
                        }}
                        onValueChange={text => setTemplateValue(text)}
                        items={templates}
                        value={templateValue}
                    />
                    <Text>Tipo de solución</Text>
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
                        key='Tipo'
                        placeholder={{
                            label: '----------',
                            value: solTypeValue,
                            color: 'blue'
                        }}
                        onValueChange={text => setSolTypeValue(text)}
                        items={solType}
                        value={solTypeValue}
                    />
                </View>
                <Text style={{ padding: 10 }}>Descripción</Text>
                <KeyboardAvoidingView key='TaskEditor' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.undo,
                            actions.redo,
                            actions.setStrikethrough,
                            actions.checkboxList,
                            actions.insertOrderedList,
                            actions.blockquote,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                            actions.code,
                            actions.line,
                            actions.heading1,
                            actions.heading4
                        ]}
                    />
                </KeyboardAvoidingView>
                <View style={{ marginBottom: 20, padding: 10 }}>
                    <RichEditor
                        ref={richText}
                        onChange={t => setContent(t)}
                        style={{ height: 200, borderWidth: 1, borderRadius: 5 }}
                        editorInitializedCallback={editorInitializedCallback}
                    />
                </View>
                <Button title='Añadir' buttonStyle={{ backgroundColor: '#FEDA90' }} onPress={()=>SaveSolution()}></Button>
            </View>
        </View>
    )
}