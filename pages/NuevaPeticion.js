import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Divider, Icon, ListItem } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';

export const NuevaPeticion = () => {

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
            RequestType.forEach(e => {
                const obj = {
                    label: e.name,
                    value: e.id
                }
                arrayReTy.push(obj)
            })
            setRequestType(arrayReTy)
            let arrayLo = []
            Location.forEach(e => {
                const obj = {
                    label: e.name,
                    value: e.id
                }
                arrayLo.push(obj)
            });
            setLocat(arrayLo)
        }

        json()
        console.log(requestType)

    }, [category, user, group, supplier, RequestType, Location])
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
                                onValueChange={text => setSolicitante(text)}
                                items={users}
                                value={solicitante}
                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
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
                                onValueChange={text => setObservador(text)}
                                items={users}
                                value={observador}

                            />
                            <Icon reverse size={15} name='people' color='black' type='ionicon' />
                            <RNPickerSelect
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
                                onValueChange={text => setAsignado(text)}
                                items={groupS}
                                value={asignado}

                            />
                            <Icon reverse size={15} name='dolly' color='black' type='font-awesome-5' />
                            <RNPickerSelect
                                onValueChange={text => setASuppl(text)}
                                items={suppl}

                            />
                        </ListItem.Content>
                    </ListItem>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Estado</Text>
                        <RNPickerSelect
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
                            onValueChange={text => setRt(text)}
                            items={requestType}
                            value={rt}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Urgencia</Text>
                        <RNPickerSelect
                            onValueChange={text => setUrgen(text)}
                            items={urg}
                            value={urgen}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Impacto</Text>
                        <RNPickerSelect
                            onValueChange={text => setIm(text)}
                            items={urg}
                            value={im}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Prioridad</Text>
                        <RNPickerSelect
                            onValueChange={text => setPrio(text)}
                            items={urg}
                            value={prio}
                        />
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.text}>Localización	</Text>
                        <RNPickerSelect
                            onValueChange={text => setLoc(text)}
                            items={locat}
                            value={loc}
                        />
                    </View>
                    <Button>Guardar</Button>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'sans-serif'
    }
})