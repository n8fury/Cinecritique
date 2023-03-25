import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication/Login/Login';
import SignUp from './Components/Authentication/Signup/SignUp';
import Profile from './Components/Dashboard/Profile';
function App() {
	const ProtectedRoute = ({ children }) => {
		const token = localStorage.getItem('token');
		return token ? children : <Navigate to='/login' />;
	};
	return (
		<div className='App'>
			<Routes>
				<Route path='/'>
					<Route
						index
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path='/dashboard'>
					<Route
						index
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;

