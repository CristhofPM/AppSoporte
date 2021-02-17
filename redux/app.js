import axios from 'axios';
import base64 from 'react-native-base64'
import * as FileSystem from 'expo-file-system'
const init = {
    //session
    session: {
        session_token: '',
        server: '',
        app_token: '',
        valTok: false

    },
    error: null,
    profiles: {
        active_profile: {}
    },
    fullsession: {
        session: {}
    },
    profile_photo: null,
    config: {},
    countTicket: {},

    //activos
    computer: {},
    monitor: {},
    networkE: {},
    peripheral: {},
    phone: {},
    printer: {},
    software: {},
    dcroom: {},
    rack: {},
    enclosure: {},
    cluster: {},
    pdu: {},
    passivedcequipment: {},
    Item_DeviceSimcard: {},
    server_rom: {},
    lineas: {},
    domains: {},
    licenses: {},
    certificates: {},
    ticket: [],
    cartridgeitem: {},
    consumableitem: {},
    app_token: '',
    msj: '',
    val: null,

    //dropdown
    category: [],
    state: [],
    user: [],
    group: [],
    supplier: [],
    RequestType: [],
    Location: [],
    taskCategory: [],
    solutionTypes: [],

    //ticket subitem
    ticketValidation: {},
    ticketCost: {},
    problem_ticket: {},
    change_ticket: {},
    solution: {},
    followup: {},
    ticketTask: {},
    document_item: [],

    //template
    followupTemplates: [],
    solutionTemplates: [],
    taskTemplates: [],
    documentCategory: []

}
//sesion
const INIT_SESSION = 'INIT_SESSION';
const ERROR = 'ERROR';
const GET_PROFILE = 'GET_PROFILE';
const FULL_SESSION = 'FULL_SESSION';
const PROFILE_PHOTO = 'PROFILE_PHOTO';
const COUNT = 'COUNT';
const KILLSESION = 'KILLSESION'


//activos
const COMPUTER = 'COMPUTER';
const MONITOR = 'MONITOR';
const NETWORKE = 'NETWORKE';
const PERIPHERAL = 'PERIPHERAL';
const PHONE = 'PHONE';
const PRINTER = 'PRINTER';
const SOFTWARE = 'SOFTWARE';
const DCROOM = 'DCROOM';
const RACK = 'RACK';
const ENCLOSURE = 'ENCLOSURE';
const CARTRIDGE = 'CARTRIDGE';
const CONSUMABLE = 'CONSUMABLE';
const DEVICESSIMCARD = 'DEVICESSIMCARD';
const PDU = 'PDU';
const PASSIVEDCEQUIPMENT = 'PASSIVEDCEQUIPMENT';
const SERVERROOM = 'SERVERROOM';
const LINES = 'LINES';
const DOMAINS = 'DOMAINS';
const LICENSES = 'LICENSES';
const CERTIFICATES = 'CERTIFICATES';
const CLUSTER = 'CLUSTER';

//dropdown
const LOCATION = 'LOCATION';
const REQUESTTYPE = 'REQUESTTYPE';
const SUPPLIER = 'SUPPLIER';
const GROUP = 'GROUP';
const STATE = 'STATE';
const CATEGORY = 'CATEGORY';
const USER = 'USER';
const MSJ = 'MSJ';
const TICKET = 'TICKET';
const VAL = 'VAL';
const CONFIG = 'CONFIG';
const TASKCATEGORY = 'TASKCATEGORY';
const SOLUTIONTYPE = 'SOLUTIONTYPE';

//template
const FOLLOWUPTEMPLATE = 'FOLLOWUPTEMPLATE';
const SOLUTIONTEMPLATE = 'SOLUTIONTEMPLATE';
const TASKTEMPLATE = 'TASKTEMPLATE';
const DOCUMENTCATEGORY = 'DOCUMENTCATEGORY';



