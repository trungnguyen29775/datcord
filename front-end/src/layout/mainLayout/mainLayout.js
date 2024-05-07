import ControlBar from '../../components/controlBar/controlBar';
import LeftSideNavBar from '../../components/leftSideNavBar/leftSideNavBar';
import Main from '../../components/main/main';
import './mainLayout.css';

const MainLayout = function () {
    return (
        <div className="main-layout-wrapper">
            <LeftSideNavBar />
            <ControlBar />
            <Main />
        </div>
    );
};

export default MainLayout;
