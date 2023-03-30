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

type Category = {
	id: number;
	label: string;
	image: string;
	active: boolean;
};

function PickCategory(modalHandler: any) {
	const [restaurantActive, setRestaurantActive] = useState(false);
	const [cafeActive, setCafeActive] = useState(false);
	const [movieActive, setMovieActive] = useState(false);
	const [readActive, setReadActive] = useState(false);
	const [picnicActive, setPicnicActive] = useState(false);
	const [cultureActive, setCultureActive] = useState(false);

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

	const pickCategory = async () => {
		const handleClose = () => {
			modalHandler?.();
		};
		const picks: any = [];
		for (const category of categoriesList) {
			if (category.active) {
				picks.push(category);
			}
		}
		console.log(picks);

		// const requestInfo = {
		// 	url: '',
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-type': 'application/json',
		// 	},
		// 	data: {},
		// };
		// try {
		// 	const submitPickList = await axios(requestInfo);
		// 	console.log(submitPickList);
		// 	console.log('선택완료');
		// } catch (err) {
		// 	console.log('안됐잖아');
		// 	console.log(err);
		// }
	};
	return (
		<>
			<Fotter>
				<form onSubmit={handleSubmit}>
					<br />
					<h4>원하는 활동을 선택하세요.</h4>
					<br />
					<div className="grid grid-cols-8 gap-3">
						<div className="col-start-2 col-span-2">
							<Active className={restaurantActive ? ' active' : ''} onClick={toggleRestaurantActive}>
								<img src={restaurant} alt="restaurant" />
							</Active>
							<br />
							{selectedLabel[0]}
						</div>
						<div className="col-start-4 col-span-2">
							<Active className={cafeActive ? ' active' : ''} onClick={toggleCafeActive}>
								<img src={cafe} alt="cafe" />
							</Active>
							<br />
							{selectedLabel[1]}
						</div>
						<div className="col-start-6 col-span-2">
							<Active className={movieActive ? ' active' : ''} onClick={toggleMovieActive}>
								<img src={movie} alt="movie" />
							</Active>
							<br />
							{selectedLabel[2]}
						</div>
					</div>
					<br />
					<div className="grid grid-cols-8 gap-1">
						<div className="col-start-2 col-span-2">
							<Active className={readActive ? ' active' : ''} onClick={toggleReadActive}>
								<img src={read} alt="read" />
							</Active>
							<br />
							{selectedLabel[3]}
						</div>
						<div className="col-start-4 col-span-2">
							<Active className={picnicActive ? ' active' : ''} onClick={togglePicnicActive}>
								<img src={picnic} alt="picnic" />
							</Active>
							<br />
							{selectedLabel[4]}
						</div>
						<div className="col-start-6 col-span-2">
							<Active className={cultureActive ? ' active' : ''} onClick={toggleCultureActive}>
								<img src={culture} alt="culture" />
							</Active>
							<br />
							{selectedLabel[5]}
						</div>
					</div>
					<br />
					<Button onClick={pickCategory}>추천 받기</Button>
				</form>
			</Fotter>
		</>
	);
}

export default PickCategory;
