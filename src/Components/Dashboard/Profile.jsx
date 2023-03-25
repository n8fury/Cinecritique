import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../Assets/photos/profile-1.jpg';
const Profile = () => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};
	return (
		<div className="container">
			<h2>My Profile</h2>
			<div className="border-bottom" />
			<div className="profile">
				<div className="profile-image">
					<img
						src={img1}
						alt="profile"
					/>
				</div>
				<div className="profile-info">
					<h3>John Smith</h3>
					<small>Full Stack Developer</small>
				</div>
			</div>
			<div className="information">
				<h4>Profile Information</h4>
				<div className="info">
					<p>First Name:</p>
					<p>John</p>
				</div>
				<div className="info">
					<p>Last Name:</p>
					<p>Smith</p>
				</div>
				<div className="info">
					<p>Address:</p>
					<p>18589, Road 17, NY, United States</p>
				</div>
				<div className="info">
					<p>Mobile:</p>
					<p>+1-2345-6789</p>
				</div>
				<div className="info">
					<p>Email:</p>
					<p>email@gmail.com</p>
				</div>
				<div className="info">
					<p>Github:</p>
					<p>github.com/john-smith</p>
				</div>
				<button
					type="submit"
					className="submit-button"
					onClick={logoutHandler}>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
