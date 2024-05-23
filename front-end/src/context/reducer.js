import { CHANGE_TO_DIRECTED_MESSAGE_MODE } from './constant';

export const initState = {
    login: true,
    userData: [],
    directedMessArray: [],
    mode: {
        type: 'home',
        data: [],
    },
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case CHANGE_TO_DIRECTED_MESSAGE_MODE: {
            return {
                ...state,
                mode: {
                    type: 'directedMessage',
                    data: [1],
                },
            };
        }

        default: {
            console.log('Hello');
            return state;
        }
    }
};
export default reducer;
