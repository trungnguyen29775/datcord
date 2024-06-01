import './channel.css';
import { RiSettings5Fill } from 'react-icons/ri';
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineSpatialAudioOff } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { FaMicrophone, FaMicrophoneSlash, FaHeadphones } from 'react-icons/fa';
import { useContext } from 'react';
import StateContext from '../../context/context';
const ChannelNav = function () {
    const [state, dispatchState] = useContext(StateContext);

    //TODO API server
    return (
        <div className="control-bar-container">
            <div className="server-header">{state.chatData.nameSever}</div>

            <div className="text-channel">
                <div className="text-channel-header">
                    {/* <IoIosArrowDown style={{ fontSize: '12px' }} /> */}
                    <IoIosArrowForward style={{ fontSize: '12px' }} />
                    <span>Text Channel</span>
                </div>
                {state.chatData.chatChannelList?.map((channel, index) => (
                    <div className="text-channel-item" key={index}>
                        <BsChatLeftText style={{ fontSize: '12px' }} />
                        <span>{channel.channelName}</span>
                    </div>
                ))}
            </div>
            <div className="voice-channel">
                <div className="voice-channel-header">
                    {/* <IoIosArrowDown style={{ fontSize: '12px' }} /> */}
                    <IoIosArrowForward style={{ fontSize: '12px' }} />
                    <span>voice Channel</span>
                </div>

                {state.chatData.voiceChannel?.map((channel, index) => (
                    <div className="voice-channel-item" key={index}>
                        <MdOutlineSpatialAudioOff style={{ fontSize: '12px' }} />
                        <span>{channel.voiceChannelName}</span>
                    </div>
                ))}
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
