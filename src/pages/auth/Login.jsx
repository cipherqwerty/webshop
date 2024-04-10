import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();

	const { setLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();

	const login = () => {
		if (
			passwordRef.current.value === '123' &&
			emailRef.current.value === 'admin'
		) {
			setLoggedIn(true);
			navigate('/');
		}
	};

	return (
		<div>
			<label>Email</label> <br />
			<input type='text' ref={emailRef} /> <br />
			<label>Password</label> <br />
			<input type='text' ref={passwordRef} /> <br />
			<button onClick={login}>Log in</button>
		</div>
	);
}

export default Login;
