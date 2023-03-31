import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailHome() {
	const { id } = useParams();
	const [placeDetail, setPlaceDetail] = useState<[]>([]);

	// 위치, 운영시간, 번호, 정보, 편의시설 정보, 메뉴 useState 에 담기
	const [placeImage, setPlaceImage] = useState<any>([]);

	useEffect(() => {
		axios.get(`http://192.168.31.134:8080/api/spot/${id}`).then((res) => {
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
					const b = await axios.get(`http://192.168.31.134:8080/api/spot/image/${id}/${img.pathName}`);
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
			<p>홈이다.</p>
		</>
	);
}

export default DetailHome;
