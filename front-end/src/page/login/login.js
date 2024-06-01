import './login.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { CgAsterisk } from 'react-icons/cg';

function LogIn() {
    return (
        <div>
            <div className="background">
                <div className="login">
                    <div className="login_container">
                        <div className="turn_back">
                            <MdKeyboardArrowLeft className="arrow_icon" />
                            <p className="return_text">Quay lại</p>
                        </div>
                        <div className="header">
                            <h2>Chào mừng trở lại!</h2>
                            <h4>Rất vui mừng khi được gặp lại bạn!</h4>
                        </div>
                        <div className="login_field">
                            <div>
                                <label forHTML="email">EMAIL HOẶC SỐ ĐIỆN THOẠI</label>
                                <CgAsterisk className="icon" /> <br />
                            </div>
                            <input className="email" type="text" id="email" name="email" />
                            <div>
                                <label forHTML="password">MẬT KHẨU</label>
                                <CgAsterisk className="icon" />
                            </div>
                            <input className="password" type="text" id="password" name="password" />
                            <a className="forget_password" href="#">
                                Quên mật khẩu?
                            </a>
                            <button type="button" className="login__button">
                                Đăng nhập
                            </button>
                            <span className="need-acc-container">
                                <p>Cần một tài khoản?</p>
                                <a className="register" href="#">
                                    Đăng ký
                                </a>
                            </span>
                        </div>
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
