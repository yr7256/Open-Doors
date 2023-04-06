import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	Img,
	H1,
	Line,
	MainImage,
	BackIcon,
	CancelIcon,
	Div,
	Score,
	Review,
} from '../../styles/MapDetail/MapDetailstyle';
import back from '../../assets/img/back.png';
import cancel from '../../assets/img/cancel.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

// component
import PlaceNav from '../../Components/PlaceInfo/PlaceNav';
import Footer from '../../Components/Menu/Footer';

function MapDetail() {
	const [placeName, setPlaceName] = useState('');
	const [reviewScore, setReviewScore] = useState('');
	const [reviewCount, setReviewCount] = useState('');
	const [placeImage, setPlaceImage] = useState<any>([]);
	const [category, setCategory] = useState<string>('Home');
	const { id } = useParams();
	const navigate = useNavigate();

	const onSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
	}, []);

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			setPlaceName(res.data.data.spotName);
			setReviewScore(res.data.data.reviewScore);
			setReviewCount(res.data.data.reviewCount);
			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: number) => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<MainImage>
				<BackIcon onClick={() => navigate(-1)} src={back} />
				<CancelIcon onClick={() => navigate('/map')} src={cancel} />
				<Img src={placeImage[0]} alt="home-image"></Img>
			</MainImage>
			<br />
			<H1>{placeName}</H1>
			<Div>
				<span>
					<FontAwesomeIcon icon={faSolidStar} color="red" />
				</span>
				<Score>{reviewScore}</Score>
				<Review>|</Review>
				<Review>리뷰 </Review>
				<Review>{reviewCount}</Review>
			</Div>
			<Line />
			<PlaceNav category={category} onSelect={onSelect} />
			<Footer />
		</>
	);
}

export default MapDetail;
