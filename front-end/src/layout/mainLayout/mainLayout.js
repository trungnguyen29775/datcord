import { useContext, useEffect } from 'react';
import Channel from '../../components/channel/channel';
import ChannelNav from '../../components/channel/channenav';
import ControlBar from '../../components/controlBar/controlBar';
import LeftSideNavBar from '../../components/leftSideNavBar/leftSideNavBar';
import Main from '../../components/main/main';
import './mainLayout.css';
import { socket } from '../../socket';
import StateContext from '../../context/context';

const MainLayout = function () {
    const [state, dispatchState] = useContext(StateContext);

    useEffect(() => {
        if (state.login) {
            socket.emit('online', { usernameOnline: 'hello' });
            console.log(state);
        }
    }, [state]);

    useEffect(() => {
        console.log('hello');
        if (state.login) {
            socket.on('recieve-message', (data) => {
                console.log(data);
            });
        }
    });

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
