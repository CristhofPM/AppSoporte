import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Button , Text} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export const Seguimiento = ({ route, navigation }) => {
    const { ticket } = route.params;
    const width = Dimensions.get('window').width / 2 - 10;
    useEffect(() => {
        console.log(ticket)
    })
    return (
        <View style={{flexDirection:'column',flex:1,margin:5}}>
            <ScrollView>
            <Text h4>Agregar:</Text>

            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ width: width, padding: 10 }}>
                    <Button icon={{ name: "comment", size: 15, color: "#535353", type: 'font-awesome-5' }}
                        buttonStyle={{ backgroundColor: '#E0E0E0' }}
                        title="Seguimiento"
                        titleStyle={{ color: '#535353' }}
                    />
                </View>
                <View style={{ width: width, padding: 10 }}>
                    <Button icon={{ name: "check-square", size: 15, color: "#535353", type: 'font-awesome-5' }}
                        buttonStyle={{ backgroundColor: '#FEDA90' }}
                        title="Tarea"
                        titleStyle={{ color: '#535353' }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ width: width, padding: 10 }}>
                    <Button icon={{ name: "paperclip", size: 15, color: "#3A5D4E", type: 'font-awesome-5' }}
                        buttonStyle={{ backgroundColor: '#80CEAD' }}
                        title="Documento"
                        titleStyle={{ color: '#3A5D4E' }}
                    />
                </View>
                <View style={{ width: width, padding: 10 }}>
                    <Button icon={{ name: "thumbs-up", size: 15, color: "#535353", type: 'font-awesome-5' }}
                        buttonStyle={{ backgroundColor: '#b6f47e' }}
                        title="Aprobación"
                        titleStyle={{ color: '#535353' }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>
               
                <View style={{ width: width*2, padding: 10 }}>
                    <Button icon={{ name: "check", size: 15, color: "#425B64", type: 'font-awesome-5' }}
                        buttonStyle={{ backgroundColor: '#9FD6ED' }}
                        title="Solución"
                        titleStyle={{ color: '#425B64' }}
                    />
                </View>
            </View>
            <Text h4>Historial de acciones :</Text>
            </ScrollView>
        </View>
    )
}