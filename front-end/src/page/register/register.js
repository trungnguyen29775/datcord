import './register.css';
import { CgAsterisk } from 'react-icons/cg';

function Register() {
    return (
        <div>
            <div className="background">
                <div className="container">
                    <form className="register">
                        <h2 className="create">Create an account</h2>
                        <div className="e">
                            <label className="label-email" forHTML="email">
                                EMAIL
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="email" type="text" id="email" name="email" require></input>
                        <label className="label-display" forHTML="display-name">
                            DISPLAY NAME
                        </label>
                        <input className="display-name" type="text" id="display-name" name="display-name"></input>
                        <div className="n">
                            <label className="label-name" forHTML="u-name">
                                USERNAME
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="u-name" type="text" id="u-name" name="u-name" require></input>
                        <div className="p">
                            <label className="label-pass" forHTML="password">
                                PASSWORD
                            </label>
                            <CgAsterisk className="icon" />
                        </div>
                        <input className="password" type="text" id="password" name="password" require></input>
                        <div className="d">
                            <label className="label-dob" forHTML="dob">
                                DATE OF BIRTH
                            </label>
                            <CgAsterisk className="icon" />
                        </div>

                        <div class="dob-select">
                            <select id="day" name="day">
                                <option value="" disabled selected>
                                    Day
                                </option>
                                {[...Array(31).keys()].map((i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select id="month" name="month">
                                <option value="" disabled selected>
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
                            <select id="year" name="year">
                                <option value="" disabled selected>
                                    Year
                                </option>
                                {[...Array(new Date().getFullYear() - 1900 + 1).keys()].reverse().map((i) => (
                                    <option key={i} value={1900 + i}>
                                        {1900 + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="checkbox-container">
                            <input className="check-box" type="checkbox" id="email-opt-in" name="email-opt-in" />
                            <label className="checkbox-label" for="email-opt-in">
                                (Optional) It’s okay to send me emails with Discord updates, tips and special offers.
                                You can opt out at any time.
                            </label>
                        </div>
                        <button type="submit" className="continue-button">
                            Continue
                        </button>
                        <p class="terms">
                            By registering, you agree to Discord's <a href="#">Terms of Service</a> and{' '}
                            <a href="#">Privacy Policy</a>.
                        </p>
                        <p class="account-link">
                            <a href="#">Already have an account?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;
