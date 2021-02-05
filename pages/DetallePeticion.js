import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { CardItem } from '../components/Card'
import {getSubItem} from '../redux/app'
import {useDispatch,useSelector} from 'react-redux'
export const DetallePeticion = ({navigation,route}) => {
    const {ticket} = route.params;
    const {session} = useSelector((store)=>store.app)
    const  dispatch = useDispatch()
    const list = [{ id: 1, title: 'Seguimiento del caso', route: 'Seguimiento' },
    { id: 2, title: 'Caso', route: 'Caso' }, { id: 3, title: 'Estadisticas', route: 'Estadisticas Peticion' },
    { id: 4, title: 'Aprobaciones', route: 'Aprobaciones' }, { id: 5, title: 'Base de conocimineto', route: 'Base de conocimiento' },
    { id: 6, title: 'Elementos', route: 'Elementos' }, { id: 7, title: 'Costos', route: 'Costos' },
    { id: 8, title: 'Proyectos', route: 'Proyectos' }, { id: 9, title: 'Tareas de Proyecto', route: 'Tareas de Proyecto' },
    { id: 10, title: 'Problemas Peticion', route: 'Problemas Peticion' }, { id: 11, title: 'Cambios', route: 'Cambios' },
    { id: 12, title: 'Histórico', route: 'Histórico' }, { id: 13, title: 'Todo', route: 'Todo' }]
    
    const redirect=(t,route)=>{
        t.links.forEach(element => {
            dispatch(getSubItem(element.href,session.session_token,element.rel,session.app_token,session.valTok))

        });
        navigation.navigate(route, {
            ticket:t
           })
    }
    return (
        <View>
            <ScrollView>

                {
                    list.map((x, l) => (
                        <ListItem key={x.id} bottomDivider onPress={()=>redirect(ticket,x.route) }>
                            <ListItem.Content>
                                <ListItem.Title>{x.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </ScrollView>

        </View>
    )
}