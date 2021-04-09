import axios from 'axios';

const init = {
    //template form
    ticketTemplateForm:{},
    TicketTemplateMandatoryField:[],
    TicketTemplatePredefinedField:[],
    TicketTemplateHiddenField:[],
    error:0
}

//templates form TICKET
const TEMPLATE_TICKET_FORM = "TEMPLATE_TICKET_FORM";
const TICKET_TEMPLATE_MANDATORY_FIELD  = "TICKET_TEMPLATE_MANDATORY_FIELD";
const TICKET_TEMPLATE_PREDEFINED_FIELD = "TICKET_TEMPLATE_PREDEFINED_FIELD";
const TICKET_TEMPLATE_HIDDEN_FILED = "TICKET_TEMPLATE_HIDDEN_FILED";
const ERROR = "ERROR";

export const ticketTemplateModule = (state = init, data) => {
    switch (data.type) {
        case TEMPLATE_TICKET_FORM:
            return {...state, ticketTemplateForm:data.payload}
        case TICKET_TEMPLATE_MANDATORY_FIELD:
            return {...state,TicketTemplateMandatoryField:data.payload }
        case TICKET_TEMPLATE_PREDEFINED_FIELD:
            return {...state, TicketTemplatePredefinedField:data.payload}
        case TICKET_TEMPLATE_HIDDEN_FILED:
            return {...state, TicketTemplateHiddenField:data.payload}
        case ERROR:
            return {...state, error:data.payload}
        default:
            return  {...state}
    }

}


export const getItemTemplates = (type, server, session_token, count, val, app_token, val1, TYPE) => async (dispatch) => {
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

        dispatch({type:TYPE,payload:res.data})

    } catch (error) {
        console.log(type, error)
        dispatch({
            type: ERROR, payload: error.status

        })


    }

}
