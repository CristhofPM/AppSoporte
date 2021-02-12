import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import HTML from 'react-native-render-html'
import { decode } from 'html-encoder-decoder'
import { FormFollowup } from '../../components/FormFollowup';
import {FormTask} from '../../components/FormTask'

export const Seguimiento = ({ route, navigation }) => {
    const richText = React.createRef();

    const { ticket } = route.params;
    const width = Dimensions.get('window').width / 2 - 10;
    const { ticketValidation, ticketCost, problem_ticket, change_ticket, solution, followup, ticketTask } = useSelector((store) => store.app)

    const [validation, setValidation] = useState([]);
    const [cost, setCost] = useState([]);
    const [problem, setProblem] = useState([]);
    const [change, setChange] = useState([]);
    const [solutionS, setSolution] = useState([]);
    const [followupS, setFollowupS] = useState([]);
    const [task, setTask] = useState([]);

    const [visible, setVisible] = useState(false)

    //forms visible
    const [visibleFollowup,setVisibleFollowup]=useState(false)
    const [visibleTask,setVisibleTask]=useState(false)
    const [visibleFile,setVisibleFile]=useState(false)
    const [visibleSolution,setVisibleSolution]=useState(false)
    const [visibleAprobation,setVisibleAprobation]=useState(false)



    useEffect(() => {
        console.log(solution)
        if (ticketValidation) {
            setValidation(ticketValidation)
        }
        if (ticketCost) {
            setCost(ticketCost)
        }
        if (problem_ticket) {
            setProblem(problem_ticket)
        }
        if (change_ticket) {
            setChange(change_ticket)
        }
        if (solution) {
            setSolution(solution)
        }
        if (followup) {
            setFollowupS(followup)
        }
        if (ticketTask) {
            setTask(ticketTask)
        }

    }, [ticketValidation, ticketCost, problem_ticket, change_ticket, solution, followup, ticketTask])
    
    
    const VisibleForm = (num)=>{
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
                                        onPress={()=>VisibleForm(1)}
                                    />
                                </View>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "check-square", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#FEDA90' }}
                                        title="Tarea"
                                        titleStyle={{ color: '#535353' }}
                                        onPress={()=>VisibleForm(2)}

                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "paperclip", size: 15, color: "#3A5D4E", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#80CEAD' }}
                                        title="Documento"
                                        titleStyle={{ color: '#3A5D4E' }}
                                        onPress={()=>VisibleForm(3)}

                                    />
                                </View>
                                <View style={{ width: width, padding: 10 }}>
                                    <Button icon={{ name: "thumbs-up", size: 15, color: "#535353", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#b6f47e' }}
                                        title="Aprobación"
                                        titleStyle={{ color: '#535353' }}
                                        onPress={()=>VisibleForm(4)}

                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', padding: 10 }}>

                                <View style={{ width: width * 2, padding: 10 }}>
                                    <Button icon={{ name: "check", size: 15, color: "#425B64", type: 'font-awesome-5' }}
                                        buttonStyle={{ backgroundColor: '#9FD6ED' }}
                                        title="Solución"
                                        titleStyle={{ color: '#425B64' }}
                                        onPress={()=>VisibleForm(5)}

                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                {
                                    visibleFollowup?<FormFollowup richText={richText}></FormFollowup>:null
                                }
                                {
                                    visibleTask?<FormTask richText={richText}></FormTask>:null
                                }
                                

                            </View>

                        </>
                    ) : null
                }
                <View style={{marginTop:40}}>
                <Divider></Divider>
                <Text h4>Historial de acciones :</Text>
                {
                    validation.map((x, l) => (
                        <View key={l} style={{ flexDirection: 'column', backgroundColor: '#535353', padding: 10, marginBottom: 20 }}>
                            <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                            <HTML source={{ html: decode(x.content) }} />
                        </View>
                    ))
                }
                {
                    followupS.map((x, l) => (
                        <View key={l} style={{ flexDirection: 'column', backgroundColor: '#E0E0E0', padding: 10, marginBottom: 20 }}>
                            <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                            <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                            {x.is_private==1?<Icon type='font-awesome-5' name='lock' color='#D97E7E' ></Icon>:null}
                            </View>
                            <HTML source={{ html: decode(x.content) }} />
                        </View>
                    ))
                }
                {
                    solutionS.map((x, l) => (
                        <View key={l} style={{ flexDirection: 'column', backgroundColor: '#9FD6ED', padding: 10, marginBottom: 20 }}>
                            <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                            <HTML source={{ html: decode(x.content) }} />
                        </View>
                    ))
                }
                {
                    task.map((x, l) => (

                        <View key={l} style={{ flexDirection: 'column', backgroundColor: '#FEDA90', padding: 10, marginBottom: 20 }}>
                            <Text style={{ color: 'gray' }}>{x.date_mod}</Text>
                            <HTML source={{ html: decode(x.content) }} />
                        </View>
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