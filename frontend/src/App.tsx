import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/map/*" element={<Map />} />
				<Route path="/Signup" element={<SignUp />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
