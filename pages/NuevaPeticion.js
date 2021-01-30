import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Divider, Icon, ListItem, } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector,useDispatch } from 'react-redux';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import {addItem,clearMsj,clearMsjG, getItem} from '../redux/app'
export const NuevaPeticion = () => {
    const richText = React.createRef();
    const  dispatch = useDispatch();
    //load
    const [load,setLoad]=useState(false);
    const { category, user, group, supplier, RequestType, Location, ticket, error,msj,
        config,session } = useSelector((store) => store.app)
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
    const [timer, setTimer] = useState([{ label: 'Sin datos', value: 0 }])
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
    const [locat, setLocat] = useState([{ label: 'Buscando...', value: 0 }])

    //Tickets api
    const [ticketApi, setTicketApi] = useState([{ label: 'Buscando...', value: 0 }])
    const [elementosApi, setElementosApi] = useState([{ label: 'Buscando...', value: 0 }])
    /**************************************************************************/
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
    const [categoria, setCategoria] = useState(0);
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
    const [rt, setRt] = useState(0)
    //Urgencia
    const [urgen, setUrgen] = useState(0)
    //Impacto
    const [im, setIm] = useState('');
    //prioridad
    const [prio, setPrio] = useState(0)
    //ubicacion
    const [loc, setLoc] = useState(0)
    //total duracion
    const [totalD, setTotal] = useState(0);
    //titulo
    const [titulo, setTitulo] = useState('');
    //descripcion
    const [descripcion,setDescripcion]=useState('');
    //tipo de vinculacion
    const [tipoVin, setTipoVin] = useState(0);
    //id vinculados
    const [ticketsId, setTicketId] = useState('');
    //elementos asociados
    const [elementsId, setElementId] = useState('');

    const ok =()=>{
        dispatch(clearMsjG())
        dispatch(getItem('Ticket',session.server,session.session_token))
    }
    useEffect(() => {
        if(error){
            setLoad(false)
            Alert.alert('Error', error, [
                {
                    text: "Ok",
                    onPress: () => dispatch(clearMsj()),
                    style: "cancel"
                }
            ])
        }
        if(msj){
            setLoad(false)
            Alert.alert('Exito', msj, [
                {
                    text: "Ok",
                    onPress: () => ok(),
                    style: "cancel"
                }
            ])
        }
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
            let ticketArray = [];
            if (ticket !== undefined) {
                ticket.forEach(element => {
                    const obj = {
                        label: `${element.name} - ${element.id}`,
                        value: element.id
                    }
                    ticketArray.push(obj)
                });
            }
            setTicketApi(ticketArray)
        }
        let arrayElement = [];
        if (config) {
            if (config.cfg_glpi !== undefined) {
                if (config.cfg_glpi.ticket_types !== undefined) {
                    config.cfg_glpi.ticket_types.forEach(e => {
                        const obj = {
                            label: e,
                            value: e
                        }
                        arrayElement.push(obj)
                    })

                }
            }
        }
        setElementosApi(arrayElement)

        json()

    }, [category, user, group, supplier, RequestType, Location, ticket,config,session,error,msj])
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

    //click btn
    const saveTicket = ()=>{
        if(titulo!='' && descripcion!=''){
            setLoad(true);
            var raw = JSON.stringify({
                "input":{
                    "actiontime":0,
                    "begin_waiting_date":null,
                    "close_delay_stat":0,
                    "closedate":null,
                    "content": descripcion,
                    "date":"2021-01-21 01:02:06",
                    "date_creation":"2021-01-21 01:02:06",
                    "date_mod":"2021-01-21 01:02:06",
                    "global_validation":1,
                    "impact":im,
                    "internal_time_to_own":null,
                    "internal_time_to_resolve":null,
                    "is_deleted":0,
                    "itilcategories_id":categoria,
                    "locations_id":loc,
                    "name":titulo,
                    "ola_ttr_begin_date":null,
                    "ola_waiting_duration":0,
                    "olalevels_id_ttr":0,
                    "olas_id_tto":0,
                    "olas_id_ttr":0,
                    "priority":prio,
                    "requesttypes_id":rt,
                    "sla_waiting_duration":0,
                    "slalevels_id_ttr":0,
                    "slas_id_tto":0,
                    "slas_id_ttr":0,
                    "solve_delay_stat":0,
                    "solvedate":null,
                    "status":1,
                    "takeintoaccount_delay_stat":0,
                    "time_to_own":null,
                    "time_to_resolve":null,
                    "type":2,"urgency":urgen,
                    "users_id_lastupdater":6,
                    "users_id_recipient":6,
                    "validation_percent":0,
                    "waiting_duration":0}});
            if(session){
                dispatch(addItem(raw,session.server,session.session_token,'Ticket'))

            }
        }else{
            setLoad(false)
            Alert.alert('Campos incompletos');
        }
    }
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
                        style={{ viewContainer: styles.select }}
                        key='tipo'
                        onValueChange={text => setTipo(text)}
                        placeholder={{
                            label: '--------------',
                            value: tipo,
                            color: 'blue'
                        }}
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
                        style={{ viewContainer: styles.select }}

                        placeholder={{
                            label: '----------',
                            value: categoria,
                            color: 'blue'
                        }}
                        onValueChange={text => setCategoria(text)}
                        items={cat}
                        value={categoria}
                    />
                </View>
                <View style={{ flexDirection: 'column', padding: 10 }}>
                    <Divider />

                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Solicitante</ListItem.Title>
                            <Icon reverse size={15} name='person' color='black' type='ionicon' />
                            <RNPickerSelect
                                style={{ viewContainer: styles.select }}

                                placeholder={{
                                    label: '----------',
                                    value: solicitante,
                                    color: 'blue'
                                }}
                                key='Solicitante'
                                onValueChange={text => setSolicitante(text)}
                                items={users}
                                value={solicitante}
                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
                                key='SoliGroup'
                                style={{ viewContainer: styles.select }}

                                placeholder={{
                                    label: '----------',
                                    value: solicitanteGroup,
                                    color: 'blue'
                                }}
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
                                style={{ viewContainer: styles.select }}

                                placeholder={{
                                    label: '----------',
                                    value: observador,
                                    color: 'blue'
                                }}
                                key='Observador'
                                onValueChange={text => setObservador(text)}
                                items={users}
                                value={observador}

                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
                                style={{ viewContainer: styles.select }}

                                key='GrupoObs'
                                placeholder={{
                                    label: '----------',
                                    value: groupOb,
                                    color: 'blue'
                                }}
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
                                style={{ viewContainer: styles.select }}

                                placeholder={{
                                    label: '----------',
                                    value: asignado,
                                    color: 'blue'
                                }}
                                onValueChange={text => setAsignado(text)}
                                items={groupS}
                                value={asignado}

                            />
                            <Icon reverse size={15} name='dolly' color='black' type='font-awesome-5' />
                            <RNPickerSelect
                                style={{ viewContainer: styles.select }}

                                key='Suppl'
                                placeholder={{
                                    label: '----------',
                                    value: aSuppl,
                                    color: 'blue'
                                }}
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
                            style={{ viewContainer: styles.select }}

                            placeholder={{
                                label: '----------',
                                value: est,
                                color: 'blue'
                            }}
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
                            style={{ viewContainer: styles.select }}

                            key='Solicitante'
                            placeholder={{
                                label: '----------',
                                value: rt,
                                color: 'blue'
                            }}
                            onValueChange={text => setRt(text)}
                            items={requestType}
                            value={rt}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Urgencia</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Urgencia'
                            placeholder={{
                                label: '----------',
                                value: urgen,
                                color: 'blue'
                            }}
                            onValueChange={text => setUrgen(text)}
                            items={urg}
                            value={urgen}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Impacto</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Impacto'
                            placeholder={{
                                label: '----------',
                                value: im,
                                color: 'blue'
                            }}
                            onValueChange={text => setIm(text)}
                            items={urg}
                            value={im}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Prioridad</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Prioridad'
                            placeholder={{
                                label: '----------',
                                value: prio,
                                color: 'blue'
                            }}
                            onValueChange={text => setPrio(text)}
                            items={urg}
                            value={prio}
                        />
                    </View>

                    
                    <Divider />


                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Localización</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Localizacion'
                            placeholder={{
                                label: '----------',
                                value: loc,
                                color: 'blue'
                            }}
                            onValueChange={text => setLoc(text)}
                            items={locat}
                            value={loc}
                        />
                    </View>


                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Elementos asociados</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Elementos'
                            placeholder={{
                                label: '----------',
                                value: elementsId,
                                color: 'blue'
                            }}
                            onValueChange={text => setElementId(text)}
                            items={elementosApi}
                            value={elementsId}
                        />
                    </View>


                    <Divider />


                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Tiempo Duración</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Total duration'
                            placeholder={{
                                label: '----------',
                                value: totalD,
                                color: 'blue'
                            }}
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
                            onChange={t => setDescripcion(t)}
                            style={{ height: 200, borderWidth: 1, borderRadius: 5 }}
                            editorInitializedCallback={editorInitializedCallback}
                            initialContentHTML={'<p>Descripcion</p>'}
                        />

                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                        <Divider />
                        <Text style={styles.text}>Tickets vinculados</Text>
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            key='Vinculados'
                            placeholder={{
                                label: 'Seleccione',
                                value: tipoVin,
                                color: 'blue'
                            }}
                            onValueChange={text => setTipoVin(text)}
                            items={[
                                { label: 'Vinculado a', value: 1 },
                                { label: 'Duplicado', value: 2 },
                                { label: 'Hijo de', value: 3 },
                                { label: 'Padre de', value: 4 }
                            ]}
                            value={tipoVin}
                        />
                        <RNPickerSelect
                            style={{ viewContainer: styles.select }}

                            placeholder={{
                                label: '-----------', value: ticketsId, color: 'blue'
                            }}
                            key='Tickets'
                            onValueChange={text => setTicketId(text)}
                            items={ticketApi}
                            value={ticketsId}
                            textInputProps={{ placeholderTextColor: 'blue' }}
                        />
                    </View>


                    <View style={{ flexDirection: 'column', height: 50 }}>
                        <Button title='Guardar' 
                        loading={load} 
                        disabled={load}
                        onPress={()=>saveTicket()}>
                        </Button>
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
    select: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: 'black',
        marginBottom: 10
    }

})