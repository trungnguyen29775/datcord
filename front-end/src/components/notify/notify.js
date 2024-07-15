import './notify.css';
import { FaCheck } from 'react-icons/fa';
const Succeed = ({ notification, status }) => {
    return (
        <div className="web-wrapper">
            <div className="succeed-container">
                <span>{'Notification'}</span>
                <FaCheck style={{ marginLeft: '10px' }} />
            </div>
        </div>
    );
};

export default Succeed;
