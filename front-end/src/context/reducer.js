import {
    USER_LOGGED_IN,
    CHANGE_TO_DIRECTED_MESSAGE_MODE,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    GET_DATA_USER,
    ADD_FRIEND,
    REMOVE_FRIEND_RECEIVE,
    REMOVE_FRIEND_REQUEST,
    REMOVE_FRIEND,
} from './constant';

export const initState = {
    login: false,
    userData: {},
    directedMessArray: [],
    mode: {
        type: 'home',
        data: [],
    },
    severList: [{ idSever: '', nameSever: '', avtSeverPath: '' }],

    chatData: {
        nameSever: '',
        idSever: '1',
        chatChannelList: [{ channelName: 'Channel 1' }, { channelName: 'Channel 2' }, { channelName: 'Channel 3' }],
        voiceChannel: [
            { voiceChannelName: 'Voice Channel 1' },
            { voiceChannelName: 'Voice Channel 2' },
            { voiceChannelName: 'Voice Channel 3' },
        ],
        chatChannelData: {
            name: 'Channel 2',
            messageData: [
                {
                    sender: 'Thanh',
                    avtFilePath: '/image/cat.jpg',
                    senderId: '2',
                    message: 'Hello',
                    date: '',
                },
                {
                    sender: 'Thanh',
                    avtFilePath: '/image/cat.jpg',
                    senderId: '2',
                    message: 'Hello',
                    date: '',
                },
                {
                    sender: 'Thanh',
                    avtFilePath: '/image/cat.jpg',
                    senderId: '2',
                    message: 'Hello',
                    date: '',
                },
            ],
        },
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
        case SEND_MESSAGE: {
            return {
                ...state,
                chatData: {
                    ...state.chatData,
                    chatChannelData: {
                        ...state.chatData.chatChannelData,
                        message: [...state.chatData.chatChannelData.message, action.payload],
                    },
                },
            };
        }
        case RECEIVE_MESSAGE: {
            return {
                ...state,
                chatData: {
                    ...state.chatData,
                    chatChannelData: {
                        ...state.chatData.chatChannelData,
                        message: [...state.chatData.chatChannelData.message, action.payload],
                    },
                },
            };
        }

        case USER_LOGGED_IN: {
            return {
                ...state,
                login: true,
                userData: { username: action.payload.username, name: action.payload.name, dob: action.payload.dob },
            };
        }

        case GET_DATA_USER: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload,
                },
            };
        }

        case ADD_FRIEND: {
            console.log(action.payload);
            return {
                ...state,
                userData: {
                    ...state.userData,
                    friend: [...state.userData.friend, action.payload],
                },
            };
        }

        case REMOVE_FRIEND_RECEIVE: {
            const targetIndex = state.userData.requestReceive?.indexOf(action.payload);
            if (targetIndex != -1) {
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        requestReceive: state.userData.requestReceive
                            .slice(0, targetIndex)
                            .concat(
                                state.userData.requestReceive.slice(
                                    targetIndex + 1,
                                    state.userData.requestReceive.length,
                                ),
                            ),
                    },
                };
            }
        }

        case REMOVE_FRIEND_REQUEST: {
            console.log(action.payload);
            const targetIndex = state.userData.requestSend?.indexOf(action.payload);

            return {
                ...state,
                userData: {
                    ...state.userData,
                    requestSend: state.userData.requestSend
                        .slice(0, targetIndex)
                        .concat(state.userData.requestSend.slice(targetIndex + 1, state.userData.requestSend.length)),
                },
            };
        }

        case REMOVE_FRIEND: {
            console.log(action.payload);
            const targetIndex = state.userData.friend?.indexOf(action.payload);

            return {
                ...state,
                userData: {
                    ...state.userData,
                    friend: state.userData.friend
                        .slice(0, targetIndex)
                        .concat(state.userData.friend.slice(targetIndex + 1, state.userData.friend.length)),
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
