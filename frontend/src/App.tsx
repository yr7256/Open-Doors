import React from 'react';
import './App.css';
import Kakao from './Components/Kakao/Kakao';
import Topbar from './Components/Topbar/Topbar';

function App() {
	return (
		<div className="App">
			<Topbar />
			<Kakao />
		</div>
	);
}

export default App;
