import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication/Login/Login';
import SignUp from './Components/Authentication/Signup/SignUp';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
