import { Logo } from '../../constant/logo';
import './leftSideNavBar.css';
import { FiPlus } from 'react-icons/fi';
import { MdExplore } from 'react-icons/md';
import { IoMdDownload } from 'react-icons/io';
import { useState } from 'react';
const LeftSideNavBar = function () {
    const [navState, setNavState] = useState('home');

    const handleNavClick = (event) => {
        const targetIcon = event.target.closest('.nav-icon');
        const currentActiveIcon = document.querySelector('.nav-icon.active');
        currentActiveIcon.classList.remove('active');
        targetIcon.classList.add('active');
    };

    return (
        <div className="left-side-nav-bar-container">
            <div className="nav-icon active" onClick={handleNavClick}>
                <div className="left-side-active-bar"></div>

                <Logo />
            </div>

            <div className="left-side-seperate"></div>

            <div className="nav-icon" onClick={handleNavClick}>
                <div className="left-side-active-bar"></div>

                <span className="nav-icon__name">CG</span>
            </div>

            <div className="nav-icon sever">
                <FiPlus style={{ margin: 'auto', fontSize: '25px' }} />
            </div>

            <div className="nav-icon sever">
                <MdExplore style={{ margin: 'auto', fontSize: '25px' }} />
            </div>
            <div className="left-side-seperate"></div>
            <div className="nav-icon sever">
                <IoMdDownload style={{ margin: 'auto', fontSize: '25px' }} />
            </div>
        </div>
    );
};

export default LeftSideNavBar;
