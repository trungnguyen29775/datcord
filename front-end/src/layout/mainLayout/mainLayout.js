import { useContext, useEffect } from 'react';
import Channel from '../../components/channel/channel';
import ChannelNav from '../../components/channel/channenav';
import ControlBar from '../../components/controlBar/controlBar';
import LeftSideNavBar from '../../components/leftSideNavBar/leftSideNavBar';
import Main from '../../components/main/main';
import './mainLayout.css';
import { socket } from '../../socket';
import StateContext from '../../context/context';
import instance from '../../axios';
import { addFriend, addRequestReceive, getDataUser, removeFriendRequest } from '../../context/action';

const MainLayout = function () {
    const [state, dispatchState] = useContext(StateContext);

    useEffect(() => {
        if (state.login) {
            socket.emit('online', { usernameOnline: state.userData.username });
            console.log(state);
            instance
                .post('/get-friend-data', { username: state.userData.username })
                .then((res) => {
                    if (res.status === 200) dispatchState(getDataUser(res.data));
                })
                .catch((err) => {
                    console.log(err);
                });
            socket.on('recieved-message', (data) => {
                console.log(data);
            });
            socket.on('recieved-friend-request', (data) => {
                dispatchState(addRequestReceive(data));
            });

            socket.on('receive-friendship-change', (data) => {
                console.log(data);
                switch (data.action.name) {
                    case 'ADD': {
                        const format = {
                            username: data.usernameSender,
                            name: data.name,
                            avtFilePath: data.avtFilePath ? data.avtFilePath : null,
                            friendId: data.friendId,
                        };
                        dispatchState(addFriend(format));
                        dispatchState(removeFriendRequest(format));
                        break;
                    }
                    default: {
                        console.log('Hi');
                    }
                }
            });
            return () => {
                socket.off('recieved-message');
                socket.off('recieved-friend-request');
                socket.off('receive-friendship-change');
            };
        }
    }, [state.login]);

    return (
        <div className="main-layout-wrapper">
            <LeftSideNavBar />
            <ControlBar />
            <Main />
            {/*
                 <ChannelNav />
            <Channel />
                */}
        </div>
    );
};

export default MainLayout;
