import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
	// declaring refs
	const emailRef = useRef();
	const passwordRef = useRef();

	// declaring states

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	// declaring navigation
	const navigate = useNavigate();
	// form validation

	// email validation
	const emailValidator = () => {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
			setIsEmailValid(true);
		} else {
			setIsEmailValid(false);
			setEmailErrorMessage('Please enter a Valid Email');
		}
	};

	//  Password validation
	const passwordValidator = () => {
		if (
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(
				passwordRef.current.value
			)
		) {
			setIsPasswordValid(true);
			setPasswordErrorMessage('');
		} else {
			setIsPasswordValid(false);
			setPasswordErrorMessage(
				'Password must contain with 8-16 letters, one capital letter, one number & one special character'
			);
		}
	};

	// form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		const userInfo = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		const res = await fetch(
			' https://cinecritique.cyclic.app/user/signin',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userInfo),
			}
		);
		const data = await res.json();
		if (data.token) {
			localStorage.setItem('token', data.token);
			emailRef.current.value = '';
			passwordRef.current.value = '';
			navigate('/dashboard');
		} else {
			alert('Email or Password is incorrect');
		}
	};
	return (
		<div className="container login">
			<div className="content">
				<div className="text">
					<h2 className="title">Welcome Back!</h2>
					<div className="border-bottom" />
					<h4 className=" ">Start managing your service better</h4>
				</div>
				<div className="form">
					<div className="">
						<p>Sign in to your account below</p>
					</div>
					<form
						className="form-container"
						onSubmit={handleSubmit}>
						<div className="input-field">
							<div className="input-group">
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									ref={emailRef}
									onChange={emailValidator}
									required
								/>

								{!isEmailValid && (
									<span>{emailErrorMessage}</span>
								)}
							</div>

							<div className="input-group">
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									ref={passwordRef}
									onChange={passwordValidator}
									required
								/>

								{!isPasswordValid && (
									<span>{passwordErrorMessage}</span>
								)}
							</div>
						</div>
						<div className="bottom-area">
							{!isEmailValid || !isPasswordValid ? (
								<button
									type="submit"
									className="disabled-button"
									disabled>
									Sign In
								</button>
							) : (
								<button
									type="submit"
									className="submit-button">
									Sign In
								</button>
							)}
							<div>
								<Link
									to="/user/password/reset"
									className="forget-pass">
									Forget Password?
								</Link>
							</div>
						</div>
						<div className="bottom-text">
							<p>
								Don't have any account?{' '}
								<Link to="/signup">Create a new Account</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
