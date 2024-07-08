import {
    ADD_FRIEND,
    ADD_REQUEST_RECEIVE,
    ADD_REQUEST_SEND,
    CHANGE_TO_DIRECTED_MESSAGE_MODE,
    GET_DATA_USER,
    RECEIVE_MESSAGE,
    REMOVE_FRIEND,
    REMOVE_FRIEND_RECEIVE,
    REMOVE_FRIEND_REQUEST,
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

export const removeFriendRequest = (payload) => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        payload,
    };
};

export const removeFriendReceive = (payload) => {
    return {
        type: REMOVE_FRIEND_RECEIVE,
        payload,
    };
};

export const addFriend = (payload) => {
    return {
        type: ADD_FRIEND,
        payload,
    };
};

export const removeFriend = (payload) => {
    return {
        type: REMOVE_FRIEND,
        payload,
    };
};

export const addRequestSend = (payload) => {
    return {
        type: ADD_REQUEST_SEND,
        payload,
    };
};

export const addRequestReceive = (payload) => {
    return {
        type: ADD_REQUEST_RECEIVE,
        payload,
    };
};
