import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Img, H1, Line, MainImage, BackIcon, CancelIcon } from '../../styles/MapDetail/MapDetailstyle';
import back from '../../assets/img/back.png';
import whitecancel from '../../assets/img/whitecancel.png';

// component
import PlaceNav from '../../Components/PlaceInfo/PlaceNav';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';

function MapDetail() {
	const [placeReviewRate, setPlaceReviewRate] = useState('');
	const [imageUrl, setImageUrl] = useState<any>([]);
	const [placeDetail, setPlaceDetail] = useState<[]>([]);
	const [placeName, setPlaceName] = useState('');
	const [placeImage, setPlaceImage] = useState<any>([]);
	const [category, setCategory] = useState<any>('Home');
	const { id } = useParams();
	const navigate = useNavigate();

	// const spotName = dummy.map((spot: any) => {
	// 	if (spot.spotSeq === id) return spot.spotName;
	// });

	const onSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
	}, []);

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			setPlaceDetail(res.data);
			setPlaceName(res.data.data.spotName);
			console.log(res.data);
			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: any) => {
				// axios.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`).then((response) => {
				// 	// images.append(response.config.url);
				// 	console.log(response);
				// 	setPlaceImage([...placeImage, response.config.url]);
				// });
				const a = async () => {
					const b = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
					imgArr.push(b.config.url);
					if (index === res.data.data.images.length - 1) {
						setPlaceImage(imgArr);
					}
				};
				a();
			});
		});
		// if (imageUrl) {
		// 	imageUrl.map((img: any) =>
		// 		axios
		// 			.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`)
		// 			.then((response) => {
		// 				console.log(response);
		// 				setPlaceImage([...placeImage, response.config.url]);
		// 				console.log(placeImage);
		// 			})
		// 			.catch((err) => console.log(err))
		// 	);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 리뷰 개수, 리뷰 별점 가져오기
	useEffect(() => {
		axios
			.get(`https://j8b205.p.ssafy.io/api/review/${id}`)
			.then((res) => {
				setPlaceReviewRate(res.data.data.length);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<MainImage>
				<BackIcon onClick={() => navigate(-1)} src={back} />
				<CancelIcon onClick={() => navigate('/map')} src={whitecancel} />
				<Img src={placeImage[0]} alt="home-image"></Img>
			</MainImage>
			<br />
			<H1>{placeName}</H1>
			<Line />
			<PlaceNav category={category} onSelect={onSelect} />
			<Footer />
		</>
	);
}

export default MapDetail;
