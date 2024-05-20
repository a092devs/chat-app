import {usePostLoginMutation, usePostSignUpMutation} from '@/state/api';
import {useEffect, useState} from 'react';

const Login = ({setUser, setSecret}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [mandatoryPopup, setMandatoryPopup] = useState(false); // Popup for mandatory fields
    const [requiredFields, setRequiredFields] = useState([]);

    const [triggerLogin, resultLogin] = usePostLoginMutation();
    const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

    const handleLogin = () => {
        triggerLogin({username, password});
    };

    const handleRegister = () => {
        if (password === confirmPassword) {
            const missingFields = requiredFields.filter(
                (field) => !JSON.parse(field)
            );
            if (missingFields.length === 0) {
                triggerSignUp({
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                });
            } else {
                setMandatoryPopup(true);
            }
        } else {
            setPasswordMismatch(true);
        }
    };

    useEffect(() => {
        if (resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
        }
    }, [resultLogin.data]); // eslint-disable-line

    useEffect(() => {
        if (resultSignUp.data?.response) {
            setUser(username);
            setSecret(password);
        }
    }, [resultSignUp.data]); // eslint-disable-line

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="title">{isRegister ? 'Sign Up' : 'Login'}</h2>
                <p
                    className="register-change"
                    onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Already a user?' : 'Are you a new user?'}
                </p>

                <div>
                    {isRegister && (
                        <>
                            <input
                                className={`login-input ${
                                    requiredFields.includes('firstName') &&
                                    !firstName
                                        ? 'required-field'
                                        : ''
                                }`}
                                type="text"
                                placeholder="First Name*"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className={`login-input ${
                                    requiredFields.includes('lastName') &&
                                    !lastName
                                        ? 'required-field'
                                        : ''
                                }`}
                                type="text"
                                placeholder="Last Name*"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                className="login-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className={`login-input ${
                                    requiredFields.includes('username') &&
                                    !username
                                        ? 'required-field'
                                        : ''
                                }`}
                                type="text"
                                placeholder="Username*"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className={`login-input ${
                                    requiredFields.includes('password') &&
                                    !password
                                        ? 'required-field'
                                        : ''
                                }`}
                                type="password"
                                placeholder="Password*"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className={`login-input ${
                                    requiredFields.includes(
                                        'confirmPassword'
                                    ) && !confirmPassword
                                        ? 'required-field'
                                        : ''
                                }`}
                                type="password"
                                placeholder="Confirm Password*"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <input
                                className="login-input"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                </div>

                <div className="login-actions">
                    {isRegister ? (
                        <button
                            type="button"
                            onClick={() => {
                                setRequiredFields([
                                    'firstName',
                                    'lastName',
                                    'username',
                                    'password',
                                    'confirmPassword',
                                ]);
                                handleRegister();
                            }}>
                            Sign Up
                        </button>
                    ) : (
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
            </div>

            {mandatoryPopup && (
                <div className="mandatory-popup">
                    <p>Please fill out all mandatory fields.</p>
                    <button onClick={() => setMandatoryPopup(false)}>OK</button>
                </div>
            )}

            {passwordMismatch && (
                <div className="password-mismatch">
                    <p>Passwords do not match.</p>
                    <button onClick={() => setPasswordMismatch(false)}>
                        OK
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
