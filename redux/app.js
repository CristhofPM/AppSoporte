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
    //barra de busqueda activa
    valSearch: false,
    //estado de peticiones
    status: null,
    //perfil
    profiles: {
        active_profile: {}
    },
    //informacion de sesion
    fullsession: {
        session: {}
    },
    //foto de perfil
    profile_photo: null,
    //configuracion
    config: {},
    //numero de ticket
    countTicket: {},


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



}
//sesion
const INIT_SESSION = 'INIT_SESSION';
const STATUS = 'STATUS';
const GET_PROFILE = 'GET_PROFILE';
const FULL_SESSION = 'FULL_SESSION';
const PROFILE_PHOTO = 'PROFILE_PHOTO';
const KILLSESION = 'KILLSESION'

const SEARCH_VAL = 'SEARCH_VAL';
export const COUNT = 'COUNT';

//dropdown
export const LOCATION = 'LOCATION';
export const REQUESTTYPE = 'REQUESTTYPE';
export const SUPPLIER = 'SUPPLIER';
export const GROUP = 'GROUP';
export const STATE = 'STATE';
export const CATEGORY = 'CATEGORY';
export const USER = 'USER';
export const CONFIG = 'CONFIG';
export const TASKCATEGORY = 'TASKCATEGORY';
export const SOLUTIONTYPE = 'SOLUTIONTYPE';

export const AppModule = (state = init, data) => {
    switch (data.type) {
        case INIT_SESSION:
            return { session: data.payload };
        case STATUS:
            return { ...state, status: data.payload };
        case GET_PROFILE:
            return { ...state, profiles: data.payload };
        case FULL_SESSION:
            return { ...state, fullsession: data.payload };
        case COUNT:
            return { ...state, countTicket: data.payload };
        case KILLSESION:
            return init;
        case SEARCH_VAL:
            return { ...state, valSearch: data.payload };
        case LOCATION:
            return { ...state, Location: data.payload };
        case REQUESTTYPE:
            return { ...state, RequestType: data.payload };
        case SUPPLIER:
            return { ...state, supplier: data.payload };
        case GROUP:
            return { ...state, group: data.payload };
        case STATE:
            return { ...state, state: data.payload };
        case CATEGORY:
            return { ...state, category: data.payload };
        case USER:
            return { ...state, user: data.payload };
        case CONFIG:
            return { ...state, config: data.payload };
        case TASKCATEGORY:
            return { ...state, taskCategory: data.payload };
        case SOLUTIONTYPE:
            return { ...state, solutionTypes: data.payload };
        default:
            return { ...state }
    }

}

export const searchVal = (val) => async (dispatch) => {
    dispatch({ type: SEARCH_VAL, payload: val });
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
        if (res.status == 200 || res.status == 201) {
            dispatch({ type: INIT_SESSION, payload: response })

        } else {
            dispatch({

                type: STATUS, payload: res.status

            })
        }

    } catch (error) {

        dispatch({

            type: STATUS, payload: 400

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
            type: STATUS, payload: 'Error al conectar al servidor'

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
            type: STATUS, payload: 'Error al conectar al servidor Perfil'

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
            type: STATUS, payload: 'Error al conectar al servidor Sesion'

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
            type: STATUS, payload: error.message

        })
    }
}

//obtiene un item
export const getItem = (type, server, session_token, count, val, app_token, val1, TYPE) => async (dispatch) => {
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
        dispatch({ type: TYPE, payload: res.data })


    } catch (error) {
        dispatch({
            type: STATUS, payload: error.message

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
            type: STATUS, payload: 'Error al cerrar sesión'

        })
    }
}



export const clearStatus = (val) => async (dispatch) => {
    dispatch({ type: STATUS, payload: val })
}