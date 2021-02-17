import React, { useEffect, useState } from 'react';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { View, Text, KeyboardAvoidingView, Switch } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector,useDispatch } from 'react-redux';
import {addItem} from '../redux/app'
export const FormFollowup = ({ richText, id }) => {

    const followupTemplates = useSelector((store) => store.app.followupTemplates)
    const RequestType = useSelector((store) => store.app.RequestType)
    const session = useSelector((store) => store.app.session)
    const fullsession= useSelector((store)=>store.app.fullsession)

    //items
    const [templates, setTemplates] = useState([{ label: 'sin datos', value: 0 }])
    const [requestType, setRequestType] = useState([{ label: 'sin datos', value: 0 }])
    //form
    const [description, setDescripcion] = useState('<div></div>')
    const [elementTemplate, setElementTemplate] = useState('')
    const [requestElement, setRequestElement] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const  dispatch = useDispatch()
    useEffect(() => {
        const jsonRead = async () => {
            let arrayTemplate = [];
            if (followupTemplates != undefined) {
                followupTemplates.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayTemplate.push(obj)
                })
                setTemplates(arrayTemplate)
            }
            let arrayRequestType = [];
            if (RequestType != undefined) {
                RequestType.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayRequestType.push(obj)
                })
                setRequestType(arrayRequestType)
            }
        }

        jsonRead()
    }, [followupTemplates, RequestType, description,session,fullsession])
    const editorInitializedCallback = () => {
        richText.current?.registerToolbar(function (items) {
        });
    }

    const selectTemplate = (v) => {
        setElementTemplate(v)
        const obj = templates.find(element => element.value == v)
        if (obj != undefined) {
            setDescripcion('<div>' + obj.label + '</div>')

        }
    }

    const SendData = () => {
        var f=new Date();
        if(description!=''&& fullsession.glpiID!=undefined){
            var raw = JSON.stringify({
                "input": {
                    "itemtype": "Ticket",
                    "items_id": id,
                    "date": `${f.getFullYear()}-${f.getMonth()+1}-${f.getDate()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`,
                    "users_id": fullsession.glpiID,
                    "content": description,
                    "is_private": isEnabled?1:0,
                    "requesttypes_id": requestElement
                }
            })
            dispatch(addItem(raw,session.server,session.session_token,'Ticket/'+id+'/ITILFollowup',session.app_token,session.valTok))
        }
        
    }
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ backgroundColor: '#E0E0E0', padding: 20, flexDirection: 'row' }}>
                <Text>Nuevo elemento - Seguimiento</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Icon type='font-awesome-5' color='gray' name='reply' style={{ paddingRight: 10 }}></Icon>

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
                    key='Elementos'
                    placeholder={{
                        label: '----------',
                        value: elementTemplate,
                        color: 'blue'
                    }}
                    onValueChange={text => selectTemplate(text)}
                    items={templates}
                    value={elementTemplate}
                />

            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Icon type='font-awesome-5' color='gray' name='inbox' style={{ paddingRight: 10 }}></Icon>

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
                    key='RequestType'
                    placeholder={{
                        label: '----------',
                        value: requestElement,
                        color: 'blue'
                    }}
                    onValueChange={text => setRequestElement(text)}
                    items={requestType}
                    value={requestElement}
                />
                
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
            <Icon type='font-awesome-5' color='gray' name='lock' style={{ paddingRight: 10 }}></Icon>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <KeyboardAvoidingView key='followupEditor' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            <View style={{ marginBottom: 20 }}>
                <RichEditor
                    setContentHTML={description}
                    ref={richText}
                    onChange={t => setDescripcion(t)}
                    style={{ height: 200, borderWidth: 1, borderRadius: 5 }}
                    editorInitializedCallback={editorInitializedCallback}
                />
            </View>

            <Button title="Agregar" buttonStyle={{ backgroundColor: '#FEDA90' }} onPress={()=>SendData()}></Button>
        </View>
    )
}