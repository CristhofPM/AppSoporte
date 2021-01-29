import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Divider, Icon, ListItem, } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import { actions, RichEditor,RichToolbar } from 'react-native-pell-rich-editor'
export const NuevaPeticion = () => {
    const richText = React.createRef();

    const { category, user, group, supplier, RequestType, Location } = useSelector((store) => store.app)
    //categoria api
    const [cat, setCat] = useState([{ label: 'Sin datos', value: 0 }])
    //usuarios api
    const [users, setUsers] = useState([{ label: 'Sin datos', value: 0 }])
    //grupos api
    const [groupS, setGroupS] = useState([{ label: 'Sin datos', value: 0 }])
    //supplier api
    const [suppl, setSuppl] = useState([{ label: 'Sin datos', value: 0 }])
    //request type api
    const [requestType, setRequestType] = useState([{ label: 'Sin datos', value: 0 }])
    //urgencia y prioridad
    const urg = [
        { label: 'Muy baja', value: 1 },
        { label: 'Baja', value: 2 },
        { label: 'Mediana', value: 3 },
        { label: 'Urgente', value: 4 },
        { label: 'Muy Urgente', value: 5 },
        { label: 'Mayor', value: 6 }
    ]
    //tiempo duracion
    const [timer, setTimer] = useState([])
    const time = async () => {
        let array = []
        let count = (386 - 91) * 5;
        for (let i = 0; i < 11; i++) {
            if (i == 10) {
                array.push({ label: `0h${i}`, value: 60 * i })
            } else {
                array.push({ label: `0h0${i}`, value: 60 * i })
            }
        }
        let count1 = 0;
        let hour = 0;
        let min = 0;
        /*for (let index = 15; index < 55; index++) {
            console.log(index)
            min = index+5;
            count1++;
            if(count1==13){
                hour++;
                count1=0;
                min=+5;
                
            }
            array.push({label:`${hour}h${min}`,value:60*min}) 
        }*/
        return array;
    }


    //Location api
    const [locat, setLocat] = useState('')

    //Fecha de Apertura	
    const [dateApertura, setDateApertura] = useState(new Date(1598051730000));
    const [showApertura, setShowApertura] = useState(false);
    //Tiempo para adueñarse
    const [showTa, setShowTa] = useState(false)
    const [dateTa, setDateTa] = useState(new Date(1598051730000));
    //Tiempo interno para apropiarse	
    const [showApr, setShowApr] = useState(false);
    const [dateApr, setDateApr] = useState(new Date(1598051730000));

    const [mode, setMode] = useState('date');

    //tipo
    const [tipo, setTipo] = useState(1)
    //Tiempo de solución
    const [dateSol, setDateSol] = useState(new Date(1598051730000));
    const [showSol, setShowSol] = useState(false);

    //Tiempo interno para resolver	
    const [dateIn, setDateIn] = useState(new Date(1598051730000))
    const [showIn, setShowIn] = useState(false)

    //categoria
    const [categoria, setCategoria] = useState('');
    //solicitante
    const [solicitante, setSolicitante] = useState('')
    const [solicitanteGroup, setSolicitanteGroup] = useState('')
    //observador
    const [observador, setObservador] = useState('')
    const [groupOb, setGroupOb] = useState('')
    //Asignado a:
    const [asignado, setAsignado] = useState('');
    const [aSuppl, setASuppl] = useState('')
    //Estado
    const [est, setEst] = useState('')
    //Request type //Fuente solicitante	
    const [rt, setRt] = useState('')
    //Urgencia
    const [urgen, setUrgen] = useState('')
    //Impacto
    const [im, setIm] = useState('');
    //prioridad
    const [prio, setPrio] = useState('')
    //ubicacion
    const [loc, setLoc] = useState('')
    //total duracion
    const [totalD, setTotal] = useState(0)
    //titulo
    const [titulo, setTitulo] = useState('')
    useEffect(() => {

        const json = async () => {
            let array = []
            if (category) {
                category.forEach(element => {
                    const obj = {
                        label: element.name,
                        value: element.id
                    }
                    array.push(obj)
                });
            }
            setCat(array)
            let arrayU = []
            if (user !== undefined) {
                user.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayU.push(obj)
                })
            }
            setUsers(arrayU)
            let arrayG = []
            if (group !== undefined) {
                group.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id,

                    }
                    arrayG.push(obj)
                })
            }
            setGroupS(arrayG)
            let arrayS = []
            if (supplier !== undefined) {
                supplier.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayS.push(obj)
                })
            }
            setSuppl(arrayS)
            let arrayReTy = []
            if (RequestType !== undefined) {
                RequestType.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayReTy.push(obj)
                })
            }

            setRequestType(arrayReTy)
            let arrayLo = []
            if (Location !== undefined) {
                Location.forEach(e => {
                    const obj = {
                        label: e.name,
                        value: e.id
                    }
                    arrayLo.push(obj)
                });
            }

            setLocat(arrayLo)
        }

        json()

    }, [category, user, group, supplier, RequestType, Location])
    //editor
    const editorInitializedCallback = () => {
        richText.current?.registerToolbar(function (items) {
            // console.log('Toolbar click, selected items (insert end callback):', items);
        });
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateApertura;
        setShowApertura(false)
        setDateApertura(currentDate);
    };
    const onChangeTa = (event, selectedDate) => {
        const currentDate = selectedDate || dateTa;
        setShowTa(false)
        setDateTa(currentDate);
    };
    const onChangeApr = (event, selectedDate) => {
        const currentDate = selectedDate || dateApr;
        setShowApr(false)
        setDateApr(currentDate);
    };
    const onChangeSol = (event, selectedDate) => {
        const currentDate = selectedDate || dateSol;
        setShowSol(false)
        setDateSol(currentDate);
    };
    const onChangeIn = (event, selectedDate) => {
        const currentDate = selectedDate || dateIn;
        setShowIn(false)
        setDateIn(currentDate);
    };
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.text}>Fecha de apertura</Text>
                    <Icon reverse size={15} name='calendar' color='black' type='ionicon' onPress={() => setShowApertura(true)} />
                    {showApertura &&
                        <DateTimePicker
                            testID="TiempoAp"
                            value={dateApertura}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />}
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.text}>Tiempo para adueñarse</Text>
                    <Icon reverse size={15} name='calendar' color='black' type='ionicon' onPress={() => setShowTa(true)} />
                    {showTa &&
                        <DateTimePicker
                            testID="TiempoA"
                            value={dateTa}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTa}
                        />}
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.text}>Tiempo para apropiarse</Text>
                    <Icon reverse size={15} name='calendar' color='black' type='ionicon' onPress={() => setShowTa(true)} />
                    {showApr &&
                        <DateTimePicker
                            testID="TiempoApr"
                            value={dateApr}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeApr}
                        />}
                </View>
                <Divider />
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Text style={styles.text}>Tipo</Text>
                    <RNPickerSelect
                        key='tipo'
                        onValueChange={text => setTipo(text)}
                        
                        items={[
                            { label: 'Incidencia', value: 1 },
                            { label: 'Requerimiento', value: 2 }

                        ]}
                        value={tipo}
                    />
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.text}>Tiempo de solución</Text>
                    <Icon reverse size={15} name='calendar' color='black' type='ionicon' onPress={() => setShowSol(true)} />
                    {showSol &&
                        <DateTimePicker
                            testID="TiempoSol"
                            value={dateSol}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeSol}
                        />}
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={styles.text}>Tiempo interno para resolver</Text>
                    <Icon reverse size={15} name='calendar' color='black' type='ionicon' onPress={() => setShowIn(true)} />
                    {showIn &&
                        <DateTimePicker
                            testID="TiempoSol"
                            value={dateIn}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeIn}
                        />}
                </View>
                <Divider />
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Text style={styles.text}>Categoria</Text>
                    <RNPickerSelect
                        key='Categoria'
                        onValueChange={text => setCategoria(text)}
                        items={cat}
                        value={categoria}
                    />
                    <Divider />
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Solicitante</ListItem.Title>
                            <Icon reverse size={15} name='person' color='black' type='ionicon' />
                            <RNPickerSelect
                                key='Solicitante'
                                onValueChange={text => setSolicitante(text)}
                                items={users}
                                value={solicitante}
                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
                                key='SoliGroup'
                                onValueChange={text => setSolicitanteGroup(text)}
                                items={groupS}
                                value={solicitanteGroup}
                            />
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Observador</ListItem.Title>
                            <Icon reverse size={15} name='person' color='black' type='ionicon' />

                            <RNPickerSelect
                                key='Observador'
                                onValueChange={text => setObservador(text)}
                                items={users}
                                value={observador}

                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
                                key='GrupoObs'
                                onValueChange={text => setGroupOb(text)}
                                items={groupS}
                                value={groupOb}

                            />
                        </ListItem.Content>

                    </ListItem>

                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Asignado a:</ListItem.Title>
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
                                key='Asignado'
                                onValueChange={text => setAsignado(text)}
                                items={groupS}
                                value={asignado}

                            />
                            <Icon reverse size={15} name='dolly' color='black' type='font-awesome-5' />
                            <RNPickerSelect
                                key='Suppl'
                                onValueChange={text => setASuppl(text)}
                                items={suppl}

                            />
                        </ListItem.Content>
                    </ListItem>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Estado</Text>
                        <RNPickerSelect
                            key='estado'
                            onValueChange={text => setEst(text)}
                            items={[
                                { label: 'Nuevo', value: 1, inputLabel: 'Nuevo' },
                                { label: 'En curso(asignada)', value: 2, inputLabel: 'En curso(asignada)' },
                                { label: 'En curso(planificada)', value: 3, inputLabel: 'En curso(planificada)' },
                                { label: 'En espera', value: 4, inputLabel: 'En espera' },
                                { label: 'Resuelto', value: 5, inputLabel: 'Resuelto' },
                                { label: 'Cerrado', value: 6, inputLabel: 'Cerrado' },

                            ]}
                            value={est}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Fuente solicitante</Text>
                        <RNPickerSelect
                            key='Solicitante'
                            onValueChange={text => setRt(text)}
                            items={requestType}
                            value={rt}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Urgencia</Text>
                        <RNPickerSelect
                            key='Urgencia'
                            onValueChange={text => setUrgen(text)}
                            items={urg}
                            value={urgen}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Impacto</Text>
                        <RNPickerSelect
                            key='Impacto'
                            onValueChange={text => setIm(text)}
                            items={urg}
                            value={im}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Prioridad</Text>
                        <RNPickerSelect
                            key='Prioridad'
                            onValueChange={text => setPrio(text)}
                            items={urg}
                            value={prio}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Localización	</Text>
                        <RNPickerSelect
                            key='Localizacion'
                            onValueChange={text => setLoc(text)}
                            items={locat}
                            value={loc}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Tiempo Duración</Text>
                        <RNPickerSelect
                            key='Total duration'
                            onValueChange={text => setTotal(text)}
                            items={timer}
                            value={totalD}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>Titulo</Text><Text style={{ color: 'red' }}>*</Text>

                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setTitulo(text)}
                            value={titulo}
                            placeholder='Titulo'
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>Descripcion</Text><Text style={{ color: 'red' }}>*</Text>

                        </View>
                        
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                                    actions.heading4,
                                    
                                  
                                ]} // default defaultActions
                                
                                
                            />
                        </KeyboardAvoidingView>
                        <RichEditor
                            ref={richText}
                            onChange={t => console.log(t)}
                            style={{height:200,borderWidth:1,borderRadius:5}}
                            editorInitializedCallback={editorInitializedCallback}
                            initialContentHTML={'<p>Descripcion</p>'}
                        />
                    </View>
                    <View style={{ flexDirection: 'column', height: 50 }}>
                        <Button title='Guardar'></Button>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'sans-serif'
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },

})