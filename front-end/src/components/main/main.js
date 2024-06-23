import './main.css';
import { FaUsers } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { BiSolidInbox } from 'react-icons/bi';
import { MdHelp } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useContext, useEffect, useState } from 'react';
import { RiMore2Fill } from 'react-icons/ri';
import StateContext from '../../context/context';
import { changeToDirectedMessageMode } from '../../context/action';
import { NoContentImage } from '../../constant/component.constant';
import { socket } from '../../socket';
import instance from '../../axios';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

const Main = function () {
    const [searchInput, setSearchInput] = useState('');
    const [homeFriendNavStatus, setHomeNavStatus] = useState('online');
    const [state, dispatchState] = useContext(StateContext);
    const [sendFriendRequestStatus, setSendFriendRequestStatus] = useState('');
    useEffect(() => {
        console.log(state);
    }, [state]);

    const handelSendFriendRequest = (event) => {
        const targetUsername = document.querySelector('.home-add-friend__input').value;
        instance
            .post('/add-friend', { usernameSender: state.userData.username, usernameReceiver: targetUsername })
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    setSendFriendRequestStatus('succeed');
                    document.querySelector('.home-add-friend__input').value = '';
                    socket.emit('send-friend-request', { targetUser: targetUsername, sender: state.userData.username });
                    console.log(res.data);
                } else if (res.status === 201) {
                    setSendFriendRequestStatus('fail');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleTest = (event) => {
        socket.emit('send-friend-request', { targetUser: '2', sender: state.userData.username });
    };

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const handleChangeNavFriend = (event) => {
        const currentActive = document.querySelector('.nav-bar-item.active');
        currentActive.classList.remove('active');
        event.target.classList.add('active');
        setHomeNavStatus(event.target.textContent.toLowerCase());
    };

    const handleChangeToDirectedMessageMode = (event) => {
        dispatchState(changeToDirectedMessageMode(event));
    };

    tippy('[data-tippy-content]', {
        arrow: true,
    });
    return (
        <div className="main-container">
            <div className="main-header-nav-bar-container">
                <div className="nav-bar-item-container">
                    <div className="nav-bar-item">
                        <FaUsers style={{ fontSize: '25px', marginRight: '10px' }} />
                        <span>Friends</span>
                    </div>
                    <div className="seperate-bar--straight"></div>
                    <span className="nav-bar-item active" onClick={(e) => handleChangeNavFriend(e)}>
                        Online
                    </span>
                    <span className="nav-bar-item" onClick={(e) => handleChangeNavFriend(e)}>
                        All
                    </span>
                    <span className="nav-bar-item" onClick={(e) => handleChangeNavFriend(e)}>
                        Pending
                    </span>
                    <span className="nav-bar-item" onClick={(e) => handleChangeNavFriend(e)}>
                        Blocked
                    </span>
                    <span
                        className="nav-bar-item color--white background-color--green"
                        onClick={(e) => handleChangeNavFriend(e)}
                    >
                        Add Friend
                    </span>
                </div>
                <div className="nav-bar-item-container">
                    <div className="nav-bar-item add-label" onClick={(e) => handleTest(e)}>
                        <IoChatbubbleEllipsesSharp
                            data-tippy-content="New group DM"
                            style={{ fontSize: '25px' }}
                            aria-label="New group DM"
                        />
                    </div>
                    <div className="seperate-bar--straight"></div>

                    <div className="nav-bar-item last add-label">
                        <BiSolidInbox data-tippy-content="Inbox" style={{ fontSize: '25px' }} />
                    </div>

                    <div className="nav-bar-item last add-label">
                        <MdHelp style={{ fontSize: '25px' }} />
                        <span className="hover-label">Help</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content-container">
                {homeFriendNavStatus != 'add friend' ? (
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
                ) : (
                    ''
                )}

                {/* Content Home */}

                {homeFriendNavStatus === 'online' ? (
                    <>
                        <span className="main-home-content-item-container__header">Online -1</span>
                        {[1, 2, 3, 4].map((data, index) => {
                            return (
                                // Online friend
                                <div
                                    key={index}
                                    className="main-home-content-item-container"
                                    onClick={(e) => handleChangeToDirectedMessageMode(e)}
                                >
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
                                            <div
                                                data-tippy-content="Message"
                                                className="icon-container--circle add-label"
                                            >
                                                <IoChatbubbleEllipsesSharp
                                                    style={{ fontSize: '20px', margin: 'auto' }}
                                                />
                                            </div>
                                            <div data-tippy-content="More" className="icon-container--circle add-label">
                                                <RiMore2Fill style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : homeFriendNavStatus === 'all' ? (
                    <>
                        <span className="main-home-content-item-container__header">
                            ALL FRIENDS - {state.userData.friend?.length}
                        </span>

                        {state.userData?.friend?.map((data, index) => {
                            return (
                                // All friend
                                <div key={index} className="main-home-content-item-container">
                                    <div className="home-control-bar-item main">
                                        <div className="flex--row">
                                            <div className="avt-user-container">
                                                <img src="/image/cat.jpg" className="avt-user" />
                                            </div>
                                            <div className="name-status-user-container">
                                                <span>{data.name}</span>
                                                <span className="status">Offline</span>
                                            </div>
                                        </div>
                                        <div className="flex--row">
                                            <div
                                                data-tippy-content="Message"
                                                className="icon-container--circle add-label"
                                            >
                                                <IoChatbubbleEllipsesSharp
                                                    style={{ fontSize: '20px', margin: 'auto' }}
                                                />
                                            </div>
                                            <div data-tippy-content="More" className="icon-container--circle add-label">
                                                <RiMore2Fill style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : homeFriendNavStatus === 'pending' ? (
                    <>
                        <span className="main-home-content-item-container__header">
                            PENDING - {state.userData.requestReceive?.length + state.userData.requestSend?.length}
                        </span>
                        {state.userData.requestReceive?.map((data, index) => {
                            return (
                                // Pending friend request
                                <div key={index} className="main-home-content-item-container">
                                    <div className="home-control-bar-item main">
                                        <div className="flex--row">
                                            <div className="avt-user-container">
                                                <img src="/image/cat.jpg" className="avt-user" />
                                            </div>
                                            <div className="name-status-user-container">
                                                <span>{data.name}</span>
                                                <span className="status">Incoming Friend Request</span>
                                            </div>
                                        </div>
                                        <div className="flex--row">
                                            <div
                                                data-tippy-content="Accept"
                                                className="icon-container--circle add-label"
                                            >
                                                <FaCheck style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                            <div
                                                data-tippy-content="Ignore"
                                                className="icon-container--circle add-label"
                                            >
                                                <RxCross2 style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {state.userData.requestSend?.map((data, index) => {
                            return (
                                // Pending friend request
                                <div key={index} className="main-home-content-item-container">
                                    <div className="home-control-bar-item main">
                                        <div className="flex--row">
                                            <div className="avt-user-container">
                                                <img src="/image/cat.jpg" className="avt-user" />
                                            </div>
                                            <div className="name-status-user-container">
                                                <span>{data.name}</span>
                                                <span className="status">Outgoing Friend Request</span>
                                            </div>
                                        </div>
                                        <div className="flex--row">
                                            <div
                                                data-tippy-content="Cancel"
                                                className="icon-container--circle add-label"
                                            >
                                                <RxCross2 style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : homeFriendNavStatus === 'blocked' ? (
                    [1].map((data, index) => {
                        return (
                            // Blocked list
                            <div key={index} className="main-home-content-item-container">
                                <NoContentImage />
                            </div>
                        );
                    })
                ) : (
                    // Add friend
                    <div className="main-home-content-item-container">
                        <div className="home-add-friend-header">
                            <h3>ADD FRIEND</h3>
                            <span>You can add friends with their Discord username</span>
                            <div
                                className={
                                    sendFriendRequestStatus === 'succeed'
                                        ? 'home-add-friend-header__search succeed'
                                        : sendFriendRequestStatus === 'fail'
                                        ? 'home-add-friend-header__search fail'
                                        : 'home-add-friend-header__search'
                                }
                            >
                                <input
                                    placeholder="You can add friends with their Discord username"
                                    className="home-add-friend__input"
                                />
                                <button onClick={(e) => handelSendFriendRequest(e)}>Send Friend Request</button>
                            </div>
                            {sendFriendRequestStatus === 'succeed' ? (
                                <span className="send-friend-request-notify">Success! Your request was sent </span>
                            ) : sendFriendRequestStatus === 'fail' ? (
                                <span className="send-friend-request-notify red">Something went wrong </span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="seperate-bar--horizontal"></div>
                        <div className="no-content-container">
                            <NoContentImage />
                        </div>
                    </div>
                )}
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
