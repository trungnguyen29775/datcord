import { useContext, useEffect, useState } from 'react';
import './channel.css';
import { BsFillSendFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
import StateContext from '../../context/context';
import { socket } from '../../socket';
const Channel = function () {
    const [messageInput, setMessageInput] = useState('');
    const [state, dispatchState] = useContext(StateContext);

    // Function
    const handleChangeMessageInput = (event) => {
        setMessageInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit('send-message', { targetUser: 'hello', message: messageInput, sender: 'Thanh' });
    };

    // Use Effect
    useEffect(() => {
        const messageContainer = document.querySelector('form.chat-bar');
        const checkLine = /\n+/gi;
        if (messageInput.length == 0) messageContainer.style.height = 42 + 'px';
        if (messageInput.match(checkLine)) {
            messageContainer.style.height = messageInput.match(checkLine).length * 20 + 42 + 'px';
        }
    }, [messageInput]);

    return (
        <div className="container">
            <div className="channel-header">{state.chatData.chatChannelData.name}</div>
            <div className="channel-container">
                <div className="channel-content">
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

                {/* Member Info */}
                <div className="member-info">
                    <div className="online-list">
                        <span>Online</span>
                        <div className="home-control-bar-item">
                            <div className="avt-user-container">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <span>Stupid Cat</span>
                        </div>
                    </div>
                    <div className="offline-list">
                        <span>Offline</span>
                        <div className="home-control-bar-item">
                            <div className="avt-user-container">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <span>Stupid Cat</span>
                        </div>

                        <div className="offline-item"></div>
                        <div className="offline-item"></div>
                        <div className="offline-item"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channel;
