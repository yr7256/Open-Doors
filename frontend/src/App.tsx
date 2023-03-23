import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import NewLocation from './Components/Kakao/NewLocation';
import SearchAddress from './Components/Kakao/SearchAddress';
import SearchAddressMain from './Components/Kakao/SearchAddressMain';
import SearchAddressMap from './Components/Kakao/SearchAddressMap';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/map/*" element={<Map />} />
				<Route path="/Signup" element={<SignUp />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/map/newlocation/*" element={<NewLocation />} />
				<Route path="/map/newlocation/search" element={<SearchAddress />}>
					<Route index element= {<SearchAddressMain />} />
					<Route path="main" element={<SearchAddressMain />} />
					<Route path="marker" element={<SearchAddressMap />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
