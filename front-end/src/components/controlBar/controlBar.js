import './controlBar.css';
import { FaUsers } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { MdFamilyRestroom } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { RiSettings5Fill } from 'react-icons/ri';

import { FaMicrophone, FaMicrophoneSlash, FaHeadphones } from 'react-icons/fa';
const ControlBar = function () {
    return (
        <div className="control-bar-container">
            <div className="control-bar-header">
                <div className="header-input">Find or start a conversation</div>
            </div>
            <div className="home-control-bar-item active">
                <FaUsers style={{ fontSize: '25px', marginRight: '15px' }} />
                <span>Friends</span>
            </div>
            <div className="home-control-bar-item">
                <FaStore style={{ fontSize: '25px', marginRight: '15px' }} />
                <span>Shop</span>
            </div>
            <div className="home-control-bar-item">
                <MdFamilyRestroom style={{ fontSize: '25px', marginRight: '15px' }} />
                <span>Family Center</span>
            </div>

            {/* Directed Message */}
            <div className="home-control-directed-message-container">
                <div className="directed-message-header-container">
                    <span>DIRECTED MESSAGE</span>
                    <FaPlus style={{ fontSize: '10px' }} className="pointer" />
                </div>
                <div className="home-control-bar-item">
                    <div className="avt-user-container">
                        <img src="/image/cat.jpg" className="avt-user" />
                    </div>
                    <span>Stupid Cat</span>
                </div>
            </div>
            {/* User control */}
            <div className="control-bar__footer">
                <div className="home-control-bar-item footer">
                    <div className="avt-user-container">
                        <img src="/image/cat.jpg" className="avt-user" />
                    </div>
                    <div className="name-status-user-container">
                        <span className="footer-user-name">Stupid Cat</span>
                        <span className="footer-user-status">Offline</span>
                    </div>
                </div>
                <div className="control-bar-footer-icon-container">
                    <div className="control-bar-footer-icon add-label">
                        <FaMicrophone style={{ fontSize: '18px' }} />
                        <span className="hover-label top">Turn off Microphone</span>
                    </div>

                    <div className="control-bar-footer-icon add-label">
                        <FaHeadphones style={{ fontSize: '18px' }} />
                        <span className="hover-label top">Deafen</span>
                    </div>
                    <div className="control-bar-footer-icon add-label">
                        <RiSettings5Fill style={{ fontSize: '18px' }} />
                        <span className="hover-label top">Setting</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlBar;
