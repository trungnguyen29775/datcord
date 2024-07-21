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
import {
    addDirectedMessage,
    addFriend,
    addRequestSend,
    changeToDirectedMessageMode,
    removeFriend,
    removeFriendReceive,
    removeFriendRequest,
} from '../../context/action';
import { NoContentImage } from '../../constant/component.constant';
import { socket } from '../../socket';
import instance from '../../axios';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { ACCEPT_FRIEND, DELETE_FRIEND } from '../../constant/endPointAPI';

const Main = function () {
    const [searchInput, setSearchInput] = useState('');
    const [homeFriendNavStatus, setHomeNavStatus] = useState('online');
    const [state, dispatchState] = useContext(StateContext);
    const [sendFriendRequestStatus, setSendFriendRequestStatus] = useState('');
    useEffect(() => {
        console.log(state);
        tippy('[data-tippy-content]', {
            arrow: true,
        });
    }, [state]);

    const handelSendFriendRequest = (event) => {
        const targetUsername = document.querySelector('.home-add-friend__input').value;
        if (targetUsername === state.userData.username) {
            setSendFriendRequestStatus('fail');
        } else {
            instance
                .post('/add-friend', { usernameSender: state.userData.username, usernameReceiver: targetUsername })
                .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        setSendFriendRequestStatus('succeed');
                        document.querySelector('.home-add-friend__input').value = '';
                        socket.emit('send-friend-request', {
                            targetUser: targetUsername,
                            usernameSender: state.userData.username,
                            nameSender: state.userData.name,
                            avtFilePathSender: state.userData.avtFilePath ? state.userData.avtFilePath : null,
                            friendId: res.data.friendId,
                        });
                        dispatchState(addRequestSend(res.data));
                        console.log(res.data);
                    } else if (res.status === 201) {
                        setSendFriendRequestStatus('fail');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleAcceptFriend = (e, payload) => {
        const targetUsername = payload.username;
        e.stopPropagation();

        instance
            .post(ACCEPT_FRIEND, { targetUsername, currentUsername: state.userData.username })
            .then((res) => {
                dispatchState(addFriend(payload));
                dispatchState(removeFriendReceive(payload));
                socket.emit('friendship-change', {
                    targetUser: targetUsername,
                    usernameSender: state.userData.username,
                    friendId: payload.friendId,
                    name: state.userData.name,
                    dob: state.userData.dob,
                    avtFilePath: state.userData.avtFilePath ? state.userData.avtFilePath : null,
                    action: {
                        name: 'ADD',
                        type: 'friend',
                    },
                });
            })
            .catch((err) => console.log(err));
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

    const handleChangeToDirectedMessageMode = (event, data) => {
        event.stopPropagation();
        dispatchState(changeToDirectedMessageMode(data));
        dispatchState(addDirectedMessage(data));
    };

    const handleShow = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target.closest('.user-hide-dropdown');
        target?.classList?.remove('user-hide-dropdown');
        target?.classList?.add('user-show-dropdown');
    };

    const handelHide = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const target = event.target.closest('.user-more__dropdown');
        const fatherNode = target.closest('.user-show-dropdown');
        document.addEventListener('click', function (event) {
            fatherNode?.classList.remove('user-show-dropdown');
            fatherNode?.classList.add('user-hide-dropdown');
        });
    };

    const handleDeleteFriendship = (event, payload, { type }) => {
        event.preventDefault();
        event.stopPropagation();
        switch (type) {
            case 'FRIEND': {
                instance
                    .post(DELETE_FRIEND, {
                        targetUsername: payload.username,
                        currentUsername: state.userData.username,
                        friendId: payload.friendId,
                    })
                    .then((res) => {
                        dispatchState(removeFriend(payload));
                        socket.emit('friendship-change', {
                            targetUser: payload.username,
                            usernameSender: state.userData.username,
                            friendId: payload.friendId,
                            action: { name: 'DELETE', type: 'FRIEND' },
                            avtFilePath: state.userData.avtFilePath,
                            name: state.userData.name,
                            dob: state.userData.dob,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            }
            case 'REQUEST_RECEIVE': {
                instance
                    .post(DELETE_FRIEND, {
                        targetUsername: payload.username,
                        currentUsername: state.userData.username,
                        friendId: payload.friendId,
                    })
                    .then((res) => {
                        dispatchState(removeFriendReceive(payload));
                        socket.emit('friendship-change', {
                            targetUser: payload.username,
                            usernameSender: state.userData.username,
                            friendId: payload.friendId,
                            action: { name: 'DELETE', type: 'REQUEST_SEND' },
                            avtFilePath: state.userData.avtFilePath,
                            name: state.userData.name,
                            dob: state.userData.dob,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            }
            case 'REQUEST_SEND': {
                instance
                    .post(DELETE_FRIEND, {
                        targetUsername: payload.username,
                        currentUsername: state.userData.username,
                        friendId: payload.friendId,
                    })
                    .then((res) => {
                        dispatchState(removeFriendRequest(payload));
                        socket.emit('friendship-change', {
                            targetUser: payload.username,
                            usernameSender: state.userData.username,
                            friendId: payload.friendId,
                            action: { name: 'DELETE', type: 'REQUEST_RECEIVE' },
                            avtFilePath: state.userData.avtFilePath,
                            name: state.userData.name,
                            dob: state.userData.dob,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                break;
            }
            default: {
                console.log('Error');
                break;
            }
        }
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
                                <div
                                    key={index}
                                    className="main-home-content-item-container"
                                    onClick={(e) => handleChangeToDirectedMessageMode(e, data)}
                                >
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
                                            <div
                                                onClick={(e) => handleShow(e)}
                                                data-tippy-content="More"
                                                className="icon-container--circle user-hide-dropdown"
                                            >
                                                <div
                                                    onMouseLeave={(e) => handelHide(e)}
                                                    className="user-more__dropdown"
                                                >
                                                    <div className="dropdown-item">Start a video call</div>
                                                    <div className="dropdown-item">Start a voice call</div>
                                                    <div
                                                        className="dropdown-item danger"
                                                        onClick={(e) =>
                                                            handleDeleteFriendship(e, data, { type: 'FRIEND' })
                                                        }
                                                    >
                                                        Remove friend
                                                    </div>
                                                </div>
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
                                                onClick={(e) => handleAcceptFriend(e, data)}
                                                data-tippy-content="Accept"
                                                className="icon-container--circle add-label"
                                            >
                                                <FaCheck style={{ fontSize: '20px', margin: 'auto' }} />
                                            </div>
                                            <div
                                                onClick={(e) =>
                                                    handleDeleteFriendship(e, data, { type: 'REQUEST_RECEIVE' })
                                                }
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
                                                onClick={(e) =>
                                                    handleDeleteFriendship(e, data, { type: 'REQUEST_SEND' })
                                                }
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
