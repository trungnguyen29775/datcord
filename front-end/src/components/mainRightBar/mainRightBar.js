import './mainRightBar.css';

const MainRightBar = function () {
    return (
        <div className="main-right-bar home">
            <span className="main-right-bar-home__header">Activity Now</span>
            <div className="main-right-bar-home-container">
                <div className="main-right-bar-home-container-notify-container">
                    <span className="right-bar-home__subtitle">It's quite for now...</span>
                    <span className="right-bar-home__subtitle--smaller">
                        When a friend starts an activity—like playing a game or hanging out on voice—we’ll show it here!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MainRightBar;
