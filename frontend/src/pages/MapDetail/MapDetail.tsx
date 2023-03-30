import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dummyimage from '../../assets/img/dummyimage.jpg';
import { Img, H2, Line } from '../../styles/MapDetail/MapDetailstyle';

// component
import PlaceNav from '../../Components/PlaceInfo/PlaceNav';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';

function MapDetail() {
	const [recommendPlace, setRecommendPlace] = useState<[]>([]);
	const [category, setCategory] = useState<any>('Home');
	const { id } = useParams();
	// const spotName = dummy.map((spot: any) => {
	// 	if (spot.spotSeq === id) return spot.spotName;
	// });

	const onSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
	}, []);

	const getData = async () => {
		try {
			const response = await axios.get('http://172.20.10.2:8080/api/spot/4');
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	// useEffect(() => {
	// 	axios.get('http://192.168.0.92:8080/api/spot/4').then((res) => {
	// 		setRecommendPlace(res.data);
	// 		console.log(res.data);
	// 	});
	// }, [recommendPlace]);

	// const postTest = async () => {
	// 	const requestInfo = {
	// 		url: 'http://192.168.0.92:8080/api/recommend',
	// 		method: 'POST',
	// 		data: {
	// 			// spotId: spotPlace.spot,
	// 			// spotLat: spotPlace.spotLat,
	// 			// spotLng: spotPlace.spotLng,
	// 		},
	// 	};
	// 	try {
	// 		const test = await axios(requestInfo);
	// 		console.log(test);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<>
			<Img src={dummyimage} alt="place-image" />
			<GoBackPage></GoBackPage>
			{/* <H2>{spotName}</H2> */}
			<Line />
			<PlaceNav category={category} onSelect={onSelect} />
			{/* <button const={}>테스트</button> */}
			<Footer />
		</>
	);
}

export default MapDetail;
