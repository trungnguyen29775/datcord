import { CHANGE_TO_DIRECTED_MESSAGE_MODE } from './constant';

export const changeToDirectedMessageMode = (payload) => {
    return {
        type: CHANGE_TO_DIRECTED_MESSAGE_MODE,
        payload,
    };
};
