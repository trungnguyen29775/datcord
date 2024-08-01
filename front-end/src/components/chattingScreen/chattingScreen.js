import './chattingScreen.css';
import { FaPhoneVolume } from 'react-icons/fa6';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { BiSolidInbox } from 'react-icons/bi';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../context/context';
import { socket } from '../../socket';
import { BsFillSendFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
import { addMessage } from '../../context/action';

const ChattingScreen = function () {
    const [state, dispatchState] = useContext(StateContext);
    const [messageInput, setMessageInput] = useState('');
    useEffect(() => {
        tippy('[data-tippy-content]', {
            arrow: true,
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (state.mode.type === 'directedMessage') {
            let messageTemp = messageInput.trim();
            if (messageTemp !== '') {
                await socket.emit('send-message', {
                    targetUser: state.mode.data.username,
                    message: messageTemp,
                    sender: state.userData.username,
                    avtFilePath: state.userData.avtFilePath,
                    friendId: state.mode.data.friendId,
                    nameSender: state.userData.name,
                });
                const format = {
                    avtFilePath: state.userData.avtFilePath ? state.userDate.avtFilePath : '/image/cat.jpg',
                    date: '',
                    message:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                    sender: state.userData.name,
                };
                await dispatchState(addMessage(format));
                const chatContainer = document.querySelector('.message-list');
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    };
    const handleChangeMessageInput = (event) => {
        setMessageInput(event.target.value);
    };

    useEffect(() => {
        const messageContainer = document.querySelector('form.chat-bar');
        const checkLine = /\n+/gi;
        if (messageInput.length == 0) messageContainer.style.height = 42 + 'px';
        if (messageInput.match(checkLine)) {
            messageContainer.style.height = messageInput.match(checkLine).length * 20 + 42 + 'px';
        }
    }, [messageInput]);
    return (
        <>
            <div className="main-header-nav-bar-container chatting">
                <div className="nav-bar-item-container chatting">
                    <div className="chatting-sever-info">
                        <div className="avt-user-container">
                            <img src="/image/cat.jpg" className="avt-user" />
                        </div>
                        <span>2</span>
                    </div>
                    <div className="chatting-icon-control-container">
                        <div className="nav-bar-item">
                            <FaPhoneVolume
                                data-tippy-content="Start Voice Call"
                                style={{ fontSize: '20px' }}
                                aria-label="Start Voice Call"
                            />
                        </div>
                        <div className="nav-bar-item ">
                            <BsFillCameraVideoFill
                                data-tippy-content="Start Video Call"
                                style={{ fontSize: '20px' }}
                                aria-label="Start Video Call"
                            />
                        </div>
                        <div className="nav-bar-item ">
                            <FaUserCircle
                                data-tippy-content="Hide User Profile"
                                style={{ fontSize: '20px' }}
                                aria-label="Hide User Profile"
                            />
                        </div>
                        <div className="nav-bar-item ">
                            <BiSolidInbox data-tippy-content="Inbox" style={{ fontSize: '20px' }} aria-label="Inbox" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Chatting Content */}
            <div className="main-content-container chatting">
                <div className="message-list">
                    {state.chatData.chatChannelData.messageData?.map((messages, index) => (
                        <div className="message-item" key={index}>
                            <div className="avt-user-container">
                                <img src={messages.avtFilePath} className="avt-user" />
                            </div>

                            <div className="message">
                                <div className="username">{messages.sender}</div>
                                <div className="user-message">{messages.message}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <form className="chat-bar" onSubmit={(e) => handleSubmit(e)}>
                    <div className="chat-bar__button">
                        <BsPlusCircleFill style={{ fontSize: '18px', margin: 'auto' }} />
                    </div>
                    <textarea
                        onChange={(e) => handleChangeMessageInput(e)}
                        value={messageInput}
                        className="chat-bar-input"
                    />
                    <button type="submit" className="chat-bar__button">
                        <BsFillSendFill style={{ fontSize: '18px', margin: 'auto' }} />
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChattingScreen;
