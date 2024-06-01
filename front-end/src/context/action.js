import { CHANGE_TO_DIRECTED_MESSAGE_MODE, RECEIVE_MESSAGE, SEND_MESSAGE } from './constant';

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
