import Channel from '../../components/channel/channel';
import ChannelNav from '../../components/channel/channenav';
import ControlBar from '../../components/controlBar/controlBar';
import LeftSideNavBar from '../../components/leftSideNavBar/leftSideNavBar';
import Main from '../../components/main/main';
import './mainLayout.css';

const MainLayout = function () {
    return (
        <div className="main-layout-wrapper">
            <LeftSideNavBar />
            {/* <ControlBar />
            <Main /> */}
            <ChannelNav />
            <Channel />
        </div>
    );
};

export default MainLayout;