//ticket type
const TICKETVALIDATION = 'TICKETVALIDATION';
const TICKETCOST = 'TICKETCOST';
const PROBLEM_TICKET = 'PROBLEM_TICKET';
const CHANGE_TICKET = 'CHANGE_TICKET';
const ITILSOLUTION = 'ITILSOLUTION';
const ITIlFOLLOWUP = 'ITIlFOLLOWUP';
const TICKETTASK = 'TICKETTASK';
const DOCUMENT_ITEM = 'DOCUMENT_ITEM'
export const AppModule = (state = init, data) => {
    switch (data.type) {
        case INIT_SESSION:
            return { session: data.payload }
        case ERROR:
            return { ...state, error: data.payload }
        case FULL_SESSION:
            return { ...state, fullsession: data.payload }
        case GET_PROFILE:
            return { ...state, profiles: data.payload }
        case PROFILE_PHOTO:
            return { ...state, profile_photo: data.payload }
        case COMPUTER:
            return { ...state, computer: data.payload }
        case CARTRIDGE:
            return { ...state, cartridgeitem: data.payload }
        case PASSIVEDCEQUIPMENT:
            return { ...state, passivedcequipment: data.payload }
        case CONSUMABLE:
            return { ...state, consumableitem: data.payload }
        case MONITOR:
            return { ...state, monitor: data.payload }
        case NETWORKE:
            return { ...state, networkE: data.payload }
        case DEVICESSIMCARD:
            return { ...state, Item_DeviceSimcard: data.payload }
        case CLUSTER:
            return { ...state, cluster: data.payload }
        case SUPPLIER:
            return { ...state, supplier: data.payload }
        case USER:
            return { ...state, user: data.payload }
        case GROUP:
            return { ...state, group: data.payload }
        case STATE:
            return { ...state, state: data.payload }
        case REQUESTTYPE:
            return { ...state, RequestType: data.payload }
        case VAL:
            return { ...state, val: data.payload }
        case LOCATION:
            return { ...state, Location: data.payload }
        case PERIPHERAL:
            return { ...state, peripheral: data.payload }
        case COUNT:
            return { ...state, countTicket: data.payload }
        case PHONE:
            return { ...state, phone: data.payload }
        case PRINTER:
            return { ...state, printer: data.payload }
        case SOFTWARE:
            return { ...state, software: data.payload }
        case PDU:
            return { ...state, pdu: data.payload }
        case DCROOM:
            return { ...state, dcroom: data.payload }
        case RACK:
            return { ...state, rack: data.payload }
        case ENCLOSURE:
            return { ...state, enclosure: data.payload }
        case SERVERROOM:
            return { ...state, server_rom: data.payload }
        case LINES:
            return { ...state, lines: data.payload }
        case DOMAINS:
            return { ...state, domains: data.payload }
        case DOCUMENT_ITEM:
            return { ...state, document_item: data.payload }
        case LICENSES:
            return { ...state, licenses: data.payload }
        case CERTIFICATES:
            return { ...state, certificates: data.payload }
        case CONFIG:
            return { ...state, config: data.payload }
        case TICKET:
            return { ...state, ticket: data.payload }
        case CATEGORY:
            return { ...state, category: data.payload }
        case MSJ:
            return { ...state, msj: data.payload }
        case TICKETVALIDATION:
            return { ...state, ticketValidation: data.payload }
        case TICKETCOST:
            return { ...state, ticketCost: data.payload }
        case PROBLEM_TICKET:
            return { ...state, problem_ticket: data.payload }
        case CHANGE_TICKET:
            return { ...state, change_ticket: data.payload }
        case ITILSOLUTION:
            return { ...state, solution: data.payload }
        case TICKETTASK:
            return { ...state, ticketTask: data.payload }
        case ITIlFOLLOWUP:
            return { ...state, followup: data.payload }
        case TASKCATEGORY:
            return { ...state, taskCategory: data.payload }
        case FOLLOWUPTEMPLATE:
            return { ...state, followupTemplates: data.payload }
        case SOLUTIONTEMPLATE:
            return { ...state, solutionTemplates: data.payload }
        case DOCUMENTCATEGORY:
            return { ...state, documentCategory: data.payload }
        case TASKTEMPLATE:
            return { ...state, taskTemplates: data.payload }
        case SOLUTIONTYPE:
            return { ...state, solutionTypes: data.payload }
        case KILLSESION:
            return init;
        default:
            return { ...state }
            break;
    }

}

export const getCount = (server, type, session_token, app_token, val) => async (dispatch) => {
    try {
        let URL = server + '/apirest.php/search/' + type;
        let res;

        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`

                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`
                }
            })
        }

        dispatch({ type: COUNT, payload: res.data })

    } catch (error) {

    }
}
export const clearMsj = () => async (dispatch) => {
    dispatch({ type: ERROR, payload: null })
}
export const clearMsjG = () => async (dispatch) => {
    dispatch({ type: MSJ, payload: null })
}
//iniciar sesion
export const initSession = (user, pass, server, app_token, val) => async (dispatch) => {
    try {
        //const token = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64')
        const token = base64.encode(`${user}:${pass}`);

        const URL = server + '/apirest.php/initSession'
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`,
                    'App-Token': `${app_token}`
                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`
                }
            })
        }

        const response = {
            session_token: res.data,
            server: server,
            app_token: app_token,
            valTok: val

        }
        dispatch({ type: INIT_SESSION, payload: response })
    } catch (error) {

        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor Inicio'

        })



    }
}

