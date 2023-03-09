import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Kakao from './Components/Kakao/Kakao';
// import Topbar from './Components/Topbar/Topbar';
import Map from './pages/Map/Map';

function App() {
	return (
		// <div className="App">
		// 	<Topbar />
		// 	<Kakao />
		// </div>
		<BrowserRouter>
			<Routes>
				<Route path="/map" element={<Map />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
