import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { set } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../components/Card'
import Constants from 'expo-constants';

import { CardItem } from '../components/Card'
export const Inicio = ({ navigation }) => {
    const auth = useSelector((store) => store.app.profiles)
    const { computer, monitor, 
        networkE, peripheral, 
        phone, printer, software,
        dcroom, rack,cluster ,
        enclosure, server_room,
        lineas,domains,licenses,
        certificates,cartridgeitem, 
        ticket, consumableitem, 
        pdu, passivedcequipment,
        Item_DeviceSimcard } = useSelector((store) => store.app)
    const [com, setCom] = useState(null)//COMPUTER
    const [mon, setMon] = useState(null)//MONITOR
    const [net, setNet] = useState(null)//NETWORK_DEVICES
    const [per, setPer] = useState(null)//PERIPHERICAL
    const [pho, setPho] = useState(null)//PHONE
    const [pri, setPri] = useState(null)//PRINTER
    const [soft, setSoft] = useState(null)//SOFTWARE
    const [dcr, setDcr] = useState(null)//DCROOM
    const [ra, setRa] = useState(null)//RACK
    const [clus,setCluster] = useState(null)//CLUSTER
    const [en, setEn] = useState(null)//ENCLOUSER
    const [ser,setSer] = useState(null)//SERVER_ROOM
    const [lin,setLin] = useState(null)//LINEAS
    const [dom,setDom] = useState(null)//DOMAINS
    const [lic,setLic] = useState(null)//LICENSES
    const [cert,setCert] = useState(null)//CERTIFICATE
    const [cart, setCart] = useState(null)//CARTRIDGEITEM
    const [con, setCon] = useState(null)//CONSUMABLEITEM
    const [pd, setPd] = useState(null)//PDU
    const [pass, setPass] = useState(null)//PASSIVE EQUIPEMENT
    const [sim, setSim] = useState(null)//SIM CARD
    useEffect(() => {
        setCom(computer ? computer.length : null)
        setMon(monitor ? monitor.length : null)
        setNet(networkE ? networkE.length : null)
        setPer(peripheral ? peripheral.length : null)
        setPho(phone ? phone.length : null)
        setPri(printer ? printer.length : null)
        setSoft(software ? software.length : null)
        setDcr(dcroom ? dcroom.length : null)
        setRa(rack ? rack.length : null)
        setCluster(cluster?cluster.length:null)
        setEn(enclosure ? enclosure.length : null)
        setSer(server_room?server_room.length:null)
        setLin(lineas?lineas.length:null)
        setCert(certificates?certificates.length:null)
        setCart(cartridgeitem ? cartridgeitem.length : null)
        setCon(consumableitem ? consumableitem.length : null)
        setPd(pdu ? pdu.length : null)
        setPass(passivedcequipment ? passivedcequipment.length : null)
        setSim(Item_DeviceSimcard ? Item_DeviceSimcard.length : null)
        setDom(domains?domains.length:null)
        setLic(licenses?licenses.length:null)
    })


    return (
        {/*
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
        */}
    )
}
