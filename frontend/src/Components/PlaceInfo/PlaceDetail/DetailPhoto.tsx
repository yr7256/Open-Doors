import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Photo, H4, PhotoContainer } from '../../../styles/MapDetail/MapDetailstyle';

function DetailPhoto() {
	const { id } = useParams();
	const [placeImage, setPlaceImage] = useState<any>([]);

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			console.log(res.data);
			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: any) => {
				const a = async () => {
					const b = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
					imgArr.push(b.config.url);
					if (index === res.data.data.images.length - 1) {
						setPlaceImage(imgArr);
					}
				};
				a();
				console.log(imgArr);
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<H4>배리어프리 관련 사진을 볼 수 있습니다.</H4>
			<div className="grid grid-cols-16 gap-1">
				<div className="col-start-1 col-span-1">
					<PhotoContainer>
						{placeImage.map((img: any, idx: number) => (
							<Photo key={img} src={placeImage[idx]} alt="home-image"></Photo>
						))}
					</PhotoContainer>
					<br />
					<br />
					<br />
					<br />
				</div>
			</div>
		</>
	);
}

export default DetailPhoto;
