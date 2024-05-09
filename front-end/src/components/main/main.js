import './main.css';
import { FaUsers } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { BiSolidInbox } from 'react-icons/bi';
import { MdHelp } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { RiMore2Fill } from 'react-icons/ri';

const Main = function () {
    const [searchInput, setSearchInput] = useState('');

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="main-header-nav-bar-container">
                <div className="nav-bar-item-container">
                    <div className="nav-bar-item">
                        <FaUsers style={{ fontSize: '25px', marginRight: '10px' }} />
                        <span>Friends</span>
                    </div>
                    <div className="seperate-bar--straight"></div>
                    <span className="nav-bar-item active">Online</span>
                    <span className="nav-bar-item">All</span>
                    <span className="nav-bar-item">Pending</span>
                    <span className="nav-bar-item">Blocked</span>
                    <span className="nav-bar-item color--white background-color--green">Add Friend</span>
                </div>
                <div className="nav-bar-item-container">
                    <div className="nav-bar-item add-label">
                        <IoChatbubbleEllipsesSharp style={{ fontSize: '25px' }} aria-label="New group DM" />
                        <span className="hover-label">New group DM</span>
                    </div>
                    <div className="seperate-bar--straight"></div>

                    <div className="nav-bar-item last add-label">
                        <BiSolidInbox style={{ fontSize: '25px' }} />
                        <span className="hover-label">Inbox</span>
                    </div>

                    <div className="nav-bar-item last add-label">
                        <MdHelp style={{ fontSize: '25px' }} />
                        <span className="hover-label">Help</span>
                    </div>
                </div>
            </div>
            <div className="main-content-container">
                <div className="main-home-content-header">
                    <input
                        onChange={(e) => handleChangeSearchInput(e)}
                        className="main-home-content-header__input"
                        placeholder="Search"
                        value={searchInput}
                    />
                    {searchInput?.length <= 0 ? (
                        <FiSearch className="rotate" style={{ fontSize: '20px' }} />
                    ) : (
                        <IoMdClose className="rotate" style={{ fontSize: '20px' }} />
                    )}
                </div>
                <span className="main-home-content-item-container__header">ONLINE - 1</span>

                {[1, 2, 3, 4].map((data, index) => {
                    return (
                        <div key={index} className="main-home-content-item-container">
                            <div className="home-control-bar-item main">
                                <div className="flex--row">
                                    <div className="avt-user-container">
                                        <img src="/image/cat.jpg" className="avt-user" />
                                    </div>
                                    <div className="name-status-user-container">
                                        <span>Stupid Cat</span>
                                        <span className="status">Offline</span>
                                    </div>
                                </div>
                                <div className="flex--row">
                                    <div className="icon-container--circle add-label">
                                        <IoChatbubbleEllipsesSharp style={{ fontSize: '20px', margin: 'auto' }} />
                                        <span className="hover-label">Message</span>
                                    </div>
                                    <div className="icon-container--circle add-label">
                                        <RiMore2Fill style={{ fontSize: '20px', margin: 'auto' }} />
                                        <span className="hover-label">More</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="main-right-bar home">
                <span className="main-right-bar-home__header">Activity Now</span>
                <div className="main-right-bar-home-container">
                    <div className="main-right-bar-home-container-notify-container">
                        <span className="right-bar-home__subtitle">It's quite for now...</span>
                        <span className="right-bar-home__subtitle--smaller">
                            When a friend starts an activity—like playing a game or hanging out on voice—we’ll show it
                            here!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
