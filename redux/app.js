import axios from 'axios';
import base64 from 'react-native-base64'
import * as FileSystem from 'expo-file-system'
const init = {
    session: {
        session_token: '',
        server: '',

    },
    error: null,
    profiles: {
        active_profile: {}
    },
    fullsession: {
        session: {}
    },
    profile_photo: null,
    config:{},


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
    cluster:{},
    pdu:{},
    passivedcequipment:{},
    Item_DeviceSimcard:{},
    server_rom:{},
    lineas:{},
    domains:{},
    licenses:{},
    certificates:{},
    ticket: [],
    cartridgeitem:{},
    consumableitem:{},
    app_token: '',
    msj: '',
    val:null,
    category:[],
    state:[],
    user:[],
    group:[],
    supplier:[],
    RequestType:[],
    Location:[]

}

const INIT_SESSION = 'INIT_SESSION';
const ERROR = 'ERROR';
const GET_PROFILE = 'GET_PROFILE';
const FULL_SESSION = 'FULL_SESSION';
const PROFILE_PHOTO = 'PROFILE_PHOTO';

const KILLSESION = 'KILLSESION'

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
const CARTRIDGE ='CARTRIDGE';
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
            return {...state,cartridgeitem:data.payload}
        case PASSIVEDCEQUIPMENT:
            return {...state,passivedcequipment:data.payload}
        case CONSUMABLE:
            return {...state,consumableitem:data.payload}
        case MONITOR:
            return { ...state, monitor: data.payload }
        case NETWORKE:
            return { ...state, networkE: data.payload }
        case DEVICESSIMCARD:
            return {...state,Item_DeviceSimcard:data.payload}
        case CLUSTER:
            return {...state,cluster:data.payload}
        case SUPPLIER:
            return {...state,supplier:data.payload}
        case USER:
            return {...state,user:data.payload}
        case GROUP:
            return {...state,group:data.payload}
        case STATE:
            return {...state,state:data.payload}
        case REQUESTTYPE:
            return {...state,RequestType:data.payload}
        case VAL:
            return {...state,val:data.payload}
        case LOCATION:
            return {...state,Location:data.payload}
        case PERIPHERAL:
            return { ...state, peripheral: data.payload }
        case PHONE:
            return { ...state, phone: data.payload }
        case PRINTER:
            return { ...state, printer: data.payload }
        case SOFTWARE:
            return { ...state, software: data.payload }
        case PDU:
            return {...state,pdu:data.payload}
        case DCROOM:
            return { ...state, dcroom: data.payload }
        case RACK:
            return { ...state, rack: data.payload }
        case ENCLOSURE:
            return { ...state, enclosure: data.payload }
        case SERVERROOM:
            return {...state,server_rom:data.payload}
        case LINES:
            return {...state,lines:data.payload}
        case DOMAINS:
            return {...state,domains:data.payload}
        case LICENSES:
            return {...state,licenses:data.payload}
        case CERTIFICATES:
            return {...state,certificates:data.payload}
        case CONFIG:
            return {...state,config:data.payload}
        case TICKET:
            return { ...state, ticket: data.payload }
        case CATEGORY:
            return {...state,category:data.payload}
        case MSJ:
            return { ...state, msj: data.payload }
        case KILLSESION:
            return init;
        default:
            return { ...state }
            break;
    }

}
export const clearMsj = () => async (dispatch) => {
    dispatch({ type: ERROR, payload: null })
}
export const clearMsjG = () => async (dispatch) => {
    dispatch({ type: MSJ, payload: null })
}
//iniciar sesion
export const initSession = (user, pass, server) => async (dispatch) => {
    try {
        //const token = Buffer.from(`${user}:${pass}`, 'utf8').toString('base64')
        const token = base64.encode(`${user}:${pass}`);

        const URL = server + '/apirest.php/initSession'

        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'
            }
        })
        const response = {
            session_token: res.data,
            server: server,

        }
        dispatch({ type: INIT_SESSION, payload: response })
    } catch (error) {
        if(error.response.status==401){
            dispatch({
                type: ERROR, payload: 'Usuario y/o contraseña incorrecta'
    
            })
        }else{
            dispatch({
                type: ERROR, payload: 'Error al conectar al servidor Inicio'
    
            })
        }
        

    }
}

