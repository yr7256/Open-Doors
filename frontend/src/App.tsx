import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Map from './pages/Map/Map';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import MyPage from './pages/Profile/MyPage';
import NewLocation from './Components/Kakao/NewLocation';
import SearchAddress from './Components/Kakao/SearchAddress';
import SearchAddressMain from './Components/Kakao/SearchAddressMain';
import SearchAddressMap from './Components/Kakao/SearchAddressMap';
import MyDonation from './pages/Profile/MyDonation';
import MyInfoManage from './pages/Profile/MyInfoManage';
import MyReview from './pages/Profile/MyReview';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import ChangeBarrierFreePage from './pages/Profile/ChangeBarrierFreePage';
import EditReview from './pages/Review/EditReview';

function App() {
	useEffect(() => {
		const cookies = new Cookies();
		const refreshToken = cookies.get('refresh_token');
		const getAccessToken = async () => {
			try {
				const response = await axios.post('', {
					refreshToken: refreshToken,
				});
				// 로컬 스토리지에 엑세스 토큰 저장
				localStorage.setItem('accessToken', response.data.accessToken);
			} catch (error) {
				console.log(error);
			}
		};
		getAccessToken();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/map/*" element={<Map />} />
				<Route path="/Signup" element={<SignUp />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/EditReview" element={<EditReview />} />
				<Route path="/Mypage" element={<MyPage />} />
				<Route path="/Mypage/Donation" element={<MyDonation />} />
				<Route path="/Mypage/MyInfoManage" element={<MyInfoManage />} />
				<Route path="/Mypage/MyReview" element={<MyReview />} />
				<Route path="/Mypage/ChangePassword" element={<ChangePasswordPage />} />
				<Route path="/Mypage/ChangeBarrierFree" element={<ChangeBarrierFreePage />} />
				<Route path="/map/newlocation/*" element={<NewLocation />} />
				<Route path="/map/newlocation/search" element={<SearchAddress />}>
					<Route index element={<SearchAddressMain />} />
					<Route path="main" element={<SearchAddressMain />} />
					<Route path="marker" element={<SearchAddressMap />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
