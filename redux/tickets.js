import axios from 'axios';
const init = {

    /** TICKETS */
    tickets: [],
    /** CODIGO DE RESPUESTA DE LAS PETICIONES */
    status: { cod: null, type: null },
    /** 
     * ticketValidation :=> VALIDACIONES DE TICKET
     * ticketSolution :=> SOLUCIONES DE LAS PETICIONES
     * ticketFollowup :=> SEGUIMIENTO DE LAS PETICIONES
     * ticketDocumentItem :=> DOCUMENTOS DE LAS PETICIONES
     * 
    **/
    ticketValidation: [],
    ticketSolution: [],
    ticketFollowup: [],
    ticketTask: [],
    ticketDocumentItem: [],
    /** PLANTILLAS PARA RESPONDER */
    Followuptemplate: [],
    solutionTemplate: [],
    taskTemplate: [],
    documentCategory: [],

    solutiontype: []
}

export const TICKET_VALIDATION = "TICKET_VALIDATION";
export const TICKET_SOLUTION = "TICKET_SOLUTION";
export const TICKET_FOLLOWUP = "TICKET_FOLLOWUP";
export const TICKET_TASK = "TICKET_TASK";
export const TICKET_DOCUMENT_ITEM = "TICKET_DOCUMENT_ITEM";
const STATUS = "STATUS";
export const TICKETS = "TICKETS";


export const FOLLOWUPTEMPLATE = 'FOLLOWUPTEMPLATE';
export const SOLUTIONTEMPLATE = 'SOLUTIONTEMPLATE';
export const TASKTEMPLATE = 'TASKTEMPLATE';
export const DOCUMENTCATEGORY = 'DOCUMENTCATEGORY';

export const SOLUTION_TYPE = "SOLUTION_TYPE";
export const TicketModule = (state = init, data) => {

    switch (data.type) {
        case TICKET_VALIDATION:
            return { ...state, ticketValidation: data.payload };
        case TICKET_SOLUTION:
            return { ...state, ticketSolution: data.payload };
        case TICKET_FOLLOWUP:
            return { ...state, ticketFollowup: data.payload };
        case TICKET_TASK:
            return { ...state, ticketTask: data.payload };
        case TICKET_DOCUMENT_ITEM:
            return { ...state, ticketDocumentItem: data.payload };
        case STATUS:
            return { ...state, status: data.payload };
        case TICKETS:
            return { ...state, tickets: data.payload };
        case FOLLOWUPTEMPLATE:
            return { ...state, Followuptemplate: data.payload };
        case SOLUTIONTEMPLATE:
            return { ...state, solutionTemplate: data.payload };
        case TASKTEMPLATE:
            return { ...state, taskTemplate: data.payload };
        case DOCUMENTCATEGORY:
            return { ...state, documentCategory: data.payload };
        case SOLUTION_TYPE:
            return { ...state, solutiontype: data.payload };
        default:
            return { ...state };
    }

}

export const clearStatus = (val) => async (dispatch) => {
    dispatch({ type: STATUS, payload: val })
}


export const getItemTicket = (
    type, server, session_token, count,
    val, app_token, val1, TYPE
) => async (dispatch) => {
    try {
        let URL;
        if (val) {
            URL = server + '/apirest.php/' + type + '/?range' + count;

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
        dispatch({
            type: TYPE, payload: res.data

        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: STATUS, payload: { cod: error.status, type: TYPE }

        })
    }

}


export const getSubItemTicket = (
    url, session_token, type, app_token, valTok
) => async (dispatch) => {
    console.log(url)
    try {
        let URL = url;
        if (valTok) {
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
        dispatch({
            type: type, payload: res.data

        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: STATUS, payload: { cod: error.status, type: TYPE }

        })
    }

}


/** AGREGA UN NUEVO ITEM */
export const itemForm = (json, server, session_token, type, app_token, val, method, TYPE) => async (dispatch) => {
    try {
        const URL = server + '/apirest.php/' + type;
        let config;
        if (val) {
            config = {
                method: method,
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
                method: method,
                url: URL,
                headers: {
                    'Session-Token': `${session_token.session_token}`,
                    'Content-Type': 'application/json'
                },
                data: json
            };
        }
        const res = await axios(config);
        dispatch({ type: STATUS, payload: { cod: res.status, type: TYPE } });
    } catch (error) {
        dispatch({
            type: STATUS, payload: { cod: error.status, type: TYPE }

        })
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
            dispatch({ type: STATUS, payload: { code: r.status, type: 'FILE' } })
        })


    } catch (error) {
        dispatch({ type: STATUS, payload: { code: error.status, type: 'FILE' } })
    }
}