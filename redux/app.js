import axios from 'axios';
import base64 from 'react-native-base64'

const init = {
    session: {
        session_token: '',
        server: '',
        
    },
    error: null,
    profiles:{
        myprofiles:[]
    }

}
const INIT_SESSION = 'INIT_SESSION';
const ERROR = 'ERROR';
const GET_PROFILE = 'GET_PROFILE';
export const AppModule = (state = init, data) => {
    switch (data.type) {
        case INIT_SESSION:
            return { session: data.payload }
        case ERROR:
            return {...state,error:data.payload}
        case GET_PROFILE:
            return {...state,profiles:data.payload}
        default:
            return {...state}
            break;
    }

}
export const clearMsj = ()=>async(dispatch)=>{
    dispatch({type:ERROR,payload:null})
}
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
        console.log(error)
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor'
            
        })

    }
}


export const getProfile = (server,session_token)=>async (dispatch)=>{
    try {
        
        const URL = server+'/apirest.php/getFullSession';
        const res = await axios.get(URL,{
            headers:{
                'Content-Type': 'application/json',
                'Session-Token':  `${session_token.session_token}`,
                'App-Token': '8HLily4SwCo3yJv3NI3nTwowB3EFhAMuL9itKPQB'
                
            }
        })
        console.log(res.data)
        dispatch({type:GET_PROFILE,data:res.data})
    } catch (error) {
        dispatch({
            type: ERROR, payload: 'Error al conectar al servidor'
            
        })
    }
}