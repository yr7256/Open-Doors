import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';
import NewLocation from './Components/Kakao/NewLocation';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/map/*" element={<Map />} />
				<Route path="/map/newlocation/*" element={<NewLocation />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
