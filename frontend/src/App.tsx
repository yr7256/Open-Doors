import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';
import { Reset } from 'styled-reset'

function App() {
	return (
		<BrowserRouter>
			<Reset />
			<Routes>
				<Route path="/map/*" element={<Map />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
