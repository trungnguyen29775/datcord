import './channel.css';
import { BsFillSendFill } from 'react-icons/bs';
import { BsPlusCircleFill } from 'react-icons/bs';
const Channel = function () {
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div className="container">
            <div className="channel-header">Channel 1</div>
            <div className="channel-container">
                <div className="channel-content">
                    <div className="message-list">
                        <div className="message-item">
                            <div className="avt-user-container">
                                <img src="/image/cat.jpg" className="avt-user" />
                            </div>
                            <div className="message">
                                <div className="username">Thanh</div>
                                <div className="user-message">hello</div>
                            </div>
                        </div>
                    </div>
                    <form className="chat-bar" onSubmit={(e) => handleSubmit(e)}>
                        <div className="chat-bar__button">
                            <BsPlusCircleFill style={{ fontSize: '18px', margin: 'auto' }} />
                        </div>
                        <input className="chat-bar-input" />
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
