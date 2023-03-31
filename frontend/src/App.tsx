import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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
import MapDetail from './pages/MapDetail/MapDetail';
import DetailHome from './Components/PlaceInfo/PlaceDetail/DetailHome';
import DetailPhoto from './Components/PlaceInfo/PlaceDetail/DetailPhoto';
import DetailRecommend from './Components/PlaceInfo/PlaceDetail/DetailRecommend';
import DetailReview from './Components/PlaceInfo/PlaceDetail/DetailReview';
import DetailMap from './Components/PlaceInfo/PlaceDetail/DetailMap';
import MyDonation from './pages/Profile/MyDonation';
import MyInfoManage from './pages/Profile/MyInfoManage';
import MyReview from './pages/Profile/MyReview';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import ChangeBarrierFreePage from './pages/Profile/ChangeBarrierFreePage';
import EditReview from './pages/Review/EditReview';
import { logout } from './store/Cookie';
import { logoutAccount } from './store/AuthSlice';
import Mylocation from './Components/MyLocation/Mylocation';
import Donation from './Components/Donation/Donation';
import NotFound from './Components/Error/NotFound';
import Help from './Components/Help/Help';

type UserState = {
	user: {
		isLogged: boolean;
	};
};

function App() {
	const dispatch = useDispatch();
	const isLogged = useSelector((state: UserState) => state.user.isLogged);

	useEffect(() => {
		// const accessToken = localStorage.getItem('accessToken');
		const cookies = new Cookies();
		const refreshToken = cookies.get('refresh_token');
		if (!refreshToken) {
			dispatch(logoutAccount);
			logout();
			console.log('로그아웃이라구');
		}
	}, [dispatch]);

	useEffect(() => {
		const cookies = new Cookies();
		const refreshToken = cookies.get('refresh_token');
		if (isLogged) {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<NotFound />} />
				<Route path="/map/*" element={<Map />} />
				<Route path="/map/detail/:id/*" element={<MapDetail />}>
					<Route index element={<DetailHome />} />
					<Route path="Home" element={<DetailHome />} />
					<Route path="Photo" element={<DetailPhoto />} />
					<Route path="Recommend" element={<DetailRecommend />} />
					<Route path="Review" element={<DetailReview />} />
					<Route path="Map" element={<DetailMap />} />
				</Route>
				<Route path="/myloc" element={<Mylocation />} />
				<Route path="/Signup" element={<SignUp />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/EditReview" element={<EditReview />} />
				<Route path="/donation" element={<Donation />} />
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
				<Route path="/help" element={<Help />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
