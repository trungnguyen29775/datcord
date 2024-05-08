import './main.css';
import { FaUsers } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { BiSolidInbox } from 'react-icons/bi';
import { MdHelp } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';

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
                    <div className="nav-bar-item">
                        <IoChatbubbleEllipsesSharp style={{ fontSize: '25px' }} />
                    </div>
                    <div className="seperate-bar--straight"></div>

                    <div className="nav-bar-item last">
                        <BiSolidInbox style={{ fontSize: '25px' }} />
                    </div>

                    <div className="nav-bar-item last">
                        <MdHelp style={{ fontSize: '25px' }} />
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
                <div className="main-home-content-item-container">
                    <span className="main-home-content-item-container__header">ONLINE - 1</span>
                    <div className="home-control-bar-item">
                        <div className="seperate-bar"></div>
                        <div className="avt-user-container">
                            <img src="/image/cat.jpg" className="avt-user" />
                        </div>
                        <span>Stupid Cat</span>
                    </div>
                </div>
            </div>
            <div className="main-right-bar"></div>
        </div>
    );
};

export default Main;
