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
	const [imageUrl, setImageUrl] = useState<any>([]);
	const [placeDetail, setPlaceDetail] = useState<[]>([]);
	const [placeImage, setPlaceImage] = useState<any>([]);
	const [category, setCategory] = useState<any>('Home');
	const { id } = useParams();
	// const spotName = dummy.map((spot: any) => {
	// 	if (spot.spotSeq === id) return spot.spotName;
	// });

	const onSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
	}, []);

	useEffect(() => {
		axios.get('http://192.168.31.134:8080/api/spot/4').then((res) => {
			setPlaceDetail(res.data);
			console.log(res.data);
			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: any) => {
				// axios.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`).then((response) => {
				// 	// images.append(response.config.url);
				// 	console.log(response);
				// 	setPlaceImage([...placeImage, response.config.url]);
				// });
				const a = async () => {
					const b = await axios.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`);
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

	return (
		<>
			{/* {placeImage.map((img: any, idx: number) => ( */}
			<Img src={placeImage[0]} alt="home-image"></Img>
			{/* ))} */}
			<GoBackPage></GoBackPage>
			{/* <H2>{spotName}</H2> */}
			<Line />
			<PlaceNav category={category} onSelect={onSelect} />

			<Footer />
		</>
	);
}

export default MapDetail;
