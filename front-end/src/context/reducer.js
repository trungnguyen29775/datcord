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
    ADD_REQUEST_SEND,
    ADD_REQUEST_RECEIVE,
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
    console.log(action.payload);
    console.log(state);
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
                userData: {
                    username: action.payload.username,
                    name: action.payload.name,
                    dob: action.payload.dob,
                    avtFilePath: action.payload.avt_file_path,
                },
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
            return {
                ...state,
                userData: {
                    ...state.userData,
                    friend: [...state.userData.friend, action.payload],
                },
            };
        }

        case REMOVE_FRIEND_RECEIVE: {
            const targetIndex = state.userData.requestReceive.findIndex(
                (request) => request.friendId === action.payload.friendId,
            );
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
            console.log('Cant find friend receive');
            return state;
        }

        case REMOVE_FRIEND_REQUEST: {
            const targetIndex = state.userData.requestSend.findIndex(
                (request) => request.friendId === action.payload.friendId,
            );
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
            const targetIndex = state.userData.friend.findIndex(
                (friend) => friend.friendId === action.payload.friendId,
            );

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

        case ADD_REQUEST_SEND: {
            console.log(action.payload);
            return {
                ...state,
                userData: {
                    ...state.userData,
                    requestSend: [...state.userData.requestSend, action.payload],
                },
            };
        }

        case ADD_REQUEST_RECEIVE: {
            console.log(action.payload);
            const format = {
                avtFilePath: action.payload.avtFilePathSender,
                friendId: action.payload.friendId,
                name: action.payload.nameSender,
                username: action.payload.usernameSender,
                dob: action.payload.dob,
            };
            return {
                ...state,
                userData: {
                    ...state.userData,
                    requestReceive: [...state.userData.requestReceive, format],
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