//obtener la configuracion
export const getConfig =(server,session_token)=>async(dispatch)=>{
    try {
        const URL = server + '/apirest.php/getGlpiConfig';
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'

            }
        })
        dispatch({ type: CONFIG, payload: res.data })
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor'

        })
    }
}

//obtiene el perfil 
export const getProfile = (server, session_token) => async (dispatch) => {
    try {

        const URL = server + '/apirest.php/getActiveProfile';
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'

            }
        })
        dispatch({ type: GET_PROFILE, payload: res.data.active_profile })
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor Perfil'

        })
    }
}

//obtiene la sesion
export const getfullSession = (server, session_token) => async (dispatch) => {
    try {

        const URL = server + '/apirest.php/getFullSession';
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'

            }
        })
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
export const getPhotoProfile = (server, id, session_token) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/User/' + id + '/Picture'
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'image/png',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'

            }
        })

    } catch (error) {
        dispatch({
            type: ERROR, payload: error.message

        })
    }
}

//obtiene un item
export const getItem = (type, server, session_token) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/' + type
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'
            }
        })

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
        } else if(type=='Licenses'){
            dispatch({type:LICENSES,payload:res.data})
        }if(type=='Certificate'){
            dispatch({type:CERTIFICATES,payload:res.data})
        }else if(type=='Line'){
            dispatch({type:LINES,payload:res.data})
        }else if (type == 'DCRoom') {
            dispatch({ type: DCROOM, payload: res.data })
        } else if (type == 'Rack') {
            dispatch({ type: RACK, payload: res.data })
        } else if (type == 'Enclosure') {
            dispatch({ type: ENCLOSURE, payload: res.data })
        }else if(type=='cartridgeitem'){
            dispatch({type:CARTRIDGE,payload:res.data})
        }else if(type=='consumableitem'){
            dispatch({type:CONSUMABLE,payload:res.data})
        }else if(type=='PDU'){
            dispatch({type:PDU,payload:res.data})
        }else if(type=='PassiveDCEquipment'){
            dispatch({type:PASSIVEDCEQUIPMENT,payload:res.data})
        }else if(type=='Simcards'){
            dispatch({type:DEVICESSIMCARD,payload:res.data})
        } else if (type == 'Ticket') {

            dispatch({ type: TICKET, payload: res.data })
        }else if(type=='Domain'){
            dispatch({type:DOMAINS,payload:res.data})
        }else if(type=='Cluster'){
            dispatch({type:CLUSTER,payload:res.data})
        }else if(type=='itilcategory'){
            dispatch({type:CATEGORY,payload:res.data})
        }else if(type=='state'){
            dispatch({type:STATE,payload:res.data})
        }else if(type=='user'){
            dispatch({type:USER,payload:res.data})
        }else if(type=='group'){
            dispatch({type:GROUP,payload:res.data})
        }else if(type=='Supplier'){
            dispatch({type:SUPPLIER,payload:res.data})
        }else if(type=='RequestType'){
            dispatch({type:REQUESTTYPE,payload:res.data})
        }else if(type=='Location'){
            dispatch({type:LOCATION,payload:res.data})
        }
        
    } catch (error) {
        if(error.response.status==401){
            dispatch({type:VAL,payload:false})
        }else{
            dispatch({
                type: ERROR, payload: error.message
    
            })
        }
        
    }
}


export const addItem = (json, server, session_token, type) => async (dispatch) => {
    try {
      const URL = server + '/apirest.php/' + type;

      var config = {
        method: 'post',
        url:  URL,
        headers: { 
          'Session-Token':  `${session_token.session_token}`,
          'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB', 
          'Content-Type': 'application/json'
        },
        data : json
      };
      
        const res = await axios(config)
        
        
        if (res.status == 201) {
            dispatch({ type: MSJ, payload: 'Peticion creada' })
        }
    } catch (error) {
        
            dispatch({
                type: ERROR, payload: error.message
    
            })
        
       
    }
}

export const killsession =(session_token,server)=>async(dispatch)=>{
    try {
        const URL = server + '/apirest.php/killSession' ;
        const res = await axios.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Session-Token': `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'
            }
        })
        if(res.status==200){
            dispatch({type:KILLSESION,payload:null})
        }
    } catch (error) {

        dispatch({
            type: ERROR, payload: 'Error al cerrar sesión'

        })
    }
}