import './channel.css';
import { BsFillSendFill } from 'react-icons/bs';
const Channel = function () {
    return (
        <div className="container">
            <div className="channel-header">Channel 1</div>
            <div className="channel-container">
                <div className="channel-content">
                    <div className="message-list">
                        <div className="message-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="message">
                                <div className="username">Thanh</div>
                                <div className="user-message">hello</div>
                            </div>
                        </div>
                        <div className="message-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="message">
                                <div className="username">Thanh</div>
                                <div className="user-message">hello</div>
                            </div>
                        </div>
                        <div className="message-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="message">
                                <div className="username">Thanh</div>
                                <div className="user-message">hello</div>
                            </div>
                        </div>
                    </div>
                    <form className="chat-bar">
                        <div className="chat-bar-input">
                            <input />
                        </div>
                        <button>
                            <BsFillSendFill style={{ fontSize: '12px' }} />
                        </button>
                    </form>
                </div>
                <div className="member-info">
                    <div className="online-list">
                        <span>Online</span>
                        <div className="online-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="username-online">Thanh</div>
                        </div>
                        <div className="online-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="username-online">Thanh</div>
                        </div>
                        <div className="online-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="username-online">Thanh</div>
                        </div>
                        <div className="online-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="username-online">Thanh</div>
                        </div>
                    </div>
                    <div className="offline-list">
                        <span>Offline</span>
                        <div className="offline-item">
                            <div className="user-avt">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="username-offline">Thanh</div>
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
