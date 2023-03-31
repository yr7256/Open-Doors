import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DetailPhoto() {
	const [placeImage, setPlaceImage] = useState<any>([]);

	useEffect(() => {
		axios.get('http://192.168.31.134:8080/api/spot/4').then((res) => {
			console.log(res.data);
			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: any) => {
				const a = async () => {
					const b = await axios.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`);
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
			<p>사진이다.</p>
			{placeImage.map((img: any, idx: number) => (
				<img key={img} src={placeImage[idx]} alt="home-image"></img>
			))}
		</>
	);
}

export default DetailPhoto;