//obtener la configuracion
export const getConfig = (server, session_token, app_token, val) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/getGlpiConfig';
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`

                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`
                }
            })
        }

        dispatch({ type: CONFIG, payload: res.data })
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor'

        })
    }
}

//obtiene el perfil 
export const getProfile = (server, session_token, app_token, val) => async (dispatch) => {
    try {

        const URL = server + '/apirest.php/getActiveProfile';
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`

                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,

                }
            })
        }

        dispatch({ type: GET_PROFILE, payload: res.data.active_profile })
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor Perfil'

        })
    }
}

//obtiene la sesion
export const getfullSession = (server, session_token, app_token, val) => async (dispatch) => {
    try {

        const URL = server + '/apirest.php/getFullSession';
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`

                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,

                }
            })
        }

        if (res.status == 200) {
            dispatch({ type: FULL_SESSION, payload: res.data.session })
        }
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor Sesion'

        })
    }
}


//obtiene la foto
export const getPhotoProfile = (server, id, session_token, app_token, val) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/User/' + id + '/Picture'
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'image/png',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`

                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'image/png',
                    'Session-Token': `${session_token.session_token}`
                }
            })
        }


    } catch (error) {
        dispatch({
            type: ERROR, payload: error.message

        })
    }
}

//obtiene un item
export const getItem = (type, server, session_token, count, val, app_token, val1) => async (dispatch) => {
    try {
        let URL;
        if (val) {
            URL = server + '/apirest.php/' + type + '/?range=0-' + count;

        } else {
            URL = server + '/apirest.php/' + type

        }
        let res;
        if (val1) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`
                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`
                }
            })
        }
        console.log('API', type, res.status)

        if (type == 'Computer') {
            dispatch({ type: COMPUTER, payload: res.data })
        } else if (type == 'Monitor') {
            dispatch({ type: MONITOR, payload: res.data })
        } else if (type == 'NetworkEquipment') {
            dispatch({ type: NETWORKE, payload: res.data })
        } else if (type == 'Peripheral') {
            dispatch({ type: PERIPHERAL, payload: res.data })
        } else if (type == 'Phone') {
            dispatch({ type: PHONE, payload: res.data })
        } else if (type == 'Printer') {
            dispatch({ type: PRINTER, payload: res.data })
        } else if (type == 'Software') {
            dispatch({ type: SOFTWARE, payload: res.data })
        } else if (type == 'Licenses') {
            dispatch({ type: LICENSES, payload: res.data })
        } if (type == 'Certificate') {
            dispatch({ type: CERTIFICATES, payload: res.data })
        } else if (type == 'Line') {
            dispatch({ type: LINES, payload: res.data })
        } else if (type == 'DCRoom') {
            dispatch({ type: DCROOM, payload: res.data })
        } else if (type == 'Rack') {
            dispatch({ type: RACK, payload: res.data })
        } else if (type == 'Enclosure') {
            dispatch({ type: ENCLOSURE, payload: res.data })
        } else if (type == 'cartridgeitem') {
            dispatch({ type: CARTRIDGE, payload: res.data })
        } else if (type == 'consumableitem') {
            dispatch({ type: CONSUMABLE, payload: res.data })
        } else if (type == 'PDU') {
            dispatch({ type: PDU, payload: res.data })
        } else if (type == 'PassiveDCEquipment') {
            dispatch({ type: PASSIVEDCEQUIPMENT, payload: res.data })
        } else if (type == 'Simcards') {
            dispatch({ type: DEVICESSIMCARD, payload: res.data })
        } else if (type == 'Ticket') {

            dispatch({ type: TICKET, payload: res.data })
        } else if (type == 'Domain') {
            dispatch({ type: DOMAINS, payload: res.data })
        } else if (type == 'Cluster') {
            dispatch({ type: CLUSTER, payload: res.data })
        } else if (type == 'itilcategory') {
            dispatch({ type: CATEGORY, payload: res.data })
        } else if (type == 'state') {
            dispatch({ type: STATE, payload: res.data })
        } else if (type == 'user') {
            dispatch({ type: USER, payload: res.data })
        } else if (type == 'group') {
            dispatch({ type: GROUP, payload: res.data })
        } else if (type == 'Supplier') {
            dispatch({ type: SUPPLIER, payload: res.data })
        } else if (type == 'RequestType') {
            dispatch({ type: REQUESTTYPE, payload: res.data })
        } else if (type == 'Location') {
            dispatch({ type: LOCATION, payload: res.data })
        } else if (type == 'DocumentCategory') {
            dispatch({ type: DOCUMENTCATEGORY, payload: res.data })
        } else if (type == 'ITILFollowupTemplate') {
            dispatch({ type: FOLLOWUPTEMPLATE, payload: res.data })
        } else if (type == 'SolutionTemplate') {
            dispatch({ type: SOLUTIONTEMPLATE, payload: res.data })
        } else if (type == 'TaskTemplate') {
            dispatch({ type: TASKTEMPLATE, payload: res.data })
        } else if (type == 'TaskCategory') {
            dispatch({ type: TASKCATEGORY, payload: res.data })
        } else if (type == 'SolutionType') {
            dispatch({ type: SOLUTIONTYPE, payload: res.data })
        }

    } catch (error) {
        console.log(type, error)
        dispatch({
            type: ERROR, payload: error.message

        })


    }
}


export const addItem = (json, server, session_token, type, app_token, val) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/' + type;

        let config;
        if (val) {
            config = {
                method: 'post',
                url: URL,
                headers: {
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`,
                    'Content-Type': 'application/json'
                },
                data: json
            };

        } else {
            config = {
                method: 'post',
                url: URL,
                headers: {
                    'Session-Token': `${session_token.session_token}`,
                    'Content-Type': 'application/json'
                },
                data: json
            };
        }

        const res = await axios(config)

        console.log(res.data)
        if (res.status == 201) {
            dispatch({ type: MSJ, payload: 'Peticion creada' })
        }
    } catch (error) {
        console.log(type, error)
        dispatch({
            type: ERROR, payload: error.message

        })


    }
}

