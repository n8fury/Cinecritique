import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
	// declaring refs
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const ConfirmPasswordRef = useRef();

	// declaring states
	const [isNameValid, setIsNameValid] = useState(false);
	const [nameErrorMessage, setNameErrorMessage] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
	const [confirmErrorMessage, setConfirmErrorMessage] = useState('');

	// declaring navigation
	const navigate = useNavigate();
	// form validation

	// name validation
	const nameValidator = () => {
		if (/^[a-zA-Z ]{2,30}$/.test(nameRef.current.value)) {
			setIsNameValid(true);
		} else {
			setIsNameValid(false);
			setNameErrorMessage('name is invalid');
		}
	};

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

	const confirmPasswordValidator = () => {
		if (passwordRef.current.value === ConfirmPasswordRef.current.value) {
			setIsPasswordConfirmed(true);
			setConfirmErrorMessage('');
		} else {
			setIsPasswordConfirmed(false);
			setConfirmErrorMessage('Password does not match');
		}
	};

	// form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		const userInfo = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		const res = await fetch('https://cinecritique.cyclic.app/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		});
		const data = await res.json();

		if (data.userId) {
			emailRef.current.value = '';
			passwordRef.current.value = '';
			navigate('/login');
		} else {
			alert('Email or Password is incorrect');
		}
	};
	return (
		<div className="container signup">
			<div className="content">
				<div className="text">
					<h2 className="title">Welcome Back!</h2>
					<div className="border-bottom" />
					<h4 className=" ">Start managing your service better</h4>
				</div>
				<div className="form">
					<div className="">
						<p>Create a new account</p>
					</div>
					<form
						className="form-container"
						onSubmit={handleSubmit}>
						<div className="input-field">
							<div className="input-group">
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Name"
									ref={nameRef}
									onChange={nameValidator}
									required
								/>

								{!isNameValid && (
									<span>{nameErrorMessage}</span>
								)}
							</div>
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

							<div className="input-group">
								<input
									type="password"
									name="confirm_password"
									id="confirm_password"
									placeholder="Confirm Password"
									ref={ConfirmPasswordRef}
									onChange={confirmPasswordValidator}
									required
								/>

								{!isPasswordConfirmed && (
									<span>{confirmErrorMessage}</span>
								)}
							</div>
						</div>
						<div className="bottom-area">
							{!isNameValid ||
							!isEmailValid ||
							!isPasswordValid ||
							!isPasswordConfirmed ? (
								<button
									type="submit"
									className="disabled-button"
									disabled>
									Sign Up
								</button>
							) : (
								<button
									type="submit"
									className="submit-button">
									Sign Up
								</button>
							)}
						</div>
						<div className="bottom-text">
							<p>
								Already have an account?{' '}
								<Link to="/login">Sign In</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
