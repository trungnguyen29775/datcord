import './login.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { CgAsterisk } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import StateContext from '../../context/context';
import instance from '../../axios';
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import { userLoggedIn } from '../../context/action';

function LogIn() {
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const [status, setStatus] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const username = event.target.email.value;
        const password = event.target.password.value;
        instance
            .post('/login', { username, password })
            .then((res) => {
                setStatus('loading');
                setTimeout(() => {
                    dispatchState(userLoggedIn(res.data));
                }, 200);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            {status === 'loading' ? <LoadingScreen /> : ''}
            <div className="background">
                <div className="login">
                    <div className="login_container">
                        <div className="header">
                            <h2>Chào mừng trở lại!</h2>
                            <h4>Rất vui mừng khi được gặp lại bạn!</h4>
                        </div>
                        <form className="login_field" onSubmit={(e) => handleLogin(e)}>
                            <div>
                                <label htmlFor="email">EMAIL HOẶC SỐ ĐIỆN THOẠI</label>
                                <CgAsterisk className="icon" /> <br />
                            </div>
                            <input className="email" type="text" id="email" name="email" />
                            <div>
                                <label htmlFor="password">MẬT KHẨU</label>
                                <CgAsterisk className="icon" />
                            </div>
                            <input className="password" type="text" id="password" name="password" />
                            <a className="forget_password" href="#">
                                Quên mật khẩu?
                            </a>
                            <button type="submit" className="login__button">
                                Đăng nhập
                            </button>
                            <span className="need-acc-container">
                                <p>Cần một tài khoản?</p>
                                <Link style={{ fontSize: '15px' }} to={'/register'} className="register" href="#">
                                    Đăng ký
                                </Link>
                            </span>
                        </form>
                    </div>

                    <div className="qr_sign_in">
                        <div className="qr"></div>
                        <h2 className="qr_text">Đăng nhập bằng Mã QR</h2>
                        <p className="script">Quét bằng ứng dụng di động Discord để đăng nhập tức thì</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
