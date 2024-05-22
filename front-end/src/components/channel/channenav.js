import './channel.css';
import { RiSettings5Fill } from 'react-icons/ri';
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineSpatialAudioOff } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { FaMicrophone, FaMicrophoneSlash, FaHeadphones } from 'react-icons/fa';
const ChannelNav = function () {
    //TODO API server
    return (
        <div className="control-bar-container">
            <div className="server-header">Server Name</div>

            <div className="text-channel">
                <div className="text-channel-header">
                    {/* <IoIosArrowDown style={{ fontSize: '12px' }} /> */}
                    <IoIosArrowForward style={{ fontSize: '12px' }} />
                    <span>Text Channel</span>
                </div>
                <div className="text-channel-item">
                    <BsChatLeftText style={{ fontSize: '12px' }} />
                    <span>Channel 1</span>
                </div>
            </div>
            <div className="voice-channel">
                <div className="voice-channel-header">
                    {/* <IoIosArrowDown style={{ fontSize: '12px' }} /> */}
                    <IoIosArrowForward style={{ fontSize: '12px' }} />
                    <span>voice Channel</span>
                </div>
                <div className="voice-channel-item">
                    <MdOutlineSpatialAudioOff style={{ fontSize: '12px' }} />
                    <span>Channel 2</span>
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
                    {/* <FaMicrophoneSlash  /> */}

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

export default ChannelNav;
