import {
    CHANGE_TO_DIRECTED_MESSAGE_MODE,
    GET_DATA_USER,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    USER_LOGGED_IN,
} from './constant';

export const changeToDirectedMessageMode = (payload) => {
    return {
        type: CHANGE_TO_DIRECTED_MESSAGE_MODE,
        payload,
    };
};

export const sendMessage = (payload) => {
    return {
        type: SEND_MESSAGE,
        payload,
    };
};

export const receiveMessage = (payload) => {
    return {
        type: RECEIVE_MESSAGE,
        payload,
    };
};

export const userLoggedIn = (payload) => {
    return {
        type: USER_LOGGED_IN,
        payload,
    };
};

export const getDataUser = (payload) => {
    return {
        type: GET_DATA_USER,
        payload,
    };
};
