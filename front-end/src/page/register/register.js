import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { CgAsterisk } from 'react-icons/cg';
import Succeed from '../../components/notify/notify';
import instance from '../../axios';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useContext, useState } from 'react';
import StateContext from '../../context/context';
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import { userLoggedIn } from '../../context/action';

function Register() {
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const [status, setStatus] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.displayName.value;
        const day = event.target.day.value;
        const month = event.target.month.value;
        const year = event.target.year.value;
        instance
            .post('/register', { email, password, name, day, month, year })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'succeed') {
                    setStatus('loading');
                    setTimeout(() => {
                        dispatchState(userLoggedIn(res.data));
                    }, 300);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="background">
                {status === 'loading' ? <LoadingScreen /> : ''}
                <div className="register-container">
                    <div
                        className="turn_back"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('/login');
                        }}
                    >
                        <MdKeyboardArrowLeft className="arrow_icon" />
                        <p className="return_text">Quay lại</p>
                    </div>
                    <form className="register" onSubmit={(e) => handleSubmit(e)}>
                        <h2 className="create">Create an account</h2>
                        <div className="e">
                            <label className="label-email" htmlFor="email">
                                EMAIL
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="email" type="text" id="email" name="email" require></input>
                        <label className="label-display" htmlFor="display-name">
                            DISPLAY NAME
                        </label>
                        <input className="display-name" type="text" id="display-name" name="displayName"></input>

                        <div className="p">
                            <label className="label-pass" htmlFor="password">
                                PASSWORD
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="password" type="password" id="password" name="password" require></input>

                        {/* <div className="p">
                            <label className="label-pass" htmlFor="password">
                                RE-ENTER PASSWORD
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="password" type="password" id="password" name="password" require></input> */}
                        <div className="d">
                            <label className="label-dob" htmlFor="dob">
                                DATE OF BIRTH
                            </label>
                            <CgAsterisk className="icon" />
                        </div>

                        <div className="dob-select">
                            <select id="day" name="day" defaultValue={1}>
                                <option value="" disabled>
                                    Day
                                </option>
                                {[...Array(31).keys()].map((i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select id="month" name="month" defaultValue={'January'}>
                                <option value="" disabled>
                                    Month
                                </option>
                                {[
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                ].map((month, index) => (
                                    <option key={index} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select id="year" name="year" defaultValue={2024}>
                                <option value="" disabled>
                                    Year
                                </option>
                                {[...Array(new Date().getFullYear() - 1900 + 1).keys()].reverse().map((i) => (
                                    <option key={i} value={1900 + i}>
                                        {1900 + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="checkbox-container">
                            <input className="check-box" type="checkbox" id="email-opt-in" name="email-opt-in" />
                            <label className="checkbox-label" htmlFor="email-opt-in">
                                (Optional) It’s okay to send me emails with Discord updates, tips and special offers.
                                You can opt out at any time.
                            </label>
                        </div>
                        <button type="submit" className="continue-button">
                            Continue
                        </button>
                        <p className="terms">
                            By registering, you agree to Discord's <a href="#">Terms of Service</a> and{' '}
                            <a href="#">Privacy Policy</a>.
                        </p>
                        <Link style={{ fontSize: '15px' }} className="account-link blue" to={'/login'}>
                            Already have an account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;
