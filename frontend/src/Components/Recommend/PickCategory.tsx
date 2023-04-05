import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../styles/Button/ButtonStyle';
import { Fotter, Active } from '../../styles/Recommend/PickCategorystyle';
import restaurant from '../../assets/img/restaurant.png';
import cafe from '../../assets/img/cafe.png';
import movie from '../../assets/img/movie.png';
import culture from '../../assets/img/culture.png';
import picnic from '../../assets/img/picnic.png';
import read from '../../assets/img/read.png';
import { recommend } from '../../store/UserRecommend';
import { useDispatch, useSelector } from 'react-redux';
import TodayRecommend from './TodayRecommend';

type Category = {
	id: number;
	label: string;
	image: string;
	active: boolean;
};

type UserState = {
	user: {
		username: string;
		accessToken: string;
	};
};

function PickCategory(props: any) {
	const dispatch = useDispatch();
	const username = useSelector((state: UserState) => state.user.username);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);
	const [responseData, setResponseData] = useState<[]>([]);
	const [restaurantActive, setRestaurantActive] = useState(false);
	const [cafeActive, setCafeActive] = useState(false);
	const [movieActive, setMovieActive] = useState(false);
	const [readActive, setReadActive] = useState(false);
	const [picnicActive, setPicnicActive] = useState(false);
	const [cultureActive, setCultureActive] = useState(false);
	const [lat, setLat] = useState(36.350475);
	const [lng, setLng] = useState(127.384834);

	const categoriesList: Category[] = [
		{ id: 1, label: '음식점', image: restaurant, active: restaurantActive },
		{ id: 2, label: '카페', image: cafe, active: cafeActive },
		{ id: 3, label: '영화', image: movie, active: movieActive },
		{ id: 4, label: '독서', image: read, active: readActive },
		{ id: 5, label: '야외활동', image: picnic, active: picnicActive },
		{ id: 6, label: '문화생활', image: culture, active: cultureActive },
	];

	const selectedLabel = categoriesList.map((category) => <h4 key={category.id}>{category.label}</h4>);

	const toggleRestaurantActive = () => {
		setRestaurantActive(!restaurantActive);
	};

	const toggleCafeActive = () => {
		setCafeActive(!cafeActive);
	};

	const toggleMovieActive = () => {
		setMovieActive(!movieActive);
	};

	const toggleReadActive = () => {
		setReadActive(!readActive);
	};

	const togglePicnicActive = () => {
		setPicnicActive(!picnicActive);
	};

	const toggleCultureActive = () => {
		setCultureActive(!cultureActive);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			});
		}
	});

	const pickCategory = async () => {
		const picks: any = [];
		for (const category of categoriesList) {
			if (category.active) {
				picks.push(category);
			}
		}
		const pickId: any = [];
		{
			picks.map((v: any, i: any) => {
				pickId.push(v.id);
			});
		}
		console.log(pickId);
		const dataPayload = {
			username: username,
			spotCategory: pickId,
			userLat: lat,
			userLng: lng,
		};

		const requestInfo = {
			url: 'https://j8b205.p.ssafy.io/api/hybrid',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: dataPayload,
		};
		try {
			const pickRequest = await axios(requestInfo);
			const recommendList = pickRequest.data;
			setResponseData(recommendList);
			props.receiveResponse(recommendList);
			console.log(recommendList);
			dispatch(recommend({ isRecommend: true }));
			console.log('선택완료');
		} catch (err) {
			console.log('안됐잖아');
			console.log(err);
		}
	};

	return (
		<>
			<Fotter>
				<form onSubmit={handleSubmit}>
					<h4>원하는 활동을 선택하세요.</h4>
					<div className="grid grid-cols-8 gap-3">
						<div className="col-start-2 col-span-2">
							<Active className={restaurantActive ? ' active' : ''} onClick={toggleRestaurantActive}>
								<img src={restaurant} alt="restaurant" />
							</Active>
							{selectedLabel[0]}
						</div>
						<div className="col-start-4 col-span-2">
							<Active className={cafeActive ? ' active' : ''} onClick={toggleCafeActive}>
								<img src={cafe} alt="cafe" />
							</Active>
							{selectedLabel[1]}
						</div>
						<div className="col-start-6 col-span-2">
							<Active className={movieActive ? ' active' : ''} onClick={toggleMovieActive}>
								<img src={movie} alt="movie" />
							</Active>
							{selectedLabel[2]}
						</div>
					</div>
					<div className="grid grid-cols-8 gap-1">
						<div className="col-start-2 col-span-2">
							<Active className={readActive ? ' active' : ''} onClick={toggleReadActive}>
								<img src={read} alt="read" />
							</Active>
							{selectedLabel[3]}
						</div>
						<div className="col-start-4 col-span-2">
							<Active className={picnicActive ? ' active' : ''} onClick={togglePicnicActive}>
								<img src={picnic} alt="picnic" />
							</Active>
							{selectedLabel[4]}
						</div>
						<div className="col-start-6 col-span-2">
							<Active className={cultureActive ? ' active' : ''} onClick={toggleCultureActive}>
								<img src={culture} alt="culture" />
							</Active>
							{selectedLabel[5]}
						</div>
					</div>
					<div>
						<Button onClick={pickCategory}>추천 받기</Button>
					</div>
				</form>
			</Fotter>
		</>
	);
}

export default PickCategory;
