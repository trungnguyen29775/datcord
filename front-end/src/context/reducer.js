import { CHANGE_TO_DIRECTED_MESSAGE_MODE, RECEIVE_MESSAGE, SEND_MESSAGE } from './constant';

export const initState = {
    login: true,
    userData: { username: '1', userId: '2' },
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
        default: {
            console.log('Hello');
            return state;
        }
    }
};
export default reducer;