export const killsession = (session_token, server, app_token, val) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/killSession';
        let res;
        if (val) {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`
                }
            })
        } else {
            res = await axios.get(URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                }
            })
        }

        if (res.status == 200) {
            dispatch({ type: KILLSESION, payload: null })
        }
    } catch (error) {

        dispatch({
            type: ERROR, payload: 'Error al cerrar sesión'

        })
    }
}

export const getSubItem = (server, session_token, type, app_token, val) => async (dispatch) => {

    try {
        let res;
        if (val) {
            res = await axios.get(server, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`
                }
            })
        } else {
            res = await axios.get(server, {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': `${session_token.session_token}`
                }
            })
        }
        console.log(type, res.status)
        if (res.status == 200) {
            if (type == 'TicketTask') {
                dispatch({ type: TICKETTASK, payload: res.data })
            } else if (type == 'TicketValidation') {
                dispatch({ type: TICKETVALIDATION, payload: res.data })

            } else if (type == 'TicketCost') {
                dispatch({ type: TICKETCOST, payload: res.data })

            } else if (type == 'Problem_Ticket') {
                dispatch({ type: PROBLEM_TICKET, payload: res.data })

            } else if (type == 'Change_Ticket') {
                dispatch({ type: CHANGE_TICKET, payload: res.data })

            } else if (type == 'ITILSolution') {
                dispatch({ type: ITILSOLUTION, payload: res.data })

            } else if (type == 'ITILFollowup') {
                dispatch({ type: ITIlFOLLOWUP, payload: res.data })

            } else if (type == 'Document_Item') {
                dispatch({ type: DOCUMENT_ITEM, payload: res.data })
            }
        }
    } catch (error) {
        console.log(type, error)
    }
}

export const uploadFile = (file, uploadManifest, server, session_token, app_token, val) => async (dispatch) => {
    try {
        server = server + '/apirest.php/Document'
        let options;
        if (val) {
            options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Session-Token': `${session_token.session_token}`,
                    'App-Token': `${app_token}`
                },
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: {
                    "uploadManifest": uploadManifest,
                    "type": "application/json"
                }
            }
        } else {
            options = {
                headers: {

                    'Content-Type': 'multipart/form-data',
                    'Session-Token': `${session_token.session_token}`
                },
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                parameters: {
                    "uploadManifest": uploadManifest,
                    "type": "application/json"
                }
            }
        }
        console.log(file.uri)
        let res = FileSystem.uploadAsync(server, file.uri, options)
        res.then(r => {
            console.log(r)
            if (r.status === 201 || r.status === 200) {
                dispatch({ type: MSJ, payload: 'Elemento añadido correctamente' })
            } else {
                dispatch({ type: MSJ, payload: 'Error al subir elemento' })

            }
        })


    } catch (error) {
        console.log(error)
    }
}