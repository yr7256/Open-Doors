import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/map" element={<Map />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
