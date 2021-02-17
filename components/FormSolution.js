import React, { useEffect, useState } from 'react';
import { View, Text ,KeyboardAvoidingView} from 'react-native';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Button } from 'react-native-elements';

export const FormSolution = ({richText}) => {
    const { solutionTemplates, solutionTypes } = useSelector((store) => store.app);

    //items
    const [templates, setTemplate] = useState([{ label: 'Buscando...', value: 0 }])
    const [solType, setSolType] = useState([{ label: 'Buscando...', value: 0 }])
    //form
    const [templateValue, setTemplateValue] = useState(0)
    const [solTypeValue,setSolTypeValue]=useState(0)
    useEffect(() => {
        const json = async () => {
            if (solutionTemplates != undefined) {
                let arrayTemplates = []
                solutionTemplates.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id,
                        key: element.id
                    }
                    arrayTemplates.push(obj)
                });
                setTemplate(arrayTemplates)
            }
            if(solutionTypes!=undefined){
                let arraySolType=[]
                solutionTypes.forEach(element => {
                    const obj ={
                        label:element.name,
                        value:element.id,
                        key:element.id
                    }
                    arraySolType.push(obj)
                });
                setSolType(arraySolType)
            }
        }
        json()
    }, [solutionTemplates, solutionTypes])
    const editorInitializedCallback = () => {
        richText.current?.registerToolbar(function (items) {
        });
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
                <Text style={{padding:10}}>Descripción</Text>
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
            
            <View style={{ marginBottom: 20,padding:10 }}>
                <RichEditor
                    ref={richText}
                    onChange={t => console.log(t)}
                    style={{ height: 200, borderWidth: 1, borderRadius: 5 }}
                    editorInitializedCallback={editorInitializedCallback}
                />
            </View>
            <Button title='Añadir' buttonStyle={{backgroundColor:'#FEDA90'}} ></Button>
            </View>
        </View>
    )
}