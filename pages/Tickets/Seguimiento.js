import React, { useEffect, useState } from 'react';
import { View, Dimensions, TextInput, Alert } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import HTML from 'react-native-render-html'
import { decode } from 'html-encoder-decoder'
import { FormFollowup } from '../../components/FormFollowup';
import { FormTask } from '../../components/FormTask'
import { FormFile } from '../../components/FormFile';
import { FormValidation } from '../../components/FormValidation'
import { FormSolution } from '../../components/FormSolution'
import { Image } from 'react-native';
import { itemForm, TICKET_VALIDATION } from '../../redux/tickets'
import { clearStatus } from '../../redux/tickets'
import { Alerta } from '../../components/Alert';

export const Seguimiento = ({ route, navigation }) => {
    const richText = React.createRef();
    const dispatch = useDispatch()

    const { ticket } = route.params;
    const width = Dimensions.get('window').width / 2 - 10;

    const { session, user } = useSelector((store) => store.app)
    const { ticketValidation, ticketSolution,
        ticketFollowup, ticketTask, ticketDocumentItem, status
    } = useSelector((store) => store.ticket)

    const [sessionS,setSessionS] = useState({})
    const [validation, setValidation] = useState([]);
    const [solutionS, setSolution] = useState([]);
    const [followupS, setFollowupS] = useState([]);
    const [task, setTask] = useState([]);
    const [doc, setDocs] = useState([]);
    const [users, setUsers] = useState([{ id: 0, user: 'Buscando' }]);
    const [visible, setVisible] = useState(false)

    //forms visible
    const [visibleFollowup, setVisibleFollowup] = useState(false)
    const [visibleTask, setVisibleTask] = useState(false)
    const [visibleFile, setVisibleFile] = useState(false)
    const [visibleSolution, setVisibleSolution] = useState(false)
    const [visibleAprobation, setVisibleAprobation] = useState(false)

    //form validation
    const [textObj, setTextObj] = useState([])
    let arrayComment = []
    useEffect(() => {
        if(session){
            let headers;
            if(session.app_token!=""){
                 headers = {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session.session_token.session_token}`,
                    'App-Token': `${session.app_token}`,
                    'Accept': 'application/octet-stream'
                }
            }else{
                 headers = {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session.session_token.session_token}`,
                    'Accept': 'application/octet-stream'

    
                }
            }
            setSessionS(headers)
            console.log(session.server)
        }
        if (status.cod) {
            let title = ""
            let texto = ""

            if (status.cod == 200 || status.cod == 201) {
                title = "Exitoso!"
                texto = "Se agrego el item correctamente"
            } else {
                title = "Error"
                texto = "se ha producido un error"
            }
            Alert.alert(title, texto, [
                {
                    text: "Aceptar",
                    onPress: () => dispatch(clearStatus({ cod: null, type: null })),
                    style: "cancel"
                }
            ])
        }
        if (ticketValidation) {
            setValidation(ticketValidation)
        }
        if (ticketSolution) {
            setSolution(ticketSolution)
        }
        if (ticketFollowup) {
            setFollowupS(ticketFollowup)
        }
        if (ticketTask) {
            setTask(ticketTask)
        }
        if (ticketDocumentItem) {
            setDocs(ticketDocumentItem)
        }
        const json = async () => {
            let arrayFinal = []
            if (user !== undefined) {
                user.forEach(e => {
                    const obj = {
                        id: e.id,
                        user: e.name
                    }
                    arrayFinal.push(obj);
                });

            }
            setUsers(arrayFinal)
        }
        json();

    }, [
        ticketValidation, ticketSolution,
        ticketFollowup, ticketTask, ticketDocumentItem, session, user, status])


    const VisibleForm = (num) => {
        switch (num) {
            case 1:
                setVisibleFollowup(true)
                setVisibleTask(false)
                setVisibleFile(false)
                setVisibleAprobation(false)
                setVisibleSolution(false)
                break;
            case 2:
                setVisibleFollowup(false)
                setVisibleTask(true)
                setVisibleFile(false)
                setVisibleAprobation(false)
                setVisibleSolution(false)
                break;
            case 3:
                setVisibleFollowup(false)
                setVisibleTask(false)
                setVisibleFile(true)
                setVisibleAprobation(false)
                setVisibleSolution(false)
                break;
            case 4:
                setVisibleFollowup(false)
                setVisibleTask(false)
                setVisibleFile(false)
                setVisibleAprobation(true)
                setVisibleSolution(false)
                break;
            case 5:
                setVisibleFollowup(false)
                setVisibleTask(false)
                setVisibleFile(false)
                setVisibleAprobation(false)
                setVisibleSolution(true)
                break;
            default:
                break;
        }
    }
    const getTextComent = (id, text) => {
        let val = arrayComment.find(item => item.id == id)
        if (val !== undefined) {
            val.text = text;


        } else {
            arrayComment.push({ id: id, text: text })
        }
        setTextObj(arrayComment)
    }
    const saveValidateUpdate = (id_solution, id_ticket, status) => {
        let text = textObj.find(item => item.id == id_solution)
        var f = new Date();
        console.log(id_solution)
        if (text != undefined) {
            let raw = JSON.stringify({
                "input": {
                    "tickets_id": id_ticket,
                    "comment_validation": text.text,
                    "status": status,
                }
            })
            dispatch(itemForm(raw, session.server, session.session_token, 'Ticket/' + id_ticket + '/TicketValidation/' + id_solution, session.app_token, session.valTok, 'put', TICKET_VALIDATION))
        } else {

        }
    }

    const filterUsername = (id) => {
        let name = ''
        const u = users.find(item => item.id == id)
        return u.user
    }
    return (
        <View style={{ flexDirection: 'column', flex: 1, margin: 5 }}>
            <ScrollView>
                {
                    solutionS.length == 0 ? (
                        <><Text h4>Agregar:</Text>

                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "comment", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#E0E0E0' }}
                                        title="Seguimiento"
                                        titleStyle={{ color: '#535353' }}
                                        onPress={() => VisibleForm(1)}
                                    />
                                </View>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "check-square", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#FEDA90' }}
                                        title="Tarea"
                                        titleStyle={{ color: '#535353' }}
                                        onPress={() => VisibleForm(2)}

                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "paperclip", size: 15, color: "#3A5D4E", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#80CEAD' }}
                                        title="Documento"
                                        titleStyle={{ color: '#3A5D4E' }}
                                        onPress={() => VisibleForm(3)}

                                    />
                                </View>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "thumbs-up", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#b6f47e' }}
                                        title="Aprobación"
                                        titleStyle={{ color: '#535353' }}
                                        onPress={() => VisibleForm(4)}

                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', padding: 10 }}>

                                <View style={{ width: width * 2, padding: 10 }}>
                                    <Button icon={{ name: "check", size: 15, color: "#425B64", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#9FD6ED' }}
                                        title="Solución"
                                        titleStyle={{ color: '#425B64' }}
                                        onPress={() => VisibleForm(5)}

                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                {
                                    visibleFollowup ? <FormFollowup richText={richText} id={ticket.id}></FormFollowup> : null
                                }
                                {
                                    visibleTask ? <FormTask richText={richText} id={ticket.id}></FormTask> : null
                                }
                                {
                                    visibleFile ? <FormFile id={ticket.id}></FormFile> : null
                                }
                                {
                                    visibleAprobation ? <FormValidation id={ticket.id}></FormValidation> : null
                                }
                                {
                                    visibleSolution ? <FormSolution richText={richText}></FormSolution> : null
                                }
                            </View>
                        </>
                    ) : null
                }
                <View style={{ marginTop: 40 }}>
                    <Divider></Divider>
                    <Text h4>Historial de acciones :</Text>
                    {
                        validation.map((x, l) => {

                            if (x.status == 3 || x.status == 4) {
                                return (
                                    <View key={l}>

                                        <View style={{ flexDirection: 'column', backgroundColor: `${x.status == 3 ? '#A1D7A2' : '#D3A4A4'}`, padding: 20 }}>
                                            <Text>{`Respuesta de la petición de validación:  ${x.status == 3 ? 'Concedido' : 'Rechazado'}`}</Text>
                                            {x.comment_validation ? <HTML source={{ html: decode(x.comment_validation) }} /> : null}
                                        </View>
                                        <View style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, marginBottom: 20 }}>
                                            <Text>{`Petición de validación => ${users.find(item => item.id == x.users_id_validate).user}`}</Text>
                                            {x.comment_submission ? <HTML source={{ html: decode(x.comment_submission) }} /> : null}
                                        </View>
                                    </View>
                                )
                            } else if (x.status == 2) {
                                return (
                                    <View key={l} style={{ flexDirection: 'column', backgroundColor: 'white', padding: 10, marginBottom: 20 }}>
                                        <Text>{`Petición de validación => ${filterUsername(x.users_id_validate)}`}</Text>
                                        <Text>{x.comment_submission}</Text>
                                        <TextInput
                                            style={{
                                                borderWidth: 1,
                                                borderColor: 'black',
                                                borderRadius: 5,
                                                color: 'black',
                                                marginBottom: 10,
                                                textAlignVertical: 'top',
                                                padding: 10
                                            }}
                                            multiline={true}
                                            onChangeText={t => getTextComent(x.id, t)}
                                            numberOfLines={4} />
                                        <View style={{ flexDirection: 'row', padding: 10 }}>
                                            <Button
                                                onPress={() => saveValidateUpdate(x.id, x.tickets_id, 3)}
                                                title="Aprobar" titleStyle={{ color: '#425B64' }}
                                                buttonStyle={{ backgroundColor: "#b6f47e" }}
                                                icon={{ name: "thumbs-up", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                            >

                                            </Button>
                                            <Button
                                                onPress={() => saveValidateUpdate(x.id, x.tickets_id, 4)}
                                                title="Rechazar"
                                                titleStyle={{ color: '#380b0b' }}
                                                buttonStyle={{ backgroundColor: "#eba696" }}
                                                containerStyle={{ paddingLeft: 10 }}
                                                icon={{
                                                    name: "thumbs-down", size: 15, color: "#380b0b",
                                                    type: 'font-awesome-5'
                                                }}
                                            >

                                            </Button>

                                        </View>
                                    </View>
                                )
                            }

                        })
                    }
                    {
                        followupS.map((x, l) => (
                            <View key={l} style={{ flexDirection: 'column', backgroundColor: '#E0E0E0', padding: 10, marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                                    {x.is_private == 1 ? <Icon type='font-awesome-5' name='lock' color='#D97E7E' ></Icon> : null}
                                </View>
                                {x.content ? <HTML source={{ html: decode(x.content) }} /> : null}
                            </View>
                        ))
                    }
                    {
                        solutionS.map((x, l) => (
                            <View key={l} style={{ flexDirection: 'column', backgroundColor: '#9FD6ED', padding: 10, marginBottom: 20 }}>
                                <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                                {x.content ? <HTML source={{ html: decode(x.content) }} /> : null}
                            </View>
                        ))
                    }
                    {
                        task.map((x, l) => (

                            <View key={l} style={{ flexDirection: 'column', backgroundColor: '#FEDA90', padding: 10, marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'gray' }}>{x.date_mod}</Text>

                                    {
                                        x.is_private == 1 ? (
                                            <Icon name='lock' type='font-awesome' color='#D97E7E' style={{ paddingLeft: 50 }}></Icon>

                                        ) : (null)
                                    }

                                </View>
                                {x.content ? <HTML source={{ html: decode(x.content) }} /> : null}
                            </View>
                        ))
                    }
                    {
                        doc.map((x, l) => (
                            <Image
                                key={l}
                                source={{
                                    uri: `${session.server}/apirest.php/Document/${x.documents_id}`,
                                    method: 'GET',
                                    headers: sessionS,
                                }}
                                style={{width: 400, height: 400}}
                            />
                        ))
                    }
                    <View style={{ flexDirection: 'column', backgroundColor: '#B2E0B6', padding: 20 }}>
                        <View><Text style={{ marginBottom: 5, color: '#7E7E7E' }}>{`Ticket# ${ticket.id} description`}</Text></View>
                        <Text style={{ marginBottom: 5, color: 'gray' }}>{ticket.date_mod}</Text>
                        <Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>{ticket.name}</Text>
                        <HTML source={{ html: decode(ticket.content) }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}