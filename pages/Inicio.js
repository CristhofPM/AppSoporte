import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { set } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../components/Card'
import Constants from 'expo-constants';

import { CardItem } from '../components/Card'
export const Inicio = ({ navigation }) => {
    const auth = useSelector((store) => store.app.profiles)
    const { computer, monitor, networkE, peripheral, phone, printer, software,
        dcroom, rack, enclosure, cartridgeitem, ticket, consumableitem, pdu, passivedcequipment,
        Item_DeviceSimcard } = useSelector((store) => store.app)
    const [com, setCom] = useState(0)
    const [mon, setMon] = useState(0)
    const [net, setNet] = useState(0)
    const [per, setPer] = useState(0)
    const [pho, setPho] = useState(0)
    const [pri, setPri] = useState(0)
    const [soft, setSoft] = useState(0)
    const [cart, setCart] = useState(0)
    const [dcr, setDcr] = useState(0)
    const [ra, setRa] = useState(0)
    const [en, setEn] = useState(0)
    const [con, setCon] = useState(0)
    const [pd, setPd] = useState(0)
    const [pass, setPass] = useState(0)
    const [sim, setSim] = useState(0)
    useEffect(() => {
        console.log(auth)
        setCom(computer ? computer : 0)
        setMon(monitor ? monitor : 0)
        setNet(networkE ? networkE : 0)
        setPer(peripheral ? peripheral : 0)
        setPho(phone ? phone : 0)
        setPri(printer ? printer : 0)
        setSoft(software ? software : 0)
        setDcr(dcroom ? dcroom : 0)
        setRa(rack ? rack : 0)
        setEn(enclosure ? enclosure : 0)
        setCart(cartridgeitem ? cartridgeitem : 0)
        setCon(consumableitem ? consumableitem : 0)
        setPd(pdu ? pdu : 0)
        setPass(passivedcequipment ? passivedcequipment : 0)
        setSim(Item_DeviceSimcard ? Item_DeviceSimcard : 0)

    })


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 1}}>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Computadoras' tipo='font-awesome' color='#e69393' subtitle={com} icono='laptop' colorI='#8c2121'></CardItem>
                    <CardItem title='Monitor' tipo='font-awesome' color='#b52d30' subtitle={mon} icono='desktop' colorI='#efbfc0'></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Dispositivos de red' tipo='font-awesome' color='#bfe7ea' subtitle={net} icono='sitemap' colorI='#379fa6'></CardItem>
                    <CardItem title='Programas' tipo='font-awesome' color='#d1f1a8' subtitle={soft} icono='cube' colorI='#70b11c'></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Teléfonos' tipo='font-awesome' color='#d5e1ec' subtitle={pho} icono='phone' colorI='#4c7da9'></CardItem>
                    <CardItem title='Impresoras' tipo='font-awesome' color='#365a8f' subtitle={pri} icono='print' colorI='#b0c4e1'></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Dispositivos' tipo='font-awesome' color='#2F7553' subtitle={per} icono='usb' colorI='#5EEBA7'></CardItem>
                    <CardItem title='Cartuchos' tipo='font-awesome' color='#45A1EB' subtitle={cart} icono='tint' colorI='#225075'></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Consumibles' tipo='font-awesome-5' color='#434075' subtitle={con} icono='box-open' colorI='#8681EB' ></CardItem>
                    <CardItem title='Bastidores' tipo='font-awesome-5' color='#9F86EB' subtitle={ra} icono='server' colorI='#4F4375' ></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Chasis' tipo='font-awesome-5' color='#75462F' subtitle={en} icono='th' colorI='#EB8D5E' ></CardItem>
                    <CardItem title='Bastidores' tipo='font-awesome-5' color='#EB574B' subtitle={pass} icono='th-list' colorI='#752C26' ></CardItem>
                </View>
                <View style={{ padding: 5, flexDirection: 'row' }}>
                    <CardItem title='Tarjetas SIM' tipo='font-awesome-5' color='#6FA66D' subtitle={sim} icono='sim-card' colorI='#A3F2A0' ></CardItem>
                    <CardItem title='PDUs' tipo='font-awesome-5' color='#737143' subtitle={pd} icono='plug' colorI='#E5E184' ></CardItem>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
