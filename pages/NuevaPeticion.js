import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider, Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export const NuevaPeticion = () => {

    const category = useSelector((store) => store.app.category)
    const [cat, setCat] = useState([{ label: 'Sin datos', value: 0 }])

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
    //observador
    const [observador, setObservador] = useState('')
    //Asignado a:
    const [asignado, setAsignado] = useState('');


    useEffect(() => {
            console.log('Renderizado')
        
    })
    const onChange = (event, selectedDate) => {
        console.log(event)
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
                    <Divider />

                </View>
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
                    <Divider />


                </View>
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
                    <Divider />
                </View>
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
                <View style={{ flexDirection: 'column', padding: 10 }}>

                    <Text style={styles.text}>Categoria</Text>
                    <RNPickerSelect
                        onValueChange={text => setCategoria(text)}
                        items={cat}
                        value={categoria}

                    />
                    <Text style={styles.text}>Solicitante</Text>
                    <RNPickerSelect
                        onValueChange={text => setSolicitante(text)}
                        items={[
                            { label: 'cat 1', value: 1 },
                            { label: 'cat 2', value: 2 }

                        ]}
                        value={solicitante}

                    />
                    <Text style={styles.text}>Observador</Text>
                    <RNPickerSelect
                        onValueChange={text => setObservador(text)}
                        items={[
                            { label: 'cat 1', value: 1 },
                            { label: 'cat 2', value: 2 }

                        ]}
                        value={observador}

                    />
                    <Text style={styles.text}>Asignado a:</Text>
                    <RNPickerSelect
                        onValueChange={text => setAsignado(text)}
                        items={[
                            { label: 'cat 1', value: 1 },
                            { label: 'cat 2', value: 2 }
                        ]}
                        value={asignado}
                    />
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